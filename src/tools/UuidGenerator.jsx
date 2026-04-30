import { useState } from 'react'

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState([generateUUID()])
  const [count, setCount] = useState(5)
  const [uppercase, setUppercase] = useState(false)
  const [noDash, setNoDash] = useState(false)
  const [copied, setCopied] = useState(null)

  const format = (uuid) => {
    let result = uuid
    if (noDash) result = result.replace(/-/g, '')
    if (uppercase) result = result.toUpperCase()
    return result
  }

  const generate = () => {
    const list = Array.from({ length: count }, generateUUID)
    setUuids(list)
    setCopied(null)
  }

  const copyOne = (uuid, idx) => {
    navigator.clipboard.writeText(format(uuid))
    setCopied(idx)
    setTimeout(() => setCopied(null), 1500)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.map(format).join('\n'))
    setCopied('all')
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">UUID 生成器</h2>
      <p className="text-gray-500 mb-6">批量生成 UUID v4，支持格式自定义</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">生成数量：</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={e => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
              className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} className="rounded" />
            大写
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={noDash} onChange={e => setNoDash(e.target.checked)} className="rounded" />
            去除连字符
          </label>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={generate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          生成
        </button>
        <button
          onClick={copyAll}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          {copied === 'all' ? '✓ 已复制' : '复制全部'}
        </button>
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, idx) => (
          <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3">
            <span className="font-mono text-sm text-gray-800">{format(uuid)}</span>
            <button
              onClick={() => copyOne(uuid, idx)}
              className="ml-4 text-xs text-blue-500 hover:text-blue-700 shrink-0"
            >
              {copied === idx ? '✓ 已复制' : '复制'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
