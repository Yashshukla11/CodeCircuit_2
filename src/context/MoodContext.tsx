
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type MoodType = 'great' | 'good' | 'okay' | 'bad' | 'terrible';

export interface MoodEntry {
  date: string; // ISO date string
  mood: MoodType;
  note?: string;
  createdAt: number; // timestamp
}

interface MoodContextType {
  moods: Record<string, MoodEntry>;
  addMood: (date: string, mood: MoodType, note?: string) => void;
  getMood: (date: string) => MoodEntry | undefined;
  getAllMoods: () => MoodEntry[];
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [moods, setMoods] = useState<Record<string, MoodEntry>>({});

  // Load moods from local storage
  useEffect(() => {
    const savedMoods = localStorage.getItem('moodmuse-moods');
    if (savedMoods) {
      try {
        setMoods(JSON.parse(savedMoods));
      } catch (error) {
        console.error('Failed to parse saved moods', error);
        toast.error('Failed to load saved moods');
      }
    }
  }, []);

  // Save moods to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('moodmuse-moods', JSON.stringify(moods));
  }, [moods]);

  const addMood = (date: string, mood: MoodType, note?: string) => {
    setMoods(prev => ({
      ...prev,
      [date]: {
        date,
        mood,
        note: note || '',
        createdAt: Date.now(),
      }
    }));
    
    toast.success('Mood saved!', {
      description: `Your ${mood} mood has been recorded.`,
    });
  };

  const getMood = (date: string): MoodEntry | undefined => {
    return moods[date];
  };

  const getAllMoods = (): MoodEntry[] => {
    return Object.values(moods).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  return (
    <MoodContext.Provider value={{ moods, addMood, getMood, getAllMoods }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};
