import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardContent, CircularProgress, Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import { makeStyles } from '@material-ui/core/styles'
import i18n from 'i18next'
import PDFJS from 'pdfjs-dist'
import React, { ChangeEvent, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import SparkMD5 from 'spark-md5'
import { bytesToSize, callEndpoint } from '../../helpers/utility'
import { SurveyService } from '../../services/survey.service'
import { ENDPOINT, Response, SurveyType } from '../../types/types'

//need for pdf upload to work
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`

type PreviewFile = {
  file: File
  name: string
  size: number
  body?: string
}

type UploadedFile = {
  success: boolean
  fileName: string
  message: string
}

enum VerificationStatusEnum {
  IN_POGRESS = 'validation_in_progress',
  DUPLICATE = 'duplicate',
  SUCCESS = 'succeeded',
}

const useStyles = makeStyles({
  root: {},
  preview: {
    backgroundColor: '#EBEBEB',
    padding: '0 .8rem',
    fontSize: '1.6rem',
    margin: '0 -50px 30px -50px',

    '& > div': {
      padding: '15px 13px',
    },
    '& img': {
      width: '100%',
    },
  },
})

async function getPreviewForPdf(file: File): Promise<PreviewFile> {
  const readPdfFile = new Promise<PreviewFile>((resolve, reject) => {
    var fileReader = new FileReader()

    fileReader.onload = async function (e: any) {
      //@ts-ignore
      var typedarray = new Uint8Array(e.target.result)
      var loadingTask = PDFJS.getDocument(typedarray)

      loadingTask.promise.then(function (pdf) {
        // you can now use *pdf* here
        console.log('the pdf has ', pdf.numPages, 'page(s).')
        pdf.getPage(pdf.numPages).then(function (page) {
          // you can now use *page* here
          var viewport = page.getViewport({ scale: 2 })
          var canvas = document.querySelector('canvas')
          canvas!.height = viewport.height
          canvas!.width = viewport.width

          page.render({
            canvasContext: canvas!.getContext('2d')!,
            viewport: viewport,
          })
          console.log('resolving')
          resolve({
            file: file,
            name: file.name,
            size: file.size,
          })
        })
      })
    }
    fileReader.readAsArrayBuffer(file)
  })
  return readPdfFile
}

function getPreviewForImage(file: File): PreviewFile {
  const previewFileBody = URL.createObjectURL(file)
  return {
    file: file,
    body: previewFileBody,
    name: file.name,
    size: file.size,
  }
}

//https://dev.to/qortex/compute-md5-checksum-for-a-file-in-typescript-59a4
async function computeChecksumMd5(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunkSize = 2097152 // Read in chunks of 2MB
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()

    let cursor = 0 // current cursor in file

    fileReader.onerror = function (): void {
      reject('MD5 computation failed - error reading the file')
    }

    // read chunk starting at `cursor` into memory
    function processChunk(chunk_start: number): void {
      const chunk_end = Math.min(file.size, chunk_start + chunkSize)
      fileReader.readAsArrayBuffer(file.slice(chunk_start, chunk_end))
    }

    // when it's available in memory, process it
    // If using TS >= 3.6, you can use `FileReaderProgressEvent` type instead
    // of `any` for `e` variable, otherwise stick with `any`
    // See https://github.com/Microsoft/TypeScript/issues/25510
    fileReader.onload = function (e: any): void {
      spark.append(e.target.result) // Accumulate chunk to md5 computation
      console.log('result')
      cursor += chunkSize // Move past this chunk

      if (cursor < file.size) {
        // Enqueue next chunk to be accumulated
        processChunk(cursor)
      } else {
        // Computation ended, last chunk has been processed. Return as Promise value.
        // This returns the base64 encoded md5 hash, which is what
        // Rails ActiveStorage or cloud services expect
        resolve(btoa(spark.end(true)))

        // If you prefer the hexdigest form (looking like
        // '7cf530335b8547945f1a48880bc421b2'), replace the above line with:
        // resolve(spark.end());
      }
    }

    processChunk(0)
  })
}

async function makeUploadRequest(
  token: string,
  fileName: string,
  fileSize: number,
  md5: string,
): Promise<Response<any>> {
  const data = {
    name: fileName,
    contentLength: fileSize,
    contentType: 'application/zip',
    contentMd5: md5,
    zipped: false,
    encrypted: false,
  }
  const endpoint = `${ENDPOINT}/v3/uploads`
  const uploadResponse = await callEndpoint(endpoint, 'POST', data, token)
  return uploadResponse
}

async function uploadToAWS(
  file: any,
  fileSize: number,
  md5: string,
  url: string,
  id: string,
) {
  const urlArr = url.split('/')
  const host = urlArr[2]
  const _url = urlArr[3]

  let headers: HeadersInit = new Headers()

  headers.set('Content-Type', 'application/zip')

  headers.set('Content-Length', fileSize.toString())
  headers.set('Host', host)
  headers.set('Content-MD5', md5)

  const config = {
    method: 'PUT',
    headers,
    body: file,
  }

  const response = await fetch(url, config)
  return response
}

async function verifyUpload(token: string, id: string): Promise<string> {
  const endpoint = `${ENDPOINT}/v3/uploads/${id}/complete`
  const poleForStatus = new Promise<string>((resolve, reject) => {
    const poll = async () => {
      try {
        const uploadConfirmationResponse = await callEndpoint<{
          status: string
        }>(endpoint, 'POST', {}, token)
        const status = uploadConfirmationResponse.data.status
        console.log(uploadConfirmationResponse.data.status)
        //duplicate

        if (status !== VerificationStatusEnum.IN_POGRESS) {
          resolve(status)
        } else {
          setTimeout(poll, 500)
        }
      } catch (e) {
        reject(i18n.t('uploadResult.uploadFailed'))
      }
    }
    poll()
  })
  return poleForStatus
}

export const UploadResult: React.FunctionComponent<{
  token: string
  surveyName?: SurveyType
}> = ({ token, surveyName = 'RESULT_UPLOAD' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [userUploads, setUserUploads] = useState<any | undefined>(undefined)
  const [previewFile, setPreviewFile] = useState<PreviewFile>()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isBackToDashboard, setIsBackToDashboard] = useState(false)

  const { t } = useTranslation()

  const classes = useStyles()

  async function processFile(file: File) {
    try {
      setIsLoading(true)
      const md5 = await computeChecksumMd5(file)
      const size = file.size
      const uploadResponse = await makeUploadRequest(
        token,
        file.name,
        size,
        md5,
      )
      if (uploadResponse.status == 200) {
        const { id, url }: { id: string; url: string } = uploadResponse.data
        const uploadToAWSResponse = await uploadToAWS(file, size, md5, url, id)
        const uploadVerification = await verifyUpload(token, id)
        if (uploadVerification === VerificationStatusEnum.DUPLICATE) {
          setUploadedFiles(_prev => [
            ..._prev,
            {
              fileName: file.name,
              success: false,
              message: t('uploadResult.duplicateUpload'),
            },
          ])
        } else {
          setUploadedFiles(_prev => [
            ..._prev,
            {
              fileName: file.name,
              success: true,
              message: t('uploadResult.successfulUpload'),
            },
          ])
        }

        setIsLoading(false)
        setPreviewFile(undefined)
      }
    } catch (reason) {
      setIsLoading(false)
      setUploadedFiles(_prev => [
        ..._prev,
        {
          fileName: file.name,
          success: false,
          message: t('uploadResult.uploadFailed'),
        },
      ])

      console.log(`Error during upload ${reason}`)
    }
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    event.persist()
    if (!event.target.files) {
      return
    }
    const file = event.target.files[0]
    if (file.type != 'application/pdf') {
      setPreviewFile(getPreviewForImage(file))
    } else {
      const previewFile = await getPreviewForPdf(file)
      setPreviewFile(previewFile)
    }
  }

  const getActionButtons = (file?: File): JSX.Element => {
    const getUploadButton = (
      cta: string,
      variant?: 'contained' | 'outlined',
    ) => (
      <Button
        variant={variant || 'contained'}
        component="label"
        fullWidth
        color="primary"
        style={{ marginTop: '20px' }}
      >
        {cta}
        <input
          accept="image/*,.pdf,.doc,.docx,.jpg,.png, .txt"
          id="file"
          multiple={false}
          type="file"
          onChange={e => handleFileChange(e)}
          style={{ display: 'none' }}
        />
      </Button>
    )

    const getCancelButton = (
      cta: string,
      fn: Function,
      variant?: 'contained' | 'outlined',
    ) => (
      <Button
        variant={variant || 'outlined'}
        fullWidth
        color="primary"
        style={{ marginTop: '20px' }}
        onClick={() => fn()}
      >
        {cta}
      </Button>
    )

    const noFiles = (
      <>
        {getUploadButton(t('uploadResult.text2'))}
        {getCancelButton(t('uploadResult.text3'), async () => {
          await SurveyService.completeSaveAndPostSurvey(
            surveyName as SurveyType,
            { fileNames: [] },
            token,
          )
          setIsBackToDashboard(true)
        })}
      </>
    )

    const btnsFileSelected = (
      <>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={() => processFile(file!)}
        >
          {t('uploadResult.text4')}
        </Button>
        {getCancelButton(t('common.cancel'), () => {
          setPreviewFile(undefined)
        })}
      </>
    )

    const btnsFileUploaded = (
      <>
        {getCancelButton(
          t('common.done'),
          async () => {
            const uploadedFileNames = uploadedFiles
              .filter(file => file.success)
              .map(file => file.fileName)
            //if we have succesfully uploadedFiles => submit
            if (uploadedFileNames && uploadedFileNames.length) {
              await SurveyService.completeSaveAndPostSurvey(
                surveyName,
                { fileNames: uploadedFileNames },
                token,
              )
            }
            setIsBackToDashboard(true)
          },
          'contained',
        )}
        {getUploadButton(t('uploadResult.add'), 'outlined')}
      </>
    )

    if (uploadedFiles.length === 0 && !previewFile) {
      return noFiles
    } else if (previewFile) {
      return btnsFileSelected
    } else {
      return btnsFileUploaded
    }
  }

  if (isBackToDashboard) {
    return <Redirect to={'/dashboard'} push={true} />
  }

  return (
    <>
      <Card>
        <CardContent>
          <div>
            <h3 className="text-center"> {t('uploadResult.title')}</h3>
            <div>
              <Trans i18nKey="uploadResult.description">
                <p>[translate]</p>
              </Trans>
            </div>
          </div>
          {uploadedFiles.map((file, i) => (
            <div key={`fileName${i}`}>
              <FontAwesomeIcon
                icon={file.success ? faCheck : faExclamation}
              ></FontAwesomeIcon>
              {` ${file.fileName} ${file.message}`}
            </div>
          ))}
          <Grid container>
            <Grid item xs={12}>
              <div className={classes.preview}>
                {previewFile && (
                  <div>
                    {previewFile.name} ({bytesToSize(previewFile.size)})
                  </div>
                )}
                <canvas
                  className="page"
                  style={{
                    width: '100%',
                    display:
                      previewFile && !previewFile.body ? 'block' : 'none',
                  }}
                ></canvas>

                {previewFile && <img src={previewFile.body} />}
              </div>

              {isLoading && (
                <div className="text-center">
                  <CircularProgress color="primary" />
                </div>
              )}

              {getActionButtons(previewFile?.file)}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default UploadResult
