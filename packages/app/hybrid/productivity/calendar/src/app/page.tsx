import { FC } from 'react'
import { Header } from '@/components/organisms/Header'
import { CalendarApp } from '@/components/organisms/CalendarApp'

const HomePage: FC = () => (
  <div className="flex flex-col">
    <Header />
    <CalendarApp />
  </div>
)

export default HomePage
