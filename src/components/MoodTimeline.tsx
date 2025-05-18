
import { useState } from 'react';
import { useMood } from '@/context/MoodContext';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MoodCard from '@/components/MoodCard';

export default function MoodTimeline() {
  const { getAllMoods } = useMood();
  const moods = getAllMoods();
  const [showMoodCard, setShowMoodCard] = useState(false);
  const [selectedMood, setSelectedMood] = useState<{
    mood: any,
    note?: string,
    date: string
  } | null>(null);
  
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
  
  const handleShareClick = (entry: any) => {
    setSelectedMood({
      mood: entry.mood,
      note: entry.note,
      date: format(new Date(entry.date), 'MMMM d, yyyy')
    });
    setShowMoodCard(true);
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
                    
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={() => handleShareClick(entry)}
                      >
                        <Share className="h-3 w-3" /> 
                        Share Mood Card
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      {showMoodCard && selectedMood && (
        <MoodCard 
          mood={selectedMood.mood}
          note={selectedMood.note}
          date={selectedMood.date}
          onClose={() => setShowMoodCard(false)}
        />
      )}
    </div>
  );
}
