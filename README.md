# 开发者工具箱 · Dev Toolbox

一个为后端开发者（尤其是 Java 程序员）打造的一站式在线工具箱，告别广告满天飞的零散工具网站。

## ✨ 功能

| 工具 | 说明 |
|------|------|
| **JSON 格式化** | 格式化 / 压缩 JSON，自动检测语法错误，支持 2 / 4 空格缩进 |
| **时间戳转换** | Unix 时间戳与日期时间互转，自动识别秒级 / 毫秒级 |
| **Base64 编解码** | 支持 UTF-8 中文字符的 Base64 编码与解码，一键反转 |
| **UUID 生成器** | 批量生成 UUID v4，支持大写、去连字符格式 |
| **正则测试** | 实时高亮匹配结果，内置手机号、邮箱、IP、URL 等常用预设 |
| **SQL 美化** | 格式化 SQL 语句，关键字自动大写，支持 MySQL / PostgreSQL / Oracle 等方言 |

## 🚀 快速开始

**环境要求：** Node.js 18+

```bash
# 克隆项目
git clone https://github.com/smsialding/toolbox.git
cd toolbox

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 http://localhost:5173 即可使用。

## 🏗️ 构建部署

```bash
# 构建生产包
npm run build

# 本地预览构建结果
npm run preview
```

构建产物在 `dist/` 目录，可直接部署到任意静态托管服务（Nginx、GitHub Pages、Vercel、Cloudflare Pages 等）。

## 🛠️ 技术栈

- **React 19** — UI 框架
- **Tailwind CSS v4** — 样式
- **Vite 8** — 构建工具
- **sql-formatter** — SQL 格式化

## 📁 项目结构

```
src/
├── App.jsx                  # 主布局（侧边栏 + 内容区）
├── index.css                # 全局样式
└── tools/
    ├── JsonFormatter.jsx    # JSON 格式化
    ├── TimestampConverter.jsx  # 时间戳转换
    ├── Base64Tool.jsx       # Base64 编解码
    ├── UuidGenerator.jsx    # UUID 生成器
    ├── RegexTester.jsx      # 正则测试
    └── SqlFormatter.jsx     # SQL 美化
```

## 🤝 贡献

欢迎提 Issue 或 PR，新增工具请在 `src/tools/` 下创建组件，并在 `App.jsx` 的 `tools` 数组中注册即可。

## License

MIT
