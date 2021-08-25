import {
  Button, makeStyles
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import heroImage from '../../assets/hub/hero.svg'
import liCovid from '../../assets/hub/liCovid.svg'
import liImmune from '../../assets/hub/liImmune.svg'
import liNegative from '../../assets/hub/liNegative.svg'
import liPositive from '../../assets/hub/liPositive.svg'
import liQs from '../../assets/hub/liQs.svg'
import liTests from '../../assets/hub/liTests.svg'
import { UserService } from '../../services/user.service'
import {
  LoggedInUserData, TestResult
} from '../../types/types'
import LeftNav, { LeftNavItem } from '../static/LeftNav'
import TwoColumnTemplate from '../static/TwoColumnTemplate'
import LearningHub0 from './LearningHub0'
import LearningHub1 from './LearningHub1'
import LearningHub2 from './LearningHub2'
import LearningHub3 from './LearningHub3'
import LearningHub4 from './LearningHub4'
import LearningHub5 from './LearningHub5'







type ResultProps = {
  token?: string
}

export const useStyles = makeStyles(theme => ({
  root: {
    maxWith: '1080',
  },

  header: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  heroImage: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '400px',
      flexGrow: '2',
    },
  },

  activeNavMarker: {
    width: '7px',
    position: 'absolute',
    height: '100%',
    top: '0px',
    left: '0px',
    backgroundColor: 'rgb(252, 144, 144)',
    borderBottom: '1px solid #EEEEEE',
  },
  nav: {
    boxShadow: '0px 8px 37px -21px rgba(138,134,138,1)',

    listStyle: 'none',
    margin: '0',
    listStyleType: 'none',
    padding: '0',

    '& li': {
      position: 'relative',
      backgroundColor: '#fff',
      width: '300px',
      padding: '30px 10px 25px 30px',
      borderBottom: ' 1px solid #EEEEEE',
      display: 'flex',

      [theme.breakpoints.down('md')]: {
        width: '100%',
      },

      '& img': {
        marginRight: '1.6rem',
        width: '4rem',
      },
    },
  },
  navItem: {
    width: '300px',
    padding: '30px 10px 10px 30px',
    borderBottom: ' 1px solid #EEEEEE',
  },
  main: {},

  /* [theme.breakpoints.down('sm')]: {
        heroImage: {
            backgroundColor: theme.palette.primary.main,
        }
      },
      [theme.breakpoints.up('md')]: {
        backgroundColor: theme.palette.primary.main,
      },
      [theme.breakpoints.up('lg')]: {
        backgroundColor: theme.palette.primary.dark
      },*/
}))
export const LearningHub: React.FunctionComponent<ResultProps> = ({
  token,
}: ResultProps) => {
  const classes = useStyles()
  const [result, setResult] = useState<TestResult>()
  const [activeItemIndex, setActiveItemIndex] = useState(0)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [userData, setUserData] = useState<LoggedInUserData | undefined>(
    undefined,
  )
  const { t } = useTranslation()

  const navItems: LeftNavItem[] = [
    {
      img: liCovid,
      text: t('learningHub.nav0'),
     // callbackFn: () => setActiveItemIndex(0),
    },
    {
      img: liTests,
      text: t('learningHub.nav1'),
     // callbackFn: () => setActiveItemIndex(1),
    },
    {
      img: liImmune,
      text: t('learningHub.nav2'),
      //callbackFn: () => setActiveItemIndex(2),
    },
    {
      img: liPositive,
      text: t('learningHub.nav3'),
      //callbackFn: () => setActiveItemIndex(3),
    },
    {
      img: liNegative,
      text: t('learningHub.nav4'),
     // callbackFn: () => setActiveItemIndex(4),
    },
    {
      img: liQs,
      text: t('learningHub.nav5'),
     // callbackFn: () => setActiveItemIndex(5),
    },
  ]

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfoResponse = await UserService.getUserInfo(token)
          setUserData(userInfoResponse.data)
          const ResultsResponse = await UserService.getTestResult(token)
          if (ResultsResponse?.data?.items?.length > 0) {
            const result = ResultsResponse.data.items[0]
            setResult(result)
          }
        } catch (e) {
          setError(e)
        } finally {
          setIsLoading(false)
        }
      }
    }
    getInfo()
    return () => {
      isSubscribed = false
    }
  }, [token])

  const getMain = (): JSX.Element => {
    const elArray = [  <LearningHub0></LearningHub0>, <LearningHub1></LearningHub1>, <LearningHub2></LearningHub2>,<LearningHub3></LearningHub3>,<LearningHub4></LearningHub4>,<LearningHub5></LearningHub5>]
    const el = (
      <div style={{ marginTop: '5rem' }}>
        {elArray[activeItemIndex]}
      </div>
    )

    return el
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.heroImage}>
          <img src={heroImage} style={{ width: '100%' }}></img>
        </div>
        <div style={{ maxWidth: '550px' }}>
          <h2>{t('learningHub.title')}</h2>
          <div>
            <Trans i18nKey="learningHub.text1">
              <p>[translate]</p>
              <p>[translate]</p>
            </Trans>
          </div>
          {!token && (
            <Button
              type="button"
              className="btnVerticallySpaced"
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = '/eligibility')}
            >
              {t('common.joinStudy')}
            </Button>
          )}
        </div>
      </div>
      <TwoColumnTemplate
        nav={
          <LeftNav
            changeIndexCallbackFn={(index: number) => setActiveItemIndex(index)}
            items={navItems}
            activeIndex={activeItemIndex}
            activeColor="#FC9090"
          />
        }
        main={getMain()}
      ></TwoColumnTemplate>
    </div>
  )
}

export default LearningHub
