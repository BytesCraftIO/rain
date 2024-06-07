import MeetingTypeList from '@/components/MeetingTypeList'
import { format } from 'date-fns'
import { CalendarIcon, ClockIcon } from 'lucide-react'
const Home = () => {
  const now = new Date()

  const date = format(now, 'dd/MM/yyyy')
  const time = format(now, 'hh:mm a')

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-dark-1 border-white border">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="bg-yellow-200 text-black p-2 rounded w-fit">
            Upcoming Meetings: 12:30 PM
          </h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <ClockIcon size={36} />
              <span className="text-lg font-bold">{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon size={36} />
              <span className="text-lg font-bold">{date}</span>
            </div>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home
