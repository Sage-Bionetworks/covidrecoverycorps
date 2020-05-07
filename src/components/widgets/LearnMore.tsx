import React, { useState} from 'react'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type LearnMoreProps = {
  learnMoreText: string
}

export const LearnMore: React.FunctionComponent<LearnMoreProps> = (
  props
) => {
  const [isShowingLearnMore, setIsShowingLearnMore] = useState<boolean>(false)

  return (
    <div>
      <div
        onClick={() => setIsShowingLearnMore(true)}
        className="learnMoreToggle"
        style={{
          display: isShowingLearnMore ? 'none' : 'block',
        }}
      >
        <div>
          <span style={{ paddingRight: "10px" }}>{props.learnMoreText}</span>
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
