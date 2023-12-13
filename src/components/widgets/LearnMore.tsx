import React, { useState } from 'react'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type LearnMoreProps = {
  learnMoreText: string
  clickableElement?: JSX.Element
  defaultIsShowing?: boolean
}

export const LearnMore: React.FunctionComponent<React.PropsWithChildren<LearnMoreProps>> = props => {
  const { defaultIsShowing, clickableElement } = props
  const [isShowingLearnMore, setIsShowingLearnMore] = useState<boolean>(
    defaultIsShowing ? defaultIsShowing : false,
  )

  return (
    <div>
      <div
        onClick={() => setIsShowingLearnMore(!isShowingLearnMore)}
        className="learnMoreClickableElement"
      >
        {clickableElement}
      </div>
      <div
        onClick={() => setIsShowingLearnMore(true)}
        className="learnMoreToggle"
        style={{
          display: isShowingLearnMore ? 'none' : 'block',
        }}
      >
        <div>
          <span style={{ paddingRight: '10px' }}>{props.learnMoreText}</span>
          <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
        </div>
      </div>
      <div
        className="learnLessToggle"
        style={{
          display: isShowingLearnMore ? 'flex' : 'none',
        }}
      >
        {props.children}
        <button onClick={() => setIsShowingLearnMore(false)}>
          <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  )
}

export default LearnMore
