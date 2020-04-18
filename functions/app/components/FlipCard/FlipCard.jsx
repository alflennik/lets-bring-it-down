import React from 'react'
import { useLocation } from 'react-router-dom'

const FlipCard = () => {
  const location = useLocation()

  const [isFlipped, setIsFlipped] = useState(false)
  useEffect(() => {
    setIsFlipped(false)
    setIndex(0)
  }, [location])
  // Populate primary region data with the United States as a fallback
// const slug = window.location.pathname.slice(1)
// const region = rawData.regions.find(data => data.slug === slug) || rawData.regions[0]

// document.querySelector('#yesterday-arrow').addEventListener('click', () => {
//   document.querySelector('#center-card').classList.add('flip-card-flipped')
//   document.querySelector('#yesterday-arrow').style.opacity = 0
//   document.querySelector('#tomorrow-arrow').style.opacity = 1
// })
// document.querySelector('#tomorrow-arrow').addEventListener('click', () => {
//   document.querySelector('#center-card').classList.remove('flip-card-flipped')
//   document.querySelector('#tomorrow-arrow').style.opacity = 0
//   document.querySelector('#yesterday-arrow').style.opacity = 1
// })
  <div id='center-card' className={`flip-card ${isFlipped ? 'flip-card-flipped' : ''}`}>
  <div className='flip-card-inner'>
    <div className='flip-card-front'>
  </div>
</div>
{/* <div className="center-arrow-wrapper">
  <img 
    style={{ opacity: isFlipped ? 0 : 1 }}
    className="center-yesterday-arrow"
    src="angle-left-solid.svg"
    alt="View yesterday"
    onClick={() => {
      setIsFlipped(true)
    }}
  />
  <img 
    style={{ opacity: isFlipped ? 1 : 0 }}
    className="center-tomorrow-arrow"
    src="angle-right-white.svg"
    alt="View tomorrow"
    onClick={() => {
      setIsFlipped(false)
    }}
  />
</div> */}
        {/* <div className="flip-card-back">
              <div className="center-new-case-growth">
              </div>
              <div className="center-number">{region.dailyNewCaseGrowth[1].formattedValue}</div>
              <div className="center-region-name">{region.name}</div>
            </div> */}
}

export default FlipCard
