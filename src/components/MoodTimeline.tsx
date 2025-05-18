
import { useMood } from '@/context/MoodContext';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function MoodTimeline() {
  const { getAllMoods } = useMood();
  const moods = getAllMoods();
  
  const moodEmoji = {
    great: '😄',
    good: '🙂',
    okay: '😐',
    bad: '😔',
    terrible: '😢',
  };
  
  const getGradientClass = (mood: string) => {
    const gradientMap: Record<string, string> = {
      great: 'mood-gradient-great',
      good: 'mood-gradient-good',
      okay: 'mood-gradient-okay',
      bad: 'mood-gradient-bad',
      terrible: 'mood-gradient-terrible',
    };
    return gradientMap[mood];
  };
  
  if (moods.length === 0) {
    return (
      <div className="glass-panel p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">No Moods Yet</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Start logging your moods to see them in your timeline!
        </p>
        <div className="flex justify-center space-x-2">
          {['great', 'good', 'okay', 'bad', 'terrible'].map((mood) => (
            <div key={mood} className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              getGradientClass(mood)
            )}>
              {moodEmoji[mood as keyof typeof moodEmoji]}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  const groupedByMonth: Record<string, typeof moods> = {};
  
  moods.forEach((mood) => {
    const date = new Date(mood.date);
    const monthYear = format(date, 'MMMM yyyy');
    
    if (!groupedByMonth[monthYear]) {
      groupedByMonth[monthYear] = [];
    }
    
    groupedByMonth[monthYear].push(mood);
  });

  return (
    <div className="space-y-8">
      {Object.entries(groupedByMonth).map(([monthYear, entries]) => (
        <div key={monthYear} className="glass-panel p-6">
          <h3 className="text-xl font-semibold mb-4">{monthYear}</h3>
          
          <div className="space-y-4">
            {entries.map((entry, index) => {
              const date = new Date(entry.date);
              
              return (
                <div 
                  key={entry.date} 
                  className={cn(
                    "flex gap-4 p-3 rounded-lg animate-fade-in",
                    "bg-white/50 dark:bg-gray-800/50",
                    "hover:shadow-md transition-shadow"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                    getGradientClass(entry.mood),
                    "text-xl shadow-md animate-pop",
                  )}>
                    {moodEmoji[entry.mood]}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium capitalize">
                        {entry.mood}
                      </h4>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {format(date, 'EEEE, MMMM d')}
                      </time>
                    </div>
                    
                    {entry.note && (
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {entry.note}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
