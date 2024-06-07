import { useEffect, useRef, useState } from 'react'

const useMediaStream = () => {
  const [streamState, setStreamState] = useState<MediaStream | null>(null)
  const isStreamSet = useRef<Boolean>(false)

  useEffect(() => {
    if (isStreamSet.current) return
    isStreamSet.current = true
    ;(async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        })
        console.log('setting your stream')
        setStreamState(stream)
      } catch (e) {
        console.log('Error in media navigator', e)
      }
    })()
  }, [])

  return {
    stream: streamState,
  }
}

export default useMediaStream
