import React from 'react'

const Graph = (/* { values, yAxisHighlightedValue, yAxisEndsAtMininimum } */) => {
  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1300px',
      margin: '0 auto',
      height: '15vh', 
      display: 'grid', 
      gridTemplateColumns: '60px calc(100% - 120px)',
      gridTemplateRows: '1fr 30px'
    }}>
      <svg style={{ width: '100%', height: '100%' }}>
        <text fontSize="12px" textAnchor="end" x="55" y="10px" fill="white">+10%</text>
        <text fontSize="12px" textAnchor="end" x="55" y="50%" fill="white"style={{ transform: 'translateY(4px)' }}>0%</text>
        <text fontSize="12px" textAnchor="end" x="55" y="100%" fill="white">-10%</text>
      </svg>
      <svg style={{ width: '100%', height: '100%' }}>
        {/* Graph Top Indicator */}
        <line x1="0%" x2="3%" y1="0" y2="0" stroke="white" strokeWidth="1" />
        <line x1="97%" x2="100%" y1="0" y2="0" stroke="white" strokeWidth="1" />

        {/* Graph Lines */}
        <line x1="0%" x2="10%" y1="30%" y2="40%" stroke="white" strokeWidth="1" />
        <circle cx="10%" cy="40%" r="2" fill="white" />
        <line x1="10%" x2="20%" y1="40%" y2="30%" stroke="white" strokeWidth="1" />
        <circle cx="20%" cy="30%" r="2" fill="white" />
        <line x1="20%" x2="30%" y1="30%" y2="40%" stroke="white" strokeWidth="1" />
        <circle cx="30%" cy="40%" r="2" fill="white" />
        <line x1="30%" x2="40%" y1="40%" y2="60%" stroke="white" strokeWidth="1" />
        <circle cx="40%" cy="60%" r="2" fill="white" />
        <line x1="40%" x2="50%" y1="60%" y2="70%" stroke="white" strokeWidth="1" />

        {/* Glowing circle */}
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
        <circle cx="50%" cy="70%" r="4" fill="white" />
        <circle cx="50%" cy="70%" r="10" fill="white" filter="url(#blur)" />
        <circle cx="50%" cy="70%" r="12" fill="none" stroke="white" strokeWidth="1" />

        {/* Dotted line */}
        <line x1="0%" x2="100%" y1="50%" y2="50%" stroke="white" strokeDasharray="4" strokeWidth="1" />

        {/* Bottom Line */}
        <line x1="0%" x2="100%" y1="100%" y2="100%" stroke="white" strokeWidth="1" />

        {/* Bottom Line Ticks */}
        <line x1="10%" x2="10%" y1="97%" y2="100%" stroke="white" strokeWidth="1" />
        <line x1="20%" x2="20%" y1="97%" y2="100%" stroke="white" strokeWidth="1" />
        <line x1="30%" x2="30%" y1="97%" y2="100%" stroke="white" strokeWidth="1" />
        <line x1="40%" x2="40%" y1="97%" y2="100%" stroke="white" strokeWidth="1" />
        <line x1="50%" x2="50%" y1="97%" y2="100%" stroke="white" strokeWidth="1" />
      </svg>
      <svg style={{ width: '100%', height: '100%', gridColumnStart: '2' }}>
        <text fontSize="12px" textAnchor="middle" x="50%" y="15px" fill="white">Today</text>
      </svg>
    </div>
  )
}

export default Graph