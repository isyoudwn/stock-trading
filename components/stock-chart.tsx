"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type StockData = {
  name: string
  symbol: string
  price: number
  change: number
  volume: number
  high: number
  low: number
}

// Generate mock chart data based on the stock
const generateChartData = (stock: StockData) => {
  const basePrice = stock.price * 0.95
  const data = []

  for (let i = 0; i < 20; i++) {
    const time = `${9 + Math.floor(i / 4)}:${(i % 4) * 15 === 0 ? "00" : (i % 4) * 15}`
    const randomFactor = 1 + (Math.random() * 0.1 - 0.05)
    const price = basePrice * (1 + i / 20) * randomFactor

    data.push({
      time,
      price: Math.round(price),
    })
  }

  return data
}

export default function StockChart({ stockData }: { stockData: StockData }) {
  const chartData = generateChartData(stockData)
  const chartColor = stockData.change >= 0 ? "#16a34a" : "#dc2626"

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} tickMargin={10} tickFormatter={(value) => value} />
          <YAxis
            domain={["dataMin - 1000", "dataMax + 1000"]}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()}원`, "가격"]}
            labelFormatter={(label) => `${label}`}
          />
          <Line type="monotone" dataKey="price" stroke={chartColor} strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
