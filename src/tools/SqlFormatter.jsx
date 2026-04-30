import { useState } from 'react'
import { format } from 'sql-formatter'

const DIALECTS = [
  { value: 'sql', label: 'Standard SQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'oracle', label: 'Oracle' },
]

export default function SqlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [dialect, setDialect] = useState('sql')
  const [indent, setIndent] = useState(2)

  const formatSql = () => {
    if (!input.trim()) return
    try {
      const result = format(input, {
        language: dialect,
        tabWidth: indent,
        keywordCase: 'upper',
      })
      setOutput(result)
      setError('')
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  const copyOutput = () => {
    if (output) navigator.clipboard.writeText(output)
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">SQL 美化</h2>
      <p className="text-gray-500 mb-6">格式化 SQL 语句，关键字自动大写，支持多种数据库方言</p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">方言：</label>
          <select
            value={dialect}
            onChange={e => setDialect(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {DIALECTS.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">缩进：</label>
          {[2, 4].map(n => (
            <button
              key={n}
              onClick={() => setIndent(n)}
              className={`px-3 py-1 rounded text-sm ${indent === n ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {n} 空格
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">输入 SQL</label>
            <button onClick={clear} className="text-xs text-gray-400 hover:text-gray-600">清空</button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="粘贴 SQL 语句，例如：select id,name from user where age>18 order by id desc"
            className="w-full h-80 p-4 font-mono text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">格式化结果</label>
            <button onClick={copyOutput} className="text-xs text-blue-500 hover:text-blue-700">复制</button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="格式化后的 SQL 将显示在这里"
            className="w-full h-80 p-4 font-mono text-sm border border-gray-200 rounded-lg resize-none bg-gray-50 focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          ❌ {error}
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={formatSql}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          格式化
        </button>
      </div>
    </div>
  )
}
