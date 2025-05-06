"use client"

import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

const marketIndices = [
  { name: "KOSPI", value: "2,648.76", change: 0.85, status: "up" },
  { name: "KOSDAQ", value: "868.52", change: -0.32, status: "down" },
  { name: "원/달러", value: "1,342.50", change: 0.12, status: "up" },
  { name: "국고채 3년", value: "3.42%", change: 0, status: "neutral" },
]

export default function MarketOverview() {
  return (
    <div className="space-y-3">
      {marketIndices.map((index) => (
        <div key={index.name} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50">
          <div>
            <p className="font-medium">{index.name}</p>
            <p className="text-sm text-gray-500">지수</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{index.value}</p>
            <p
              className={`text-sm flex items-center justify-end ${
                index.status === "up" ? "text-green-600" : index.status === "down" ? "text-red-600" : "text-gray-500"
              }`}
            >
              {index.status === "up" && <ArrowUpRight className="h-3 w-3 mr-1" />}
              {index.status === "down" && <ArrowDownRight className="h-3 w-3 mr-1" />}
              {index.status === "neutral" && <Minus className="h-3 w-3 mr-1" />}
              {index.change > 0 ? "+" : ""}
              {index.change}%
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
