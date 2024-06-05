'use client'

import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { CalendarPlus2Icon, PlusIcon, UserIcon, VideoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useToast } from './ui/use-toast'

const MeetingTypeList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<
    'isScheduledMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined)

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  })
  const [callDetails, setCallDetails] = useState<Call>()
  const { toast } = useToast()

  const { user } = useUser()
  const client = useStreamVideoClient()

  const createMeeting = async () => {
    if (!user || !client) return
    try {
      if (!values.dateTime) {
        toast({
          title: 'Please select a date and time.',
        })
        return
      }
      const id = crypto.randomUUID()
      const call = client.call('default', id)
      if (!call) throw new Error('Call not found')

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || 'Instant Meeting'

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      })
      setCallDetails(call)

      if (!values.description) {
        router.push(`/meeting/${id}`)
      }

      toast({
        title: 'Meeting created successfully.',
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Something went wrong',
      })
    }
  }

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        title="New Meeting"
        description="Start a new meeting"
        extraClass="bg-orange-500"
        icon={<PlusIcon size={36} />}
        onClick={() => {
          setMeetingState('isInstantMeeting')
        }}
      />
      <HomeCard
        title="Schedule Meeting"
        description="Plan your meeting"
        extraClass="bg-green-500"
        icon={<CalendarPlus2Icon size={36} />}
        onClick={() => {
          setMeetingState('isScheduledMeeting')
        }}
      />
      <HomeCard
        title="View Recordings"
        description="View All Recordings"
        extraClass="bg-blue-500"
        icon={<VideoIcon size={36} />}
        onClick={() => {
          setMeetingState(undefined)
        }}
      />
      <HomeCard
        title="Join Meeting"
        description="Via invite link"
        extraClass="bg-red-500"
        icon={<UserIcon size={36} />}
        onClick={() => {
          setMeetingState('isJoiningMeeting')
        }}
      />

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start Instant Meeting"
        extraClass="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList
