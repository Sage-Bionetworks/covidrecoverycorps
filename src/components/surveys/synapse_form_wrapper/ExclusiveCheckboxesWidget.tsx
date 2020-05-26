import React from 'react'
import PropTypes from 'prop-types'
import { WidgetProps } from 'react-jsonschema-form'

/* This is en enhanced CheckboxedWidget from 
https://github.com/rjsf-team/react-jsonschema-form/blob/master/packages/core/src/components/widgets/CheckboxesWidget.js
It enhances original widget by allowing exlusive fields i.e. checkboxes that work like radio buttons.
It relies on the 'exclusive' ui option. The exclusive option is an array of indices from the end which would essentially deselect other options
e.g  "exclusive":[0, 1] ui option means that if the last item, or the item before it is selected all the others need to be deselected
*/

function selectValue(value: any, selected: any, all: any, exclusive: any) {
  const at = all.indexOf(value)
  const lastIndex = all.length - 1
  const indexFromEnd = lastIndex - at
  let updated
  //if we are selecting an exclusive box-- deselect others
  if (exclusive && exclusive.indexOf(indexFromEnd) > -1) {
    updated = [value] as any
  } else {
    {
      //deselect exclusive
      //find exclusive values
      const exclValues = exclusive.map(
        (index: number) => all[lastIndex - index],
      )
      updated = selected.slice(0, at).concat(value, selected.slice(at))
      updated = updated.filter((item: any) => exclValues.indexOf(item) === -1)
    }
  }
  // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order

  return updated.sort((a: any, b: any) => all.indexOf(a) > all.indexOf(b))
}

function deselectValue(value: any, selected: any) {
  return selected.filter((v: any) => v !== value)
}

function ExclusiveCheckboxesWidget(props: WidgetProps) {
  const {
    id,
    disabled,
    options,
    value,
    autofocus,
    readonly,
    onChange,
    formContext,
  } = props
  const { enumOptions, enumDisabled, inline, exclusive } = options
  return (
    <div className="checkboxes" id={id}>
      {(enumOptions as any).map((option: any, index: number) => {
        const checked = value.indexOf(option.value) !== -1
        const itemDisabled =
          enumDisabled && (enumDisabled as any).indexOf(option.value) != -1
        const disabledCls =
          disabled || itemDisabled || readonly ? 'disabled' : ''
        const checkbox = (
          <span>
            <input
              type="checkbox"
              id={`${id}_${index}`}
              checked={checked}
              disabled={disabled || itemDisabled || readonly}
              autoFocus={autofocus && index === 0}
              onChange={event => {
                const all = (enumOptions as any).map(({ value }: any) => value)
                if (event.target.checked) {
                  onChange(selectValue(option.value, value, all, exclusive))
                } else {
                  onChange(deselectValue(option.value, value))
                }
              }}
            />
            <span>{option.label}</span>
          </span>
        )
        return inline ? (
          <label key={index} className={`checkbox-inline ${disabledCls}`}>
            {checkbox}
          </label>
        ) : (
          <div key={index} className={`checkbox ${disabledCls}`}>
            <label>{checkbox}</label>
          </div>
        )
      })}
    </div>
  )
}

ExclusiveCheckboxesWidget.defaultProps = {
  autofocus: false,
  options: {
    inline: false,
  },
}

if (process.env.NODE_ENV !== 'production') {
  ExclusiveCheckboxesWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  }
}

export default ExclusiveCheckboxesWidget
