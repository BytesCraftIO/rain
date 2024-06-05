import StreamClientProvider from '@/providers/StreamClientProvider'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const RootLayout = (props: Props) => {
  return (
    <main>
      <StreamClientProvider>{props.children}</StreamClientProvider>
    </main>
  )
}

export default RootLayout
