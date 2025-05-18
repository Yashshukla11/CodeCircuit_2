# 🌈 MoodMuse - Your Daily Mood Tracker

MoodMuse is an intuitive mood tracking application that helps you monitor and understand your emotional patterns through a beautiful, interactive interface. With emoji-based mood selection and a color-coded calendar visualization, tracking your daily emotions has never been more engaging.

## ✨ Features

- 🎯 Quick mood selection with expressive emoji buttons
- 📅 Color-coded calendar for visual mood tracking
- 📊 Mood statistics and insights
- 📝 Daily mood notes and reflections
- 📱 Responsive design for all devices
- 🌓 Dark/Light mode support
- 📈 Mood timeline visualization
- 💾 Local storage for your mood history

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom animations
- **UI Components:** Radix UI primitives
- **State Management:** React Query
- **Form Handling:** React Hook Form with Zod validation
- **Date Handling:** date-fns
- **Icons:** Lucide React
- **Development:** ESLint, TypeScript, SWC

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/moodmuse.git
   cd moodmuse
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MoodButton.tsx    # Emoji mood selection buttons
│   ├── MoodCalendar.tsx  # Color-coded calendar view
│   ├── MoodCard.tsx      # Mood entry cards
│   ├── MoodNote.tsx      # Daily mood notes
│   ├── MoodStats.tsx     # Mood statistics and insights
│   ├── MoodTimeline.tsx  # Mood history timeline
│   └── ui/              # Reusable UI components
├── pages/               # Page components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## 🎨 Key Components

### Mood Selection
- Intuitive emoji buttons for quick mood logging
- Customizable mood categories
- Instant feedback on selection

### Calendar View
- Color-coded mood visualization
- Monthly and weekly views
- Interactive date selection
- Mood pattern insights

### Mood Statistics
- Weekly and monthly mood trends
- Mood distribution charts
- Pattern recognition
- Personal insights

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for the CodeCircuit Hackathon
- Special thanks to the Outlier AI team for organizing this amazing event
- Inspired by the need for better emotional awareness and tracking

---

Made with ❤️ by Yash for CodeCircuit Hackathon
