import React from 'react'
import Dashboard from '../Dashboard'
import { SESSION_NAME } from '../../types/types'


type HowItWorksProps = {
  reason?: string
}

export const HowItWorks: React.FunctionComponent<HowItWorksProps> = ({}: HowItWorksProps) => {
  return (
 <div className="sdsHowItWorks">
      <h2>How it works</h2>

      <div className="HowItWorkscontent">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <h2>As COVID-19 makes a home in our communities </h2>
      <div className="HowItWorkscontent2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
    </div>
  )
}

export default HowItWorks
