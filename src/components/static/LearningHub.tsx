import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Grid,
  Card,
  Button,
  CardContent,
  CircularProgress,
  createMuiTheme,
} from '@material-ui/core'
import { playfairDisplayFont, openSansFont } from '../../App'
import {
  TestResult,
  TestResultString,
  LoggedInUserData,
} from '../../types/types'

import heroImage from '../../assets/hub/hero.svg'
import img1 from '../../assets/hub/img1.svg'
import liNegative from '../../assets/hub/liNegative.svg'
import liPositive from '../../assets/hub/liPositive.svg'
import liCovid from '../../assets/hub/liCovid.svg'
import liQs from '../../assets/hub/liQs.svg'
import liImmune from '../../assets/hub/liImmune.svg'
import liTests from '../../assets/hub/liTests.svg'

import TwoColumnTemplate from './TwoColumnTemplate'
import LeftNav, {LeftNavItem} from './LeftNav'

import { UserService } from '../../services/user.service'

import { useTranslation, Trans } from 'react-i18next'

import Alert from '@material-ui/lab/Alert'
import moment from 'moment'
import _ from 'lodash'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'

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
      text: 'What we know so far about COVID-19',
      callbackFn: ()=> setActiveItemIndex(0)
    },
    {
      img: liTests,
      text: 'Types of COVID-19 Tests',
      callbackFn: ()=> setActiveItemIndex(1)
    },
    {
      img: liImmune,
      text: 'The immune response to SARS-CoV-2.',
      callbackFn: ()=> setActiveItemIndex(2)
    },
    {
      img: liPositive,
      text: 'What COVID-19 positive people can do now.',
      callbackFn: ()=> setActiveItemIndex(3)
    },
    {
      img: liNegative,
      text: 'What COVID-19 negative people can do now.',
      callbackFn: ()=> setActiveItemIndex(4)
    },
    {
      img: liQs,
      text: 'FAQ about serology results',
      callbackFn: ()=> setActiveItemIndex(5)
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
    const el = <>
      <h3 style={{ marginTop: '5rem' }}>
            What we know so far about COVID-19
          </h3>
          <div>
            <p>
              COVID-19 is a new infectious disease, caused by the SARS-CoV-2
              virus (a Corona virus). It first occurred at the end of 2019 in
              China and has since spread across the globe.
            </p>
            <p>
              For the most part COVID-19 is an airborne disease, which means
              that it is spread from one person to another through droplets from
              an infected person when they exhale, talk, sing, sneeze or cough.
            </p>
            <p>
              This is why wearing face masks, washing your hands, and keeping a
              social distance of 6 feet (or 2 meters) significantly reduces the
              chances of spreading the virus.
            </p>
          </div>
          <div>
            <img src={img1} style={{ width: '100%' }} />
          </div>
          <div>
            <p>
              Some people who get infected with this virus do not develop any
              symptoms and are not aware they are infected. They are called
              “asymptomatic carriers” who can still spread the virus.
            </p>
            <p>
              Others who become infected with the virus develop a disease and
              have symptoms such as coughing, sneezing, shortness of breath,
              fever, chills, body aches, weakness, and/or loss of smell and
              taste. These symptoms can last for days.
            </p>
            <p>
              A small proportion of people who are infected develop more severe
              difficulties in breathing, requiring hospitalisation and help
              breathing with oxygen, medication, or a ventilator.
            </p>
            <p>
              We currently do not understand why people respond to the virus
              differently. There is currently no vaccine and there is no cure
              although there is growing evidence that some existing drugs and
              therapies may be helpful to people who develop the severe form of
              COVID-19.
            </p>{' '}
          </div>
        
    </>

    return el

  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.heroImage}>
          <img src={heroImage} style={{ width: '100%' }}></img>
        </div>
        <div style={{ maxWidth: '550px' }}>
          <h2>COVID-19 Learning Hub</h2>
          <div>
            <p>
              There’s a lot we need to learn about COVID-19. Why does it affect
              people differently? How long do symptoms last?
            </p>
            <p>
              Are there long lasting side effects? As we find answers, we will
              post them here. We will also send out information in newsletters
              and plan to host online discussions with scientists and healthcare
              providers.
            </p>
          </div>
          <Button
            type="button"
            style={{ margin: '30px auto' }}
            variant="contained"
            color="primary"
            onClick={() => alert('download')}
          >
            Join the study
          </Button>
        </div>
      </div>
     <TwoColumnTemplate nav = {
      <LeftNav  changeIndexCallbackFn={(index: number)=> setActiveItemIndex(index)} items = {navItems} activeIndex={1}/>} main={getMain()}
     ></TwoColumnTemplate>
      </div>
    
  )
}

export default LearningHub
