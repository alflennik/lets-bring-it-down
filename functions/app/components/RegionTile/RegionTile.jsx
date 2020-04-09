import React from 'react'
import { Link } from 'react-router-dom'
import regionPropTypes from '../App/regionPropTypes'
import DownFromYesterday from '../DownFromYesterday'
import './RegionTile.css'

const RegionTile = ({ region }) => {
  const isReducing = region.dailyInfectionRates[0].value <= 0
  return (
    <Link to={`/${region.slug}`} className={`region-tile ${isReducing ? 'region-tile-reducing' : 'region-tile-growing'}`}>
      {region.image ? <img alt={`Image of ${region.name}`} src={region.image} /> : null}
      <div className="region-tile-name">{region.name}</div>
      <div className="region-tile-value">{region.dailyInfectionRates[0].formattedValue}</div>
      <DownFromYesterday
        today={region.dailyInfectionRates[0]}
        yesterday={region.dailyInfectionRates[1]}
      />
    </Link>
  )
}

RegionTile.propTypes = {
  region: regionPropTypes,
}

export default RegionTile