import { useEffect, useState } from 'react'

const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth)
    }

    const throttledListener = () => {
      window.requestAnimationFrame(listener)
    }

    window.addEventListener('resize', throttledListener)
    return () => {
      window.removeEventListener('resize', throttledListener)
    }
  }, [])

  return width
}

export default useWidth
