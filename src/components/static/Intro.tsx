import React from 'react'


type IntroProps = {
  token: string | null
}

export const Intro: React.FunctionComponent<IntroProps> = ({

}: IntroProps) => {

  return (
    <div className="Intro">
   

      <div>
        <h1> A citizen-powered movement to fuel COVID-19 discoveries. </h1>
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
