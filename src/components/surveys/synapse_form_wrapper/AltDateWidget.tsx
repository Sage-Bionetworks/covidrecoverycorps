import React, { Component, ReactNode } from 'react'
import PropTypes from 'prop-types'

import {
  shouldRender,
  parseDateString,
  toDateString,
  pad,
} from 'react-jsonschema-form/lib/utils'
import { WidgetProps } from 'react-jsonschema-form'
import i18next from 'i18next'

// Alina 5/22 this copies an existing alt date widget to allow for only date in the past.
// if .options.lessThanNow is set and the date is in the future the date resets to today.

type AltDateWidgetState = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

type AltDateOwnWidgetProps = {
  time: boolean
  disabled: boolean
  readonly: boolean
  autofocus: boolean
  options: object
  schema: object
  id: string
  value: string
  required: boolean
  registry: any
  onChange: Function
  onBlur: Function
}

type AltDateWidgetProps = AltDateOwnWidgetProps & WidgetProps

function rangeOptions(start: number, stop: number) {
  let options = []
  for (let i = start; i <= stop; i++) {
    options.push({ value: i, label: pad(i, 2) })
  }
  return options
}

function readyForChange(state: AltDateWidgetState) {
  return (Object.keys(state) as Array<keyof typeof state>).every(
    key => state[key] !== -1,
  )
}

function DateElement(props: any) {
  const {
    type,
    range,
    value,
    select,
    rootId,
    disabled,
    readonly,
    autofocus,
    registry,
    onBlur,
  } = props
  const id = rootId + '_' + type
  const { SelectWidget } = registry.widgets
  return (
    <>
      <SelectWidget
        schema={{ type: 'integer' }}
        id={id}
        className="form-control"
        options={{ enumOptions: rangeOptions(range[0], range[1]) }}
        placeholder={i18next.t(`common.date.${type}`)}
        value={value}
        disabled={disabled}
        readonly={readonly}
        autofocus={autofocus}
        onChange={(value: number) => select(type, value)}
        onBlur={onBlur}
      />
    </>
  )
}

class AltDateWidget extends Component<AltDateWidgetProps, AltDateWidgetState> {
  static defaultProps = {
    time: false,
    disabled: false,
    readonly: false,
    autofocus: false,
    options: {
      yearsRange: [1900, new Date().getFullYear() + 2],
    },
  }

  constructor(props: AltDateWidgetProps) {
    super(props)
    this.state = parseDateString(props.value, props.time)
  }

  UNSAFE_componentWillReceiveProps(nextProps: AltDateWidgetProps) {
    this.setState(parseDateString(nextProps.value, nextProps.time))
  }
  //@ts-ignore
  shouldComponentUpdate(
    nextProps: AltDateWidgetProps,
    nextState: AltDateWidgetState,
  ) {
    return shouldRender(this, nextProps, nextState)
  }

  onChange = (property: any, value: any) => {
    this.setState(
      //@ts-ignore
      { [property]: typeof value === 'undefined' ? -1 : value },
      () => {
        // Only propagate to parent state if we have a complete date{time}
        if (readyForChange(this.state)) {
          if (
            this.props.options.lessThanNow &&
            new Date(toDateString(this.state, this.props.time)).getTime() >
              new Date().getTime()
          ) {
            const nowDateObj = parseDateString(
              new Date().toLocaleDateString(),
              this.props.time,
            )

            this.setState(nowDateObj, () =>
              this.props.onChange(toDateString(this.state, this.props.time)),
            )
          } else {
            this.props.onChange(toDateString(this.state, this.props.time))
          }
        }
      },
    )
  }

  setNow = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const { time, disabled, readonly, onChange } = this.props
    if (disabled || readonly) {
      return
    }
    const nowDateObj = parseDateString(
      new Date().toLocaleDateString() /*.toJSON()*/,
      time,
    )
    this.setState(nowDateObj, () => onChange(toDateString(this.state, time)))
  }

  clear = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const { time, disabled, readonly, onChange } = this.props
    if (disabled || readonly) {
      return
    }
    this.setState(parseDateString('', time), () => onChange(undefined))
  }

  get dateElementProps() {
    const { time, options } = this.props
    const { year, month, day, hour, minute, second } = this.state
    const data = [
      {
        type: 'year',
        range: options.yearsRange,
        value: year,
      },
      { type: 'month', range: [1, 12], value: month },
      { type: 'day', range: [1, 31], value: day },
    ]
    if (time) {
      data.push(
        { type: 'hour', range: [0, 23], value: hour },
        { type: 'minute', range: [0, 59], value: minute },
        { type: 'second', range: [0, 59], value: second },
      )
    }
    return data
  }

  render() {
    //ts-ignore
    const {
      id,
      disabled,
      readonly,
      autofocus,
      registry,
      onBlur,
      options,
    } = this.props
    return (
      <ul className="list-inline">
        {this.dateElementProps.map((elemProps, i) => (
          <li key={i}>
            <DateElement
              rootId={id}
              select={this.onChange}
              {...elemProps}
              disabled={disabled}
              readonly={readonly}
              registry={registry}
              onBlur={onBlur}
              autofocus={autofocus && i === 0}
            />{' '}
          </li>
        ))}
        {(options.hideNowButton !== 'undefined'
          ? !options.hideNowButton
          : true) && (
          <li>
            <a href="#" className="btn btn-info btn-now" onClick={this.setNow}>
              Now
            </a>
          </li>
        )}
        {(options.hideClearButton !== 'undefined'
          ? !options.hideClearButton
          : true) && (
          <li>
            <a
              href="#"
              className="btn btn-warning btn-clear"
              onClick={this.clear}
            >
              {i18next.t('surveys.clear')  as ReactNode}
            </a>
          </li>
        )}
      </ul>
    )
  }
}

if (process.env.NODE_ENV !== 'production') {
  //@ts-ignore
  AltDateWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    time: PropTypes.bool,
    options: PropTypes.object,
  }
}

export default AltDateWidget
