import {
  AlarmClockIcon,
  ArrowLeftToLineIcon,
  HomeIcon,
  VenetianMaskIcon,
  VideoIcon,
} from 'lucide-react'

export const sidebarLinks = [
  {
    label: 'Home',
    route: '/',
    icon: HomeIcon,
  },
  {
    label: 'Upcoming',
    route: '/upcoming',
    icon: AlarmClockIcon,
  },
  {
    label: 'Previous',
    route: '/previous',
    icon: ArrowLeftToLineIcon,
  },
  {
    label: 'Recordings',
    route: '/recordings',
    icon: VideoIcon,
  },
  {
    label: 'Personal Room',
    route: '/personal-room',
    icon: VenetianMaskIcon,
  },
]
