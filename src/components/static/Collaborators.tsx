import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'


type CollaboratorsProps = {
  reason?: string
}

export const Collaborators: React.FunctionComponent<CollaboratorsProps> = ({}: CollaboratorsProps) => {
  return (

      
    <div className="Collaborators">
      <h1>Collaborators</h1>

      <div className="Collaboratorscontent">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <h1>As COVID-19 makes a home in our communities </h1>
      <div className="Collaboratorscontent2">
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

export default Collaborators
