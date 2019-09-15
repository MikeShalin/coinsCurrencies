import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import {
  height,
  margin,
  activeDot,
} from './config'

const Graph = ({ data }) => (
  <ResponsiveContainer height={height}>
    <LineChart
      data={data}
      margin={margin}
    >
      <XAxis dataKey="time" />
      <YAxis unit=" USD" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="close"
        stroke="#8884d8"
        activeDot={activeDot}
      />
      <Line type="monotone" dataKey="low" stroke="#82ca9d" />
      <Line type="monotone" dataKey="high" stroke="#DC143C" />
      <Line type="monotone" dataKey="open" stroke="#00CED1" />
    </LineChart>
  </ResponsiveContainer>
)

export default Graph
