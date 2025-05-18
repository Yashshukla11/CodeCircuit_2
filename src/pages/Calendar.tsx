
import MoodCalendar from '@/components/MoodCalendar';

export default function CalendarPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight neon-glow">Mood Calendar</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Visualize your mood patterns throughout the month
        </p>
      </div>
      
      <MoodCalendar />
      
      <div className="glass-panel p-6">
        <h2 className="text-xl font-semibold mb-4">Calendar Insights</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Use your calendar to identify patterns in your moods. Notice days of the week or specific events 
          that might trigger certain emotions. Each color represents a different mood, helping you 
          visualize your emotional journey at a glance.
        </p>
      </div>
    </div>
  );
}
