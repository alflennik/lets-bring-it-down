import React from 'react'
import './withMobileVersion.css'

const withMobileVersion = (Component, width) => {
  return props => {
    return (
      <>
        <div className='mobile'>
          <Component {...props} isMobile={true} />
        </div>
        <div className='desktop'>
          <Component {...props} isMobile={false} />
        </div>
      </>
    )
  }
}

export default withMobileVersion
