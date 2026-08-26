import { FC } from 'react'
import { TimeGrid } from '@/components/atoms/TimeGrid'

interface DayViewProps {
  year: number
  month: number
  day: number
}

export const DayView: FC<DayViewProps> = ({ year, month, day }) => {
  const date = new Date(year, month, day)

  return (
    <div className="flex h-full flex-col">
      <TimeGrid dates={[date]} showDayHeader={false} />
    </div>
  )
}
DayView.displayName = 'DayView'
