import { makeStyles } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import React from 'react'
import { WidgetProps } from 'react-jsonschema-form'

const useStyles = makeStyles({
  root: {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    display: 'flex',
    flexDirection: 'row',
  },
  radioRange: {
    flexBasis: '50%',
    justifyContent: 'space-evenly',
  },
  minMaxLabel: {
    flexBasis: '25%',
    fontSize: '14px',
    alignSelf: 'center',
  },
  rangeLabel: {
    fontSize: '1.4rem',
  },
  radio: {
    padding: 0,
    fontSize: '1.2rem',
  },
  radioLabel: {
    margin: 0,
  },
  myLabel: {
    fontSize: '1rem',
  },
})

const RadioWidget = ({
  id,
  schema,
  options,
  value,
  required,
  disabled,
  readonly,
  label,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps) => {
  const { enumOptions, enumDisabled } = options

  const _onChange = ({}, value: any) =>
    onChange(schema.type == 'boolean' ? value !== 'false' : value)
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, value)
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value)

  const row = options ? options.inline : false

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <span className={classes.minMaxLabel}>{options.minLabel}</span>
      {/*  <FormLabel required={required} htmlFor={id}>
        {label || schema.title}
  </FormLabel>*/}
      <RadioGroup
        value={`${value}`}
        row={row as boolean}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        classes={{ root: classes.radioRange }}
      >
        {(enumOptions as any).map((option: any, i: number) => {
          const itemDisabled =
            enumDisabled && (enumDisabled as any).indexOf(option.value) != -1

          const radio = (
            <FormControlLabel
              className={classes.radioLabel}
              classes={{ label: classes.rangeLabel }}
              control={
                <Radio color="primary" key={i} className={classes.radio} />
              }
              label={`${option.label}`}
              value={`${option.value}`}
              key={i}
              labelPlacement="top"
              disabled={disabled || itemDisabled || readonly}
            />
          )

          return radio
        })}
      </RadioGroup>
      <span
        className={classes.minMaxLabel}
        style={{
          textAlign: 'right',
        }}
      >
        {options.maxLabel}
      </span>
    </div>
  )
}

export default RadioWidget
