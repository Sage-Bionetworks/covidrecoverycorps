import React, { FunctionComponent, createContext, useContext } from 'react'
import { getSearchParams } from './utility'

export type ToggleKeys = 'RESULTS_VIDEO' | 'SPANISH'

export const TOGGLE_NAMES: { [key in ToggleKeys]: string } = {
  RESULTS_VIDEO: 'resultsVideo',
  SPANISH: 'spanish',
}

type flags = {
  [key: string]: boolean
}

type FeatureToggleProps = {
  toggleName: string
  showIfFalse?: boolean
  children: React.ReactNode
}

const FeaturesContext = createContext<flags | undefined>(undefined)

export const FeaturesProvider = FeaturesContext.Provider

export const Feature = ({
  toggleName,
  showIfFalse,
  children,
}: FeatureToggleProps) => {
  const flags = useContext(FeaturesContext)
  const searchParams = getSearchParams(window.location.search)
  const keys = Object.keys(searchParams)

  const getToggleState = () => {
    if (!flags) {
      return true
    }
    return flags[toggleName] || keys.indexOf(toggleName) > -1
  }

  if (!children) {
    return <></>
  }

  return (getToggleState() && !showIfFalse) ||
    (!getToggleState() && showIfFalse) ? (
    <>{children}</>
  ) : (
    <></>
  )
}
