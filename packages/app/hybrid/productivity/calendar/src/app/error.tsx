'use client'

import { FC } from 'react'

const ErrorPage: FC<{ error: Error; reset: () => void }> = ({ error, reset }) => (
  <div className="flex h-screen flex-col items-center justify-center gap-4">
    <h1 className="text-2xl">Something went wrong</h1>
    <p className="max-w-md text-center text-sm">{error.message}</p>
    <button className="btn btn-primary btn-sm" onClick={reset}>
      Try again
    </button>
  </div>
)

export default ErrorPage
