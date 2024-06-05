import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from './ui/button'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  children?: React.ReactNode
  extraClass?: string
  buttonText?: string
  handleClick?: () => void
  image?: string
  buttonIcon?: string
}

const MeetingModal = (props: Props) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {props.image && (
            <div className="flex justify-center">
              <Image src={props.image} width={72} height={72} alt="meeting" />
            </div>
          )}
          <h1
            className={cn(
              'text-3xl font-bold leading-[42px]',
              props.extraClass
            )}
          >
            {props.title}
          </h1>
          {props.children}
          <Button
            onClick={props.handleClick}
            className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {props.buttonIcon && (
              <span className="mr-2">{props.buttonIcon}</span>
            )}
            {props.buttonText || 'Schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal
