import React from 'react'

type TeamProps = {
  reason?: string
}

export const Team: React.FunctionComponent<TeamProps> = ({}: TeamProps) => {
  return (
    <div>
            <h1>&nbsp;</h1>
      <div className="Team__content1">
        <b>Wendy </b>
        <p>
          Dr. Wendy Chung is a co-Principal Investigator based at Columbia
          University with oversight over clinical operations. Dr Chung is an
          ABMG board certified clinical and molecular geneticist with 20 years
          of experience in clinical research, largely for rare diseases. She
          leads the Precision Medicine Resource of the Irving Institute at
          Columbia University and is the principal investigator of the large US
          study of autism, SPARK. She works with many patient and family led
          organizations to develop better supports and treatments for rare
          diseases and was recognized by the National Organization of Rare
          Disorders with the Rare Impact Award in 2019. She was recently
          featured in the documentary, The Gene: An Intimate History
          https://www.pbs.org/show/gene/.{' '}
        </p>
      </div>

      <div className="Team__content2">
        <b>Lara </b>
        <p>
          {' '}
          Lara Mangravite, is a co-Principal Investigator with oversight over
          technology, governance, and data commons. Dr. Mangravite has extensive
          experience leading projects at Sage Bionetworks. She favors applying
          collaborative approaches to advance understanding of disease biology
          and treatment outcomes at a systems level with the overriding goal of
          improving clinical care. Dr. Mangravite obtained a BS in
        </p>
        <p>
          Physics from the Pennsylvania State University and a PhD in
          Pharmaceutical Chemistry from the University of California, San
          Francisco. She completed a postdoctoral fellowship in cardiovascular
          pharmacogenomics at the Children’s Hospital Oakland Research
          Institute.{' '}
        </p>
      </div>
    </div>
  )
}
export default Team
