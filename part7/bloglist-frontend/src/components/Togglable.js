// eslint-disable-next-line no-unused-vars
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {return { toggleVisibility }})
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id='show-button' color="inherit" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button id='cancel-button' color="inherit" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default Togglable