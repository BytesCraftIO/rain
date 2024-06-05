import { SignedIn, UserButton } from '@clerk/nextjs'
import { VideoIcon } from 'lucide-react'
import Link from 'next/link'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 text-white">
      <Link href="/" className="flex items-center gap-4 text-white">
        <div className="bg-yellow-300 text-dark-1 p-1 rounded-xl">
          <VideoIcon size={32} className="p-1" />
        </div>
        <p className="text-xl font-bold">Rain</p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
