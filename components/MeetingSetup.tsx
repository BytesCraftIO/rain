'use client'

import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

type Props = {
  setIsSetupComplete: (value: boolean) => void
}

const MeetingSetup = (props: Props) => {
  const [isMicCamToggleOn, setisMicCamToggleOn] = useState(false)
  const call = useCall()

  if (!call) throw Error('useCall must be used within a StreamCall component')

  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable()
      call?.microphone.disable()
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggleOn}
            onChange={(e) => setisMicCamToggleOn(e.target.checked)}
          />
          <span>Turn off camera and microphone</span>
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500"
        onClick={() => {
          call.join()
          props.setIsSetupComplete(true)
        }}
      >
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup
