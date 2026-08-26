'use client'

import { FC, useMemo, useState } from 'react'
import { LunarCalendar } from '@lodashx/ts'

import { MonthCalendar } from '@/components/molecules/MonthCalendar'
import { WeekView } from '@/components/molecules/WeekView'
import { DayView } from '@/components/molecules/DayView'
import { ThreeDayView } from '@/components/molecules/ThreeDayView'
import { MonthlyView } from '@/components/molecules/MonthlyView'
import { YearlyView } from '@/components/molecules/YearlyView'
import { LunarDate } from '@/components/atoms/LunarDate'
import { EventList } from '@/components/atoms/EventList'
import { View, years, months } from '@/data/constants'
import { events } from '@/data/events'

const lunarCalendar = new LunarCalendar()

const VIEW_LABELS: Record<View, string> = {
  [View.THREE_DAY]: '3 Days',
  [View.DAY]: 'Day',
  [View.WEEK]: 'Week',
  [View.MONTH]: 'Month',
  [View.MONTHLY]: '12 Months',
  [View.YEARLY]: 'Year',
}

const getEventsForDate = (date: Date) =>
  events.filter(({ year, month, date: d, frequency }) => {
    const yearMatch = year === 0 || frequency === 'annual' || year === date.getFullYear()
    const monthMatch = month === 0 || month === date.getMonth() + 1
    const dateMatch = d === 0 || d === date.getDate()
    return yearMatch && monthMatch && dateMatch
  })

export const CalendarApp: FC = () => {
  const today = new Date()
  const [state, setState] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    weekStart: getWeekStart(today),
    view: View.MONTH,
  })
  const [chosenDate, setChosenDate] = useState(today)

  const chosenEvents = useMemo(() => getEventsForDate(chosenDate), [chosenDate])

  const lunarResult = useMemo(() => {
    const result = lunarCalendar.solar2lunar(
      chosenDate.getFullYear(),
      chosenDate.getMonth() + 1,
      chosenDate.getDate(),
    )
    return result === -1 ? null : result
  }, [chosenDate])

  const handlePrev = () => {
    setState((prev) => {
      if (prev.view === View.MONTH || prev.view === View.DAY || prev.view === View.THREE_DAY) {
        const newMonth = prev.month === 0 ? 11 : prev.month - 1
        const newYear = prev.month === 0 ? prev.year - 1 : prev.year
        return { ...prev, month: newMonth, year: newYear }
      }
      if (prev.view === View.WEEK) {
        const d = new Date(prev.weekStart)
        d.setDate(d.getDate() - 7)
        return { ...prev, weekStart: d, year: d.getFullYear(), month: d.getMonth() }
      }
      return { ...prev, year: prev.year - 1 }
    })
  }

  const handleNext = () => {
    setState((prev) => {
      if (prev.view === View.MONTH || prev.view === View.DAY || prev.view === View.THREE_DAY) {
        const newMonth = prev.month === 11 ? 0 : prev.month + 1
        const newYear = prev.month === 11 ? prev.year + 1 : prev.year
        return { ...prev, month: newMonth, year: newYear }
      }
      if (prev.view === View.WEEK) {
        const d = new Date(prev.weekStart)
        d.setDate(d.getDate() + 7)
        return { ...prev, weekStart: d, year: d.getFullYear(), month: d.getMonth() }
      }
      return { ...prev, year: prev.year + 1 }
    })
  }

  const handleToday = () => {
    const t = new Date()
    setState({
      year: t.getFullYear(),
      month: t.getMonth(),
      weekStart: getWeekStart(t),
      view: state.view,
    })
    setChosenDate(t)
  }

  const handleViewChange = (view: View) => {
    setState((prev) => ({ ...prev, view }))
  }

  const handleMonthSelect = (month: number) => {
    setState((prev) => ({ ...prev, month, year: prev.year }))
  }

  const handleYearSelect = (year: number) => {
    setState((prev) => ({ ...prev, year }))
  }

  const headerLabel =
    state.view === View.WEEK
      ? formatWeekRange(state.weekStart)
      : state.view === View.MONTHLY
        ? `${state.year}`
        : state.view === View.YEARLY
          ? `${state.year}`
          : `${months[state.month]} ${state.year}`

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <nav className="border-base-content/10 flex items-center gap-2 border-b px-4 py-2">
        <button className="btn btn-sm btn-ghost" onClick={handleToday}>
          Today
        </button>
        <button className="btn btn-sm btn-ghost btn-square" onClick={handlePrev}>
          ‹
        </button>
        <button className="btn btn-sm btn-ghost btn-square" onClick={handleNext}>
          ›
        </button>
        <h2 className="text-base-content mr-auto text-lg font-semibold">{headerLabel}</h2>
        {(state.view === View.MONTH ||
          state.view === View.DAY ||
          state.view === View.THREE_DAY) && (
          <select
            className="select select-sm select-bordered border-base-content/10 bg-base-100 text-base-content"
            value={state.month}
            onChange={(e) => handleMonthSelect(Number(e.target.value))}
          >
            {months.map((name, i) => (
              <option key={name} value={i}>
                {name}
              </option>
            ))}
          </select>
        )}
        {(state.view === View.MONTH ||
          state.view === View.MONTHLY ||
          state.view === View.YEARLY) && (
          <select
            className="select select-sm select-bordered border-base-content/10 bg-base-100 text-base-content"
            value={state.year}
            onChange={(e) => handleYearSelect(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        )}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
            {VIEW_LABELS[state.view]}
          </div>
          <ul
            tabIndex={-1}
            className="menu dropdown-content border-base-content/10 bg-base-100 z-50 mt-1 w-40 rounded-box border shadow-lg"
          >
            {Object.values(View).map((v) => (
              <li key={v}>
                <a className={state.view === v ? 'active' : ''} onClick={() => handleViewChange(v)}>
                  {VIEW_LABELS[v]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="flex-1 overflow-auto">
        {state.view === View.MONTH && (
          <>
            <MonthCalendar
              year={state.year}
              month={state.month}
              chosenDate={chosenDate}
              onDateSelect={setChosenDate}
              events={events}
            />
            <div className="border-base-content/10 border-t" />
            <LunarDate
              chosenDate={chosenDate}
              lunarDay={lunarResult?.lDay ?? null}
              lunarMonth={lunarResult?.lMonth ?? null}
              lunarYear={lunarResult?.lYear ?? null}
            />
            <div className="border-base-content/10 border-t" />
            <EventList events={chosenEvents} />
          </>
        )}
        {state.view === View.WEEK && <WeekView year={state.year} weekStart={state.weekStart} />}
        {state.view === View.DAY && (
          <DayView year={state.year} month={state.month} day={today.getDate()} />
        )}
        {state.view === View.THREE_DAY && (
          <ThreeDayView year={state.year} month={state.month} day={today.getDate()} />
        )}
        {state.view === View.MONTHLY && <MonthlyView year={state.year} />}
        {state.view === View.YEARLY && <YearlyView year={state.year} />}
      </div>
    </div>
  )
}
CalendarApp.displayName = 'CalendarApp'

function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - day)
  d.setHours(0, 0, 0, 0)
  return d
}

function formatWeekRange(start: Date): string {
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  const sm = months[start.getMonth()].slice(0, 3)
  const em = months[end.getMonth()].slice(0, 3)
  if (start.getMonth() === end.getMonth()) {
    return `${sm} ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`
  }
  return `${sm} ${start.getDate()} – ${em} ${end.getDate()}, ${end.getFullYear()}`
}
