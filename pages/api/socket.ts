import { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'

interface ExtendedNextApiResponse extends NextApiResponse {
  socket: any & {
    server: any & {
      io: Server
    }
  }
}

const SocketHandler = (req: NextApiRequest, res: ExtendedNextApiResponse) => {
  console.log('called api')
  if (res.socket.server.io) {
    console.log('socket already running')
  } else {
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('server is connected')

      socket.on('join-room', (roomId: string, userId: string) => {
        console.log(`a new user ${userId} joined room ${roomId}`)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)
      })

      socket.on('user-toggle-audio', (userId: string, roomId: string) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-toggle-audio', userId)
      })

      socket.on('user-toggle-video', (userId: string, roomId: string) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-toggle-video', userId)
      })

      socket.on('user-leave', (userId: string, roomId: string) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-leave', userId)
      })
    })
  }
  res.end()
}

export default SocketHandler
