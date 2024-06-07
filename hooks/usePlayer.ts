'use client'

import { useSocket } from '@/providers/SocketProvider'
import { cloneDeep } from 'lodash'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const usePlayer = (myId: string, roomId: string, peer: any) => {
  const socket = useSocket()
  const [players, setPlayers] = useState({})
  const router = useRouter()
  const playersCopy = cloneDeep(players)

  const playerHighlighted = playersCopy[myId]
  delete playersCopy[myId]

  const nonHighlightedPlayers = playersCopy

  const leaveRoom = () => {
    socket.emit('user-leave', myId, roomId)
    console.log('leaving room', roomId)
    peer?.disconnect()
    router.push('/')
  }

  const toggleAudio = () => {
    console.log('I toggled my audio')
    setPlayers((prev) => {
      const copy = cloneDeep(prev)
      copy[myId].muted = !copy[myId].muted
      return { ...copy }
    })
    socket.emit('user-toggle-audio', myId, roomId)
  }

  const toggleVideo = () => {
    console.log('I toggled my video')
    setPlayers((prev) => {
      const copy = cloneDeep(prev)
      copy[myId].playing = !copy[myId].playing
      return { ...copy }
    })
    socket.emit('user-toggle-video', myId, roomId)
  }

  return {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  }
}

export default usePlayer
