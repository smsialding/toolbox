import { useState } from 'react'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState('encode') // encode | decode

  const encode = () => {
    try {
      const result = btoa(unescape(encodeURIComponent(input)))
      setOutput(result)
      setError('')
    } catch (e) {
      setError('编码失败：' + e.message)
    }
  }

  const decode = () => {
    try {
      const result = decodeURIComponent(escape(atob(input)))
      setOutput(result)
      setError('')
    } catch (e) {
      setError('解码失败：输入不是有效的 Base64 字符串')
    }
  }

  const handleConvert = () => {
    if (!input.trim()) return
    mode === 'encode' ? encode() : decode()
  }

  const swap = () => {
    setInput(output)
    setOutput('')
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  const copyOutput = () => {
    if (output) navigator.clipboard.writeText(output)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Base64 编解码</h2>
      <p className="text-gray-500 mb-6">支持 UTF-8 中文字符的 Base64 编码与解码</p>

      <div className="flex gap-3 mb-4">
        {['encode', 'decode'].map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setOutput(''); setError('') }}
            className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors ${mode === m ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {m === 'encode' ? '编码' : '解码'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              {mode === 'encode' ? '原始文本' : 'Base64 字符串'}
            </label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="text-xs text-gray-400 hover:text-gray-600">清空</button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '输入要编码的文本，支持中文' : '输入 Base64 字符串'}
            className="w-full h-64 p-4 font-mono text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Base64 结果' : '解码结果'}
            </label>
            <button onClick={copyOutput} className="text-xs text-blue-500 hover:text-blue-700">复制</button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="结果将显示在这里"
            className="w-full h-64 p-4 font-mono text-sm border border-gray-200 rounded-lg resize-none bg-gray-50 focus:outline-none"
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
          onClick={handleConvert}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {mode === 'encode' ? '编码' : '解码'}
        </button>
        <button
          onClick={swap}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          ⇄ 反转
        </button>
      </div>
    </div>
  )
}
