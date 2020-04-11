/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import './withMobileVersion.css'

const withMobileVersion = Component => {
  return props => {
    return (
      <>
        <div className='mobile'>
          <Component {...props} isMobile />
        </div>
        <div className='desktop'>
          <Component {...props} isMobile={false} />
        </div>
      </>
    )
  }
}

export default withMobileVersion
