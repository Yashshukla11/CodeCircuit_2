
import { useState } from 'react';
import MoodButton from '@/components/MoodButton';
import MoodNote from '@/components/MoodNote';
import { useMood, MoodType } from '@/context/MoodContext';
import { format } from 'date-fns';

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const { addMood, getMood } = useMood();
  
  const today = format(new Date(), 'yyyy-MM-dd');
  const todaysMood = getMood(today);
  
  const handleMoodSelection = (mood: MoodType) => {
    setSelectedMood(mood);
  };
  
  const handleSaveMood = (note: string) => {
    if (selectedMood) {
      addMood(today, selectedMood, note);
      setSelectedMood(null);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-2 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight neon-glow">
          How are you feeling today?
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {todaysMood 
            ? `You've already logged your mood as ${todaysMood.mood} today.` 
            : 'Select an emoji that represents your mood.'}
        </p>
      </div>
      
      <div className="glass-panel p-8">
        <div className="flex justify-center gap-2 sm:gap-6 mb-6">
          {(['great', 'good', 'okay', 'bad', 'terrible'] as MoodType[]).map((mood) => (
            <MoodButton
              key={mood}
              mood={mood}
              selected={selectedMood === mood}
              onClick={() => handleMoodSelection(mood)}
            />
          ))}
        </div>
        
        {(selectedMood || todaysMood) && (
          <MoodNote 
            selectedMood={selectedMood} 
            onSave={handleSaveMood} 
          />
        )}
      </div>
      
      {todaysMood && (
        <div className="glass-panel p-6 animate-scale-in">
          <h2 className="text-lg font-semibold mb-2">Today's Mood</h2>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mood-gradient-${todaysMood.mood}`}>
              {todaysMood.mood === 'great' && '😄'}
              {todaysMood.mood === 'good' && '🙂'}
              {todaysMood.mood === 'okay' && '😐'}
              {todaysMood.mood === 'bad' && '😔'}
              {todaysMood.mood === 'terrible' && '😢'}
            </div>
            <div>
              <p className="font-medium capitalize">{todaysMood.mood}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(todaysMood.createdAt), 'h:mm a')}
              </p>
            </div>
          </div>
          {todaysMood.note && (
            <div className="mt-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-md">
              {todaysMood.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
