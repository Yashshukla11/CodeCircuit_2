
import MoodTimeline from '@/components/MoodTimeline';

export default function TimelinePage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight neon-glow">Mood Timeline</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Your emotional journey, day by day
        </p>
      </div>
      
      <MoodTimeline />
    </div>
  );
}
