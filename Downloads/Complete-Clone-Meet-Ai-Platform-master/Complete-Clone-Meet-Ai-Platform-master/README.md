# Meet AI Platform 🚀

A next-generation video conferencing platform powered by AI - smarter meetings, more productive discussions, and effortlessly organized.

![Meet AI](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![Stream](https://img.shields.io/badge/Stream-Video%20SDK-005FFF?logo=stream)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)

---

## ✨ Features

| Core Functionality | Technology |
|-------------------|------------|
| 📹 Real-time Video Calls | Stream Video SDK |
| 🤖 AI-Powered Agents | Custom Instructions |
| 👤 User Authentication | Better Auth |
| 📊 Dashboard | Modern UI with shadcn/ui |
| 🗄️ Database | PostgreSQL + Drizzle ORM |

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19, Tailwind CSS v4, shadcn/ui
- **Video**: Stream Video React SDK
- **Auth**: Better Auth with email/password + social providers
- **Database**: PostgreSQL (Neon) + Drizzle ORM
- **API**: tRPC for type-safe APIs
- **State**: TanStack Query (React Query)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or bun
- PostgreSQL database (recommend [Neon](https://neon.tech))
- Stream.io account

### Installation

```bash
# Clone the repository
git clone https://github.com/berserk3142-max/meet.ai.git
cd meet.ai

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# Authentication
BETTER_AUTH_SECRET="your_random_secret_string"
BETTER_AUTH_URL=http://localhost:3000

# OAuth (Optional)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stream Video
NEXT_PUBLIC_STREAM_API_KEY="your_stream_api_key"
STREAM_API_SECRET="your_stream_api_secret"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Setup

```bash
# Push database schema
npm run db:push
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   └── api/               # API routes
├── components/            # Reusable UI components
├── db/                    # Database schema & config
├── lib/                   # Utility libraries
│   ├── auth.ts           # Better Auth config
│   ├── stream.ts         # Stream server client
│   └── stream-provider.tsx # Stream client provider
├── modules/              # Feature modules
│   ├── agents/           # AI agents management
│   ├── meetings/         # Video meetings
│   └── dashboard/        # Dashboard components
└── trpc/                 # tRPC router & procedures
```

---

## 🎥 Video Calling

The platform uses **Stream Video SDK** for real-time video conferencing:

- **Server-side**: Token generation and call management
- **Client-side**: React SDK with built-in components
- **Features**: Camera/mic controls, speaker layout, participants view

### Creating a Meeting

1. Navigate to `/agents` and create an AI agent
2. Go to `/meetings` and click "New Meeting"
3. Select your agent and create the meeting
4. Click "Join Meeting" to start the video call

---

## 🔐 Authentication

Built with **Better Auth** supporting:

- ✅ Email/Password authentication
- ⚙️ GitHub OAuth (configure in .env)
- ⚙️ Google OAuth (configure in .env)

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push database schema |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Stream](https://getstream.io) for the Video SDK
- [shadcn/ui](https://ui.shadcn.com) for the UI components
- [Better Auth](https://better-auth.com) for authentication
- [Drizzle ORM](https://orm.drizzle.team) for database management

---

Made with ❤️ by [berserk3142-max](https://github.com/berserk3142-max)