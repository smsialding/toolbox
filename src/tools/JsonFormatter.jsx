import { useState } from 'react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError('')
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
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
      <h2 className="text-2xl font-bold text-gray-800 mb-2">JSON 格式化</h2>
      <p className="text-gray-500 mb-6">格式化、压缩 JSON 数据，自动检测语法错误</p>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm text-gray-600">缩进空格：</label>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">输入</label>
            <button onClick={clear} className="text-xs text-gray-400 hover:text-gray-600">清空</button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='粘贴 JSON 数据，例如：{"name":"张三","age":18}'
            className="w-full h-80 p-4 font-mono text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">输出</label>
            <button onClick={copyOutput} className="text-xs text-blue-500 hover:text-blue-700">复制</button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="格式化结果将显示在这里"
            className="w-full h-80 p-4 font-mono text-sm border border-gray-200 rounded-lg resize-none bg-gray-50 focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          ❌ {error}
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <button
          onClick={format}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          格式化
        </button>
        <button
          onClick={minify}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          压缩
        </button>
      </div>
    </div>
  )
}
