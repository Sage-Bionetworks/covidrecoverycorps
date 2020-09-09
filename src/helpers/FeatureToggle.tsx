import React, { FunctionComponent, createContext, useContext } from 'react'
import { getSearchParams } from './utility'

export type ToggleKeys = 'RESULTS_VIDEO' | 'SPANISH' | 'RESULTS_UPLOAD'

export const TOGGLE_NAMES: { [key in ToggleKeys]: string } = {
  RESULTS_VIDEO: 'resultsVideo',
  SPANISH: 'spanish',
  RESULTS_UPLOAD: 'resultsUpload',
}

type Flags = {
  [key: string]: boolean
}

type FeatureToggleProps = {
  toggleName: string
  showIfFalse?: boolean
  children: React.ReactNode
}

export const FeaturesContext = createContext<Flags | undefined>(undefined)

export const FeaturesProvider = FeaturesContext.Provider

export const getToggleState = (
  flags: Flags | undefined,
  toggleName: string,
) => {
  const searchParams = getSearchParams(window.location.search)
  if (!flags) {
    return true
  }
  return flags[toggleName] || Object.keys(searchParams).indexOf(toggleName) > -1
}

export const Feature = ({
  toggleName,
  showIfFalse,
  children,
}: FeatureToggleProps) => {
  const flags = useContext(FeaturesContext)

  if (!children) {
    return <></>
  }

  const toggleState = getToggleState(flags, toggleName)

  return (toggleState && !showIfFalse) || (!toggleState && showIfFalse) ? (
    <>{children}</>
  ) : (
    <></>
  )
}
