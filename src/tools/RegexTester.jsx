import { useState, useMemo } from 'react'

const PRESETS = [
  { label: '手机号', pattern: '1[3-9]\\d{9}', flags: 'g' },
  { label: '邮箱', pattern: '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { label: 'IP 地址', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { label: 'URL', pattern: 'https?:\\/\\/[^\\s]+', flags: 'g' },
  { label: '中文', pattern: '[\\u4e00-\\u9fa5]+', flags: 'g' },
  { label: '数字', pattern: '\\d+', flags: 'g' },
]

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testStr, setTestStr] = useState('')

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern || !testStr) return { matches: [], error: '', highlighted: testStr }
    try {
      const regex = new RegExp(pattern, flags)
      const allMatches = []
      let m
      const gRegex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      while ((m = gRegex.exec(testStr)) !== null) {
        allMatches.push({ value: m[0], index: m.index, end: m.index + m[0].length })
        if (!flags.includes('g')) break
      }

      // 高亮处理
      let result = []
      let last = 0
      for (const match of allMatches) {
        if (match.index > last) result.push({ text: testStr.slice(last, match.index), highlight: false })
        result.push({ text: match.value, highlight: true })
        last = match.end
      }
      if (last < testStr.length) result.push({ text: testStr.slice(last), highlight: false })

      return { matches: allMatches, error: '', highlighted: result }
    } catch (e) {
      return { matches: [], error: e.message, highlighted: [] }
    }
  }, [pattern, flags, testStr])

  const toggleFlag = (f) => {
    setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">正则测试</h2>
      <p className="text-gray-500 mb-6">实时匹配高亮，支持常用正则预设</p>

      {/* 预设 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map(p => (
          <button
            key={p.label}
            onClick={() => { setPattern(p.pattern); setFlags(p.flags) }}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 正则输入 */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-400 font-mono">/</span>
          <input
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder="输入正则表达式"
            className="flex-1 font-mono text-sm focus:outline-none text-gray-800"
          />
          <span className="text-gray-400 font-mono">/</span>
          <input
            value={flags}
            onChange={e => setFlags(e.target.value)}
            className="w-16 font-mono text-sm focus:outline-none text-blue-600"
          />
        </div>
        <div className="flex gap-3">
          {['g', 'i', 'm', 's'].map(f => (
            <label key={f} className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={flags.includes(f)}
                onChange={() => toggleFlag(f)}
                className="rounded"
              />
              <span className="font-mono">{f}</span>
              <span className="text-gray-400">({f === 'g' ? '全局' : f === 'i' ? '忽略大小写' : f === 'm' ? '多行' : '点匹配换行'})</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          ❌ 正则错误：{error}
        </div>
      )}

      {/* 测试文本 */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">测试文本</label>
        <textarea
          value={testStr}
          onChange={e => setTestStr(e.target.value)}
          placeholder="输入要测试的文本"
          className="w-full h-36 p-4 font-mono text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {/* 高亮结果 */}
      {testStr && !error && (
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            匹配结果
            <span className="ml-2 text-blue-600 font-normal">共 {matches.length} 处匹配</span>
          </label>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm leading-relaxed whitespace-pre-wrap break-all">
            {Array.isArray(highlighted) && highlighted.map((part, i) =>
              part.highlight
                ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{part.text}</mark>
                : <span key={i}>{part.text}</span>
            )}
          </div>
        </div>
      )}

      {/* 匹配列表 */}
      {matches.length > 0 && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">匹配详情</label>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {matches.map((m, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg px-3 py-2 text-sm">
                <span className="text-gray-400 text-xs w-6">#{i + 1}</span>
                <span className="font-mono text-gray-800 flex-1">{m.value}</span>
                <span className="text-gray-400 text-xs">位置 {m.index}–{m.end}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
