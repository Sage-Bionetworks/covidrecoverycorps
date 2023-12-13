import { useState, useEffect, useCallback } from 'react'

function useForm(
  stateSchema: any,
  validationSchema: any = {},
  callback: Function,
) {
  const [state, setState] = useState(stateSchema)
  const [disable, setDisable] = useState(true)
  const [isDirty, setIsDirty] = useState(false)

  // Disable button in initial render.
  useEffect(() => {
    setDisable(true)
  }, [])

  // For every changed in our state this will be fired
  // To be able to disable the button
  useEffect(() => {
    if (isDirty) {
      setDisable(validateState())
    }
  }, [state, isDirty])

  // Used to disable submit button if there's an error in state
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).some(key => {
      console.log('validatin' + key)
      const isInputFieldRequired = validationSchema[key].required
      const stateValue = state[key].value // state value
      console.log('value is', stateValue)
      const stateError = state[key].error // state error
      console.log(key + ' stateError ', stateError)

      return (isInputFieldRequired && !stateValue) || stateError
    })

    return hasErrorInState
  }, [state, validationSchema])

  // Used to handle every changes in every input
  const handleOnChange = useCallback(
    (event:any) => {
      setIsDirty(true)
      console.log(event)
      const name = event.target.name
      const value = event.target.value
      console.log(name + ' is changed to ' + value)

      let error = ''
      if (validationSchema[name].required) {
        if (!value) {
          error = 'This is required field.'
        }
      }

      if (
        validationSchema[name].validator !== null &&
        typeof validationSchema[name].validator === 'object'
      ) {
        if (validationSchema[name].validator.regEx !== undefined) {
          if (value && !validationSchema[name].validator.regEx.test(value)) {
            error = validationSchema[name].validator.error
          }
        }

        if (validationSchema[name].validator.fn !== undefined) {
          const result = validationSchema[name].validator.fn(value)
          if (value && !validationSchema[name].validator.fn(value)) {
            error = validationSchema[name].validator.error

            console.log('validation for' + value + ' ' + result)
          }
        }
      }

      setState((prevState: any) => ({
        ...prevState,
        [name]: { value, error },
      }))
    },
    [validationSchema],
  )

  const handleOnSubmit = useCallback(
    (event:any) => {
      event.preventDefault()
      console.log('state is ' + !validateState())

      // Make sure that validateState returns false
      // Before calling the submit callback function
      if (!validateState()) {
        callback(state)
      }
    },
    [state],
  )

  return { state, disable, handleOnChange, handleOnSubmit }
}

export default useForm
