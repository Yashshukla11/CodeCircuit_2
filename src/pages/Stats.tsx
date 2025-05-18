
import MoodStats from '@/components/MoodStats';

export default function StatsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight neon-glow">Mood Stats</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Track your emotional trends and patterns
        </p>
      </div>
      
      <MoodStats />
    </div>
  );
}
