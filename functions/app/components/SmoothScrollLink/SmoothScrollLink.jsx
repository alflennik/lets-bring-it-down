import React from 'react'
import PropTypes from 'prop-types'

const SmoothScrollLink = ({ id, className, children }) => {
  const click = event => {
    event.preventDefault()
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <a onClick={click} href={id} className={className}>
      {children}
    </a>
  )
}

SmoothScrollLink.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

SmoothScrollLink.defaultProps = {
  className: ''
}

export default SmoothScrollLink
