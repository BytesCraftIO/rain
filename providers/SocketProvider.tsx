'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Socket, io } from 'socket.io-client'

const SocketContext = createContext<Socket | null>(null)

type Props = {
  children: ReactNode
}

export const useSocket = () => {
  const socket = useContext(SocketContext)
  // if (!socket) {
  //   throw new Error('useSocket must be used within a SocketProvider')
  // }
  return socket
}

const SocketProvider = (props: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  useEffect(() => {
    const connection = io()
    setSocket(connection)
  }, [])

  socket?.on('connect_error', async (err) => {
    console.log(err)
    await fetch('/api/socket/')
  })

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
