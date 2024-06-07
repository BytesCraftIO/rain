import { Mic, MicOff, UserCircleIcon } from 'lucide-react'
import ReactPlayer from 'react-player'

type Props = {
  url: string
  muted: boolean
  playing: boolean
  isActive: boolean
}

const Player = (props: Props) => {
  return (
    <div className="m-4 rounded-xl text-white bg-dark-1 w-fit">
      {!props.isActive ? (
        props.muted ? (
          <div className="absolute m-6 bg-white text-black p-2 rounded-full shadow-lg">
            <MicOff size={20} />
          </div>
        ) : (
          <div>
            <Mic size={20} />
          </div>
        )
      ) : undefined}
      {props.playing ? (
        <div className="w-[300px] h-[300px] flex items-center justify-center rounded-lg">
          <ReactPlayer
            url={props.url}
            muted={props.muted}
            playing={props.playing}
            width="300px"
            height="300px"
          />
        </div>
      ) : (
        <div className="w-[300px] h-[300px] flex items-center justify-center rounded-lg">
          <UserCircleIcon size={100} />
        </div>
      )}
    </div>
  )
}

export default Player
