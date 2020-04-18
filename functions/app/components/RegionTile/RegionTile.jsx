import React from 'react'
import { Link } from 'react-router-dom'
import regionPropTypes from '../App/regionPropTypes'
import DownFromYesterday from '../DownFromYesterday'
import './RegionTile.css'

const RegionTile = ({ region }) => {
  const { isIncreasing } = region.dailyNewCaseGrowth[0]
  return (
    <Link
      to={`/${region.slug}`}
      className={`region-tile ${isIncreasing ? 'region-tile-growing' : 'region-tile-reducing'}`}
    >
      {region.image ? <img alt={region.name} src={region.image} /> : null}
      <div className='region-tile-name'>{region.name}</div>
      <div className='region-tile-value'>{region.dailyNewCaseGrowth[0].formattedValue}</div>
      <DownFromYesterday
        today={region.dailyNewCaseGrowth[0]}
        yesterday={region.dailyNewCaseGrowth[1]}
      />
    </Link>
  )
}

RegionTile.propTypes = {
  region: regionPropTypes.isRequired
}

export default RegionTile
