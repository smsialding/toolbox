import { useState } from 'react'

function pad(n) {
  return String(n).padStart(2, '0')
}

function toLocalDatetimeString(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [datetime, setDatetime] = useState('')
  const [tsResult, setTsResult] = useState(null)
  const [dtResult, setDtResult] = useState(null)
  const [tsError, setTsError] = useState('')
  const [dtError, setDtError] = useState('')

  const now = () => {
    const ts = Math.floor(Date.now() / 1000)
    setTimestamp(String(ts))
    setTsResult(null)
    setTsError('')
  }

  const convertTimestamp = () => {
    const ts = timestamp.trim()
    if (!ts) return
    let ms = Number(ts)
    if (isNaN(ms)) { setTsError('请输入有效的数字时间戳'); return }
    // 自动判断秒/毫秒
    if (ts.length <= 10) ms = ms * 1000
    const date = new Date(ms)
    if (isNaN(date.getTime())) { setTsError('时间戳无效'); return }
    setTsResult({
      local: toLocalDatetimeString(date),
      utc: date.toUTCString(),
      iso: date.toISOString(),
    })
    setTsError('')
  }

  const convertDatetime = () => {
    const dt = datetime.trim()
    if (!dt) return
    const date = new Date(dt)
    if (isNaN(date.getTime())) { setDtError('日期格式无效，请使用 YYYY-MM-DD HH:mm:ss'); return }
    setDtResult({
      seconds: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
    })
    setDtError('')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">时间戳转换</h2>
      <p className="text-gray-500 mb-6">Unix 时间戳与日期时间互转，自动识别秒/毫秒</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 时间戳 → 日期 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-700 mb-4">时间戳 → 日期</h3>
          <div className="flex gap-2 mb-3">
            <input
              value={timestamp}
              onChange={e => setTimestamp(e.target.value)}
              placeholder="输入时间戳，如 1714492800"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={now} className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">现在</button>
          </div>
          <button onClick={convertTimestamp} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium mb-3">转换</button>
          {tsError && <p className="text-red-500 text-sm">{tsError}</p>}
          {tsResult && (
            <div className="space-y-2 text-sm">
              <ResultRow label="本地时间" value={tsResult.local} />
              <ResultRow label="UTC 时间" value={tsResult.utc} />
              <ResultRow label="ISO 8601" value={tsResult.iso} />
            </div>
          )}
        </div>

        {/* 日期 → 时间戳 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-700 mb-4">日期 → 时间戳</h3>
          <input
            value={datetime}
            onChange={e => setDatetime(e.target.value)}
            placeholder="如 2024-05-01 12:00:00"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <button onClick={convertDatetime} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium mb-3">转换</button>
          {dtError && <p className="text-red-500 text-sm">{dtError}</p>}
          {dtResult && (
            <div className="space-y-2 text-sm">
              <ResultRow label="秒级时间戳" value={String(dtResult.seconds)} />
              <ResultRow label="毫秒时间戳" value={String(dtResult.milliseconds)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ResultRow({ label, value }) {
  const copy = () => navigator.clipboard.writeText(value)
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
      <span className="text-gray-500 mr-2 shrink-0">{label}</span>
      <span className="font-mono text-gray-800 truncate">{value}</span>
      <button onClick={copy} className="ml-2 text-blue-400 hover:text-blue-600 shrink-0 text-xs">复制</button>
    </div>
  )
}
