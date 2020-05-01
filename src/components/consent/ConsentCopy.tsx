import React, { useState, useEffect } from 'react'

export type StepInfo= {
    isSummary: boolean
    step: number
}

export type ConsentCopyProps = {
    stepInfo?: StepInfo
    screen?: string

}

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eu orci quis posuere. Maecenas pulvinar nulla vel lacus malesuada, nec dapibus ipsum egestas. Integer vitae nunc iaculis, rhoncus neque a, imperdiet diam. Sed vulputate rhoncus elit eu pellentesque. In aliquam dui tellus, eu pellentesque massa dictum quis. Nulla facilisi. Ut quis augue ac diam ullamcorper commodo et vitae tellus. Maecenas quis laoreet mauris, a volutpat odio. Nam quis tellus a turpis accumsan rutrum. Nulla sed mi id augue pretium bibendum. Sed mollis, metus eu egestas mattis, nibh metus mollis odio, nec cursus arcu lectus a diam. Nunc hendrerit nibh ac pharetra semper. Nulla vel est sem.

Donec lacus nisi, malesuada nec velit eu, porta sagittis ante. Quisque sollicitudin ligula dignissim, fringilla libero non, consectetur ante. Vestibulum ac dictum ligula. Integer metus turpis, venenatis quis erat non, mollis laoreet quam. Nunc consequat ante lacus, vitae viverra sem fermentum ut. Morbi id odio nunc. Morbi fringilla rhoncus neque a tempus. Sed sapien nulla, volutpat et mauris et, commodo imperdiet tellus.

Pellentesque semper pharetra ligula, ac faucibus lorem fermentum et. Morbi ultrices nulla quis iaculis mollis. Praesent molestie mi at pretium consectetur. Ut malesuada lacinia malesuada. Curabitur efficitur dolor at cursus tincidunt. Sed dictum ligula hendrerit ultrices ornare. Quisque quis ligula sit amet est dictum volutpat vitae consequat ipsum. Nam auctor, mauris eget ullamcorper eleifend, nunc nibh sodales odio, vel eleifend magna velit et nibh. Suspendisse lectus dui, dictum eget elementum ut, sodales sit amet nunc. Nulla ex diam, tincidunt a velit eu, rutrum lobortis turpis. Duis consectetur lorem vitae arcu lobortis, vel egestas libero viverra. Nullam lacinia bibendum leo id mattis. Duis interdum augue eros, id luctus velit finibus eleifend. Aliquam sapien purus, condimentum vel lacus vehicula, commodo imperdiet dolor.

Proin ut tellus non massa volutpat ornare eu quis ligula. Aenean luctus vitae neque eu euismod. Vestibulum in purus ut nisi consectetur luctus non et risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sagittis, neque eget vulputate rutrum, tellus felis ornare turpis, vitae lobortis nisl odio ac libero. Curabitur ex tellus, tempor in feugiat eu, vehicula nec justo. Ut ac feugiat dolor. Aliquam commodo purus a lacus accumsan condimentum. Donec at gravida dolor. Suspendisse tincidunt lectus eget vehicula eleifend. Sed sodales purus vel sapien euismod, sit amet pulvinar nunc lacinia. Nullam cursus, enim ac luctus mattis, ipsum nisl rhoncus eros, in scelerisque nunc nulla at sapien. Vestibulum sed aliquet dui, varius scelerisque risus. Nullam vehicula euismod laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

Sed efficitur orci ligula. Donec congue leo vitae velit semper, vel sagittis leo lobortis. Sed ultrices libero justo, vitae efficitur nulla egestas in. Vivamus ac lacinia mauris, et vulputate neque. Vivamus eros nisi, porttitor sit amet tellus ac, vulputate auctor lorem. Cras laoreet felis mauris, vel tincidunt eros interdum tincidunt. Quisque odio justo, pharetra sed facilisis sed, egestas congue mi. Aliquam ex tortor, fermentum egestas tellus at, lobortis dapibus elit. Curabitur tincidunt turpis lorem.`

const summaryScreens = [
    <div>
      <h2>Alina Is TestingAbout the Study</h2> (summary) What is COVID Recovery Corps Who are
      the major players How long is the study? Data and Specimens
    </div>,
    <div>
      <h2> What will I be asked to do?</h2>
      Data - Survey and EHR (optional) Specimens- blood draw and/or at home kit
      (nasal/rectal/ Future contact{' '}
    </div>,
    <div><h2>What are the benefits?</h2> Return Results Not medical care</div>,

    <div>
      <h2>What are the risks?</h2>
      Data breach You may receive uncertain results
    </div>,
    <div>
      <h2>Your Data and Privacy</h2>
      We can’t ensure total privacy We de-identify your data Do everything we
      can to protect your data and privacy
    </div>,
    <div>
      <h2>Sharing your data with future researchers</h2>
      Data breach You may receive uncertain results
    </div>,

    <div>
      <h2>Leaving the study</h2>
      Data breach You may receive uncertain results
    </div>,
    <div>
      <h2>Things you should consider before you say yes</h2>
      Data breach You may receive uncertain results
    </div>,
  ]


  const fullTextScreens = [
    <div>
      <h2>About the Study</h2> (summary) What is COVID Recovery Corps Who are
      the major players How long is the study? Data and Specimens {loremIpsum}
    </div>,
    <div>
      <h2> What will I be asked to do?</h2>
      Data - Survey and EHR (optional) Specimens- blood draw and/or at home kit
      (nasal/rectal/ Future contact{' '}{loremIpsum}
    </div>,
    <div>What are the benefits? Return Results Not medical care</div>,

    <div>
      <h2>What are the risks?</h2>
      Data breach You may receive uncertain results{loremIpsum}
    </div>,
    <div>
      <h2>Your Data and Privacy</h2>
      We can’t ensure total privacy We de-identify your data Do everything we
      can to protect your data and privacy {loremIpsum}
    </div>,
    <div>
      <h2>Sharing your data with future researchers</h2>
      Data breach You may receive uncertain results {loremIpsum}
    </div>,

    <div>
      <h2>Leaving the study</h2>
      Data breach You may receive uncertain results {loremIpsum}
    </div>,
    <div>
      <h2>Things you should consider before you say yes</h2>
      Data breach You may receive uncertain results {loremIpsum}
    </div>,
  ]

  const screens: {[key: string]: JSX.Element} = {
      INTRO: <div>intro  + loremIpsum</div>
  }


export const ConsentCopy: React.FunctionComponent<ConsentCopyProps> = ({
  stepInfo, screen
}: ConsentCopyProps) => {

    if (screen) {
        return screens[screen]
    } 

    if(stepInfo){
  return  stepInfo.isSummary? summaryScreens[stepInfo.step]: fullTextScreens[stepInfo.step]
    }

  return <></>
}

export default ConsentCopy
