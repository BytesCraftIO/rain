import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  description: string
  icon: React.ReactNode
  extraClass?: string
  onClick?: () => void
}

const HomeCard = (props: Props) => {
  return (
    <div onClick={props.onClick}>
      <Card className="rounded-[20px] bg-dark-1 text-white">
        <CardHeader>
          <div
            className={cn(
              'flex justify-center items-center size-10 p-2 rounded-full',
              props.extraClass
            )}
          >
            {props.icon}
          </div>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold">{props.title}</h1>
          <p>{props.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default HomeCard
