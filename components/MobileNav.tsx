'use client'

import { MenuIcon, VideoIcon } from 'lucide-react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MobileNav = () => {
  const pathname = usePathname()
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <MenuIcon size={34} className="curosr-pointer sm:hidden" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex items-center gap-4 text-white">
            <div className="bg-yellow-300 text-dark-1 p-2 rounded-xl">
              <VideoIcon size={32} />
            </div>
            <p className="text-xl font-bold">Rain</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex  flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.route
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.route}
                        className={cn(
                          'flex flex-1 gap-4 items-center p-4 rounded-lg w-full',
                          {
                            'bg-blue-1': isActive,
                          }
                        )}
                      >
                        <link.icon size={24} />
                        <span>{link.label}</span>
                      </Link>
                    </SheetClose>
                  )
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
