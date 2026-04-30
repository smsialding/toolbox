import { useState } from 'react'
import JsonFormatter from './tools/JsonFormatter'
import TimestampConverter from './tools/TimestampConverter'
import Base64Tool from './tools/Base64Tool'
import UuidGenerator from './tools/UuidGenerator'
import RegexTester from './tools/RegexTester'
import SqlFormatter from './tools/SqlFormatter'

const tools = [
  { id: 'json', name: 'JSON 格式化', icon: '{}', component: JsonFormatter },
  { id: 'timestamp', name: '时间戳转换', icon: '🕐', component: TimestampConverter },
  { id: 'base64', name: 'Base64 编解码', icon: '🔐', component: Base64Tool },
  { id: 'uuid', name: 'UUID 生成', icon: '🆔', component: UuidGenerator },
  { id: 'regex', name: '正则测试', icon: '.*', component: RegexTester },
  { id: 'sql', name: 'SQL 美化', icon: '🗄️', component: SqlFormatter },
]

function App() {
  const [activeTool, setActiveTool] = useState('json')
  const ActiveComponent = tools.find(t => t.id === activeTool)?.component

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">开发者工具箱</h1>
          <p className="text-sm text-gray-500 mt-1">Developer Toolbox</p>
        </div>
        <nav className="p-4">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTool === tool.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">{tool.icon}</span>
              {tool.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </main>
    </div>
  )
}

export default App
