import React from 'react'
import { SpeedInsights } from "@vercel/speed-insights/next"


const app = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <SpeedInsights />
    </div>
  )
}

export default app
