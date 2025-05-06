"use client"

import { useState } from "react"
import { Search, TrendingUp, TrendingDown, BarChart3, RefreshCcw } from "lucide-react"
import StockChart from "@/components/stock-chart"
import MarketOverview from "@/components/market-overview"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock data - replace with your actual data fetching logic
const mockStocks = [
  { name: "삼성전자", symbol: "005930", price: 72800, change: 2.1, volume: 12345678, high: 73000, low: 71500 },
  { name: "SK하이닉스", symbol: "000660", price: 156000, change: 1.5, volume: 5678901, high: 157000, low: 154000 },
  { name: "NAVER", symbol: "035420", price: 186500, change: -0.8, volume: 2345678, high: 188000, low: 185000 },
  { name: "카카오", symbol: "035720", price: 56700, change: -1.2, volume: 3456789, high: 57500, low: 56500 },
  { name: "현대차", symbol: "005380", price: 187500, change: 0.5, volume: 1234567, high: 188000, low: 186000 },
  { name: "LG화학", symbol: "051910", price: 498000, change: 3.2, volume: 987654, high: 500000, low: 490000 },
  { name: "셀트리온", symbol: "068270", price: 176500, change: -0.5, volume: 876543, high: 178000, low: 175000 },
  { name: "기아", symbol: "000270", price: 85600, change: 1.8, volume: 2345678, high: 86000, low: 84500 },
]

export default function Home() {
  const [stocks, setStocks] = useState(mockStocks)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStock, setSelectedStock] = useState(mockStocks[0])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredStocks = stocks.filter(
    (stock) => stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || stock.symbol.includes(searchTerm),
  )

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
      // Here you would normally fetch fresh data
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="mr-2 text-green-600" /> 실시간 주식 거래 시스템
            </h1>
            <p className="text-gray-500 mt-1">최신 시장 데이터 및 거래 기능</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="종목명 또는 코드 검색"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              className={isRefreshing ? "animate-spin" : ""}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                {selectedStock.name} ({selectedStock.symbol})
              </h2>
              <div className="text-lg font-bold">
                {selectedStock.price.toLocaleString()}원
                <span className={`ml-2 ${selectedStock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {selectedStock.change >= 0 ? "+" : ""}
                  {selectedStock.change}%
                </span>
              </div>
            </div>
            <StockChart stockData={selectedStock} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">고가</p>
                <p className="font-medium">{selectedStock.high.toLocaleString()}원</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">저가</p>
                <p className="font-medium">{selectedStock.low.toLocaleString()}원</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">거래량</p>
                <p className="font-medium">{selectedStock.volume.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">등락률</p>
                <p className={`font-medium ${selectedStock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {selectedStock.change >= 0 ? "+" : ""}
                  {selectedStock.change}%
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">매수</Button>
              <Button className="flex-1 bg-red-600 hover:bg-red-700">매도</Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">시장 개요</h2>
              <MarketOverview />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">실시간 주식 시세</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">종목명</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">코드</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">현재가</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">등락률</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStocks.map((stock) => (
                      <tr
                        key={stock.symbol}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedStock(stock)}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{stock.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{stock.symbol}</td>
                        <td className="px-4 py-3 text-sm text-right font-medium">{stock.price.toLocaleString()}원</td>
                        <td
                          className={`px-4 py-3 text-sm text-right font-medium ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {stock.change >= 0 ? (
                            <span className="flex items-center justify-end">
                              <TrendingUp className="h-3 w-3 mr-1" />+{stock.change}%
                            </span>
                          ) : (
                            <span className="flex items-center justify-end">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              {stock.change}%
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
