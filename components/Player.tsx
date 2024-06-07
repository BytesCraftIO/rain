import { Mic, MicOff, UserSquare2 } from 'lucide-react'
import ReactPlayer from 'react-player'

type Props = {
  url: string
  muted: boolean
  playing: boolean
  isActive: boolean
}

const Player = (props: Props) => {
  return (
    <div>
      {props.playing ? (
        <ReactPlayer
          url={props.url}
          muted={props.muted}
          playing={props.playing}
        />
      ) : (
        <div>
          <UserSquare2 size={props.isActive ? 400 : 150} />
        </div>
      )}

      {!props.isActive ? (
        props.muted ? (
          <MicOff size={20} />
        ) : (
          <Mic size={20} />
        )
      ) : undefined}
    </div>
  )
}

export default Player
