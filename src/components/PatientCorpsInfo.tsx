import React, { useState, useEffect } from 'react'
import { ENDPOINT } from '../types/types'

type PatientCorpsInfoProps = {
  token: string

  callback?: Function
}

export const PatientCorpsInfo: React.FunctionComponent<PatientCorpsInfoProps> = ({

  token,
  callback,
}: PatientCorpsInfoProps) => {
  const [data, setData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isSubscribed = true
    async function getInfo(token: string) {
      try {
        const response = await fetch(`${ENDPOINT}/v3/participants/self`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'Bridge-Session': token,
          },
        })
        if (isSubscribed) {
          const result = await response.json()
          console.log(result)
          setData(result)
          if (callback){
            callback(result)
          }
        }
      } catch (error) {
        setErrorMessage(error)
      }
    }
    getInfo(token)
    return () => {
      isSubscribed = false
    }
  }, [token])
  // ...

  return (
    <div>
      <div>{/*errorMessage*/}</div>
      <pre>{JSON.stringify(data, null, 2) }</pre>

    </div>
  )
}

export default PatientCorpsInfo
