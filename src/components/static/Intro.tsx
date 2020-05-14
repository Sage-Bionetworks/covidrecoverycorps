import React from 'react'
import { makeStyles } from '@material-ui/core'
import {playfairDisplayFont, openSansFont} from '../../App'
import LandingPageAboveFold from '../../assets/LandingPageAboveFold.png'

type IntroProps = {
  token: string | null
}

const useStyles = makeStyles(theme => ({
  heroImage: {
    backgroundImage: `url(${LandingPageAboveFold})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '50%'
  },
  heroText: {
    color: '#F2F2F2',
    fontFamily: playfairDisplayFont,
    fontSize: '5.5rem'
  }
}))

export const Intro: React.FunctionComponent<IntroProps> = ({

}: IntroProps) => {
  const classes = useStyles()
  return (
    <div className="Intro">
       <div>
         <div className={classes.heroImage}>
            <div className={classes.heroText}>
              A citizen-powered movement to drive scientific breakthroughs and save lives in the fight against COVID-19.
            </div>
         </div>
        <div className="Intro__content1">
          {' '}
          <p>
            If you live in the New York Tri-State area and have recovered from
            COVID-19 — or think you have— you can help scientists make progress
            in the global fight against this disease.{' '}
          </p>
        </div>
        <h1>Why Participate? </h1>
        <div className="Intro__content2">
          <p>
            {' '}
            There is an urgent need to come together as a community to rapidly
            advance our understanding of COVID-19. By sharing your experience in
            recovering from COVID-19, you can help scientists answer critical
            questions such as: Why do some people experience very mild symptoms
            while others get very sick? How does the body fight this virus? What
            levels of antibodies are needed to protect us from reinfection and
            how long might any immunity last? How does recovering from COVID-19
            impact your health over time?{' '}
          </p>
          <p>
            Your participation may also help save lives. Participants who
            undergo serological testing and test positive for antibodies can
            choose to donate plasma and help those still fighting for survival
            from COVID-19.
          </p>
        </div>

        <h1> How it works </h1>
        <div className="Intro__content3">
          <p>
            {' '}
            There is an urgent need to come together as a community to rapidly
            advance our understanding of COVID-19. By sharing your experience in
            recovering from COVID-19, you can help scientists answer critical
            questions such as: Why do some people experience very mild symptoms
            while others get very sick? How does the body fight this virus? What
            levels of antibodies are needed to protect us from reinfection and
            how long might any immunity last? How does recovering from COVID-19
            impact your health over time?{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Intro
