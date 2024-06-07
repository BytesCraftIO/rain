import { useSocket } from '@/providers/SocketProvider'
import Peer from 'peerjs'

import { useEffect, useRef, useState } from 'react'

const usePeer = (roomId: string) => {
  const socket = useSocket()
  const [peer, setPeer] = useState<Peer | null>(null)
  const [myId, setMyId] = useState<string>('')
  const isPeerSet = useRef(false)

  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return
    isPeerSet.current = true
    let myPeer
    ;(async function initPeer() {
      myPeer = new (await import('peerjs')).default()
      setPeer(myPeer)

      myPeer.on('open', (id) => {
        console.log(`your peer id is ${id}`)
        setMyId(id)
        socket?.emit('join-room', roomId, id)
      })
    })()
  }, [roomId, socket])

  return {
    peer,
    myId,
  }
}

export default usePeer
