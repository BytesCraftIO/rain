'use client'

import Player from '@/components/Player'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import useMediaStream from '@/hooks/useMediaStream'
import usePeer from '@/hooks/usePeer'
import usePlayer from '@/hooks/usePlayer'
import { useSocket } from '@/providers/SocketProvider'
import { cloneDeep } from 'lodash'
import { MicOff, PhoneMissedIcon, VideoIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  params: {
    id: string
  }
}

type User = {
  [key: string]: any
}

const Meeting = (props: Props) => {
  const [muted, setMuted] = useState<boolean>(true)
  const [video, setVideo] = useState<boolean>(true)

  const socket = useSocket()
  const { peer, myId } = usePeer(props.params.id)
  const { stream } = useMediaStream()
  const [users, setUsers] = useState<User[]>([])
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, props.params.id, peer)

  useEffect(() => {
    if (!socket || !peer || !stream) return
    const handleUserConnected = (newUser: string) => {
      console.log(`user connected in room with userId ${newUser}`)

      const call = peer.call(newUser, stream)

      call.on('stream', (incomingStreamUrl: any) => {
        console.log(`incoming stream from ${newUser}`)
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStreamUrl,
            muted: true,
            playing: true,
          },
        }))

        setUsers((prev) => ({
          ...prev,
          [newUser]: call,
        }))
      })
    }
    socket.on('user-connected', handleUserConnected)

    return () => {
      socket.off('user-connected', handleUserConnected)
    }
  }, [peer, setPlayers, socket, stream])

  useEffect(() => {
    if (!socket) return
    const handleToggleAudio = (userId: string) => {
      console.log(`user with id ${userId} toggled audio`)
      setPlayers((prev) => {
        const copy = cloneDeep(prev)
        copy[userId].muted = !copy[userId].muted
        return { ...copy }
      })
    }

    const handleToggleVideo = (userId: string) => {
      console.log(`user with id ${userId} toggled video`)
      setPlayers((prev) => {
        const copy = cloneDeep(prev)
        copy[userId].playing = !copy[userId].playing
        return { ...copy }
      })
    }

    const handleUserLeave = (userId: any) => {
      console.log(`user ${userId} is leaving the room`)
      users[userId]?.close()
      const playersCopy = cloneDeep(players)
      delete playersCopy[userId]
      setPlayers(playersCopy)
    }
    socket.on('user-toggle-audio', handleToggleAudio)
    socket.on('user-toggle-video', handleToggleVideo)
    socket.on('user-leave', handleUserLeave)
    return () => {
      socket.off('user-toggle-audio', handleToggleAudio)
      socket.off('user-toggle-video', handleToggleVideo)
      socket.off('user-leave', handleUserLeave)
    }
  }, [players, setPlayers, socket, users])

  useEffect(() => {
    if (!peer || !stream) return
    peer.on('call', (call) => {
      const { peer: callerId } = call
      call.answer(stream)

      call.on('stream', (incomingStream: any) => {
        console.log(`incoming stream from ${callerId}`)
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }))

        setUsers((prev) => ({
          ...prev,
          [callerId]: call,
        }))
      })
    })
  }, [peer, setPlayers, stream])

  useEffect(() => {
    if (!stream || !myId) return
    console.log(`setting my stream ${myId}`)
    setPlayers((prev: any) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }))
  }, [myId, setPlayers, stream])

  return (
    <main className="h-screen w-full">
      <div className="h-[calc(100vh-100px)] border-2">
        {playerHighlighted && (
          <Player
            url={playerHighlighted.url}
            muted={playerHighlighted.muted}
            playing={playerHighlighted.playing}
            isActive
          />
        )}

        {Object.keys(nonHighlightedPlayers).map((playerId) => {
          const { url, muted, playing } = nonHighlightedPlayers[playerId]
          return (
            <Player
              key={playerId}
              url={url}
              muted={muted}
              playing={playing}
              isActive={false}
            />
          )
        })}
      </div>

      <div className="h-16 flex items-center justify-center">
        <ToggleGroup type="multiple" className="text-white">
          <ToggleGroupItem
            value="toggleAudio"
            onClick={() => {
              setMuted(!muted)
              toggleAudio()
            }}
          >
            <MicOff size={20} />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="toggleVideo"
            onClick={() => {
              setVideo(!video)
              toggleVideo()
            }}
          >
            <VideoIcon size={20} />
          </ToggleGroupItem>
          <ToggleGroupItem value="leaveRoom" onClick={leaveRoom}>
            <PhoneMissedIcon size={20} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </main>
  )
}

export default Meeting
