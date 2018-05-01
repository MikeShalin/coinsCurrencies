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

export default props => {
  const Height = document.documentElement.clientHeight - 100
  return (
    <ResponsiveContainer height={Height}>
      <LineChart
        data={props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="low" stroke="#82ca9d" />
        <Line type="monotone" dataKey="high" stroke="#DC143C" />
        <Line type="monotone" dataKey="open" stroke="#00CED1" />
      </LineChart>
    </ResponsiveContainer>
  )
}
