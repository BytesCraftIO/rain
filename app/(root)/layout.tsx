import SocketProvider from '@/providers/SocketProvider'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const RootLayout = (props: Props) => {
  return (
    <main>
      <SocketProvider>{props.children}</SocketProvider>
    </main>
  )
}

export default RootLayout
