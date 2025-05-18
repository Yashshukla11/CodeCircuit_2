
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, getDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMood, MoodType } from '@/context/MoodContext';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import MoodCard from '@/components/MoodCard';

export default function MoodCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { getMood } = useMood();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showMoodCard, setShowMoodCard] = useState(false);
  const [selectedMoodCard, setSelectedMoodCard] = useState<{
    mood: MoodType;
    note?: string;
    date: string;
  } | null>(null);
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = getDay(monthStart);
  
  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  
  const getMoodColor = (mood: MoodType) => {
    const colorMap: Record<MoodType, string> = {
      great: 'bg-mood-great',
      good: 'bg-mood-good',
      okay: 'bg-mood-okay',
      bad: 'bg-mood-bad',
      terrible: 'bg-mood-terrible',
    };
    return colorMap[mood];
  };
  
  const getMoodGradient = (mood: MoodType) => {
    const gradientMap: Record<MoodType, string> = {
      great: 'mood-gradient-great',
      good: 'mood-gradient-good',
      okay: 'mood-gradient-okay',
      bad: 'mood-gradient-bad',
      terrible: 'mood-gradient-terrible',
    };
    return gradientMap[mood];
  };
  
  const handleShareMood = (mood: MoodType, note?: string, date?: string) => {
    setSelectedMoodCard({
      mood,
      note,
      date: date || format(new Date(), 'MMMM d, yyyy')
    });
    setShowMoodCard(true);
  };

  return (
    <>
      <div className="glass-panel p-6 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          
          <h2 className="text-lg font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 mt-1">
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day opacity-0"></div>
          ))}
          
          {days.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const moodEntry = getMood(dateKey);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            
            return (
              <Popover key={dateKey}>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      'calendar-day relative',
                      !isCurrentMonth && 'text-gray-300 dark:text-gray-700',
                      isToday && 'border border-primary',
                      isSelected && 'ring-2 ring-primary',
                      moodEntry && 'font-semibold',
                      !moodEntry && 'hover:bg-gray-100 dark:hover:bg-gray-800',
                      moodEntry && getMoodGradient(moodEntry.mood),
                      moodEntry && 'text-white animate-fade-in'
                    )}
                    onClick={() => setSelectedDate(day)}
                  >
                    {format(day, 'd')}
                  </button>
                </PopoverTrigger>
                
                {moodEntry && (
                  <PopoverContent className="w-72 p-3 animate-scale-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{format(day, 'MMMM d, yyyy')}</span>
                      </div>
                      <div className={cn(
                        'px-2 py-1 rounded-full text-xs font-semibold text-white',
                        getMoodGradient(moodEntry.mood)
                      )}>
                        {moodEntry.mood}
                      </div>
                    </div>
                    
                    {moodEntry.note && (
                      <div className="mt-2 text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                        {moodEntry.note}
                      </div>
                    )}
                    
                    <div className="mt-3 flex justify-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center gap-1 text-xs"
                        onClick={() => handleShareMood(
                          moodEntry.mood, 
                          moodEntry.note, 
                          format(day, 'MMMM d, yyyy')
                        )}
                      >
                        <Share className="h-3 w-3" />
                        Share Mood Card
                      </Button>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            );
          })}
        </div>
        
        <div className="mt-6 flex justify-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-mood-great"></div>
            <span className="text-xs">Great</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-mood-good"></div>
            <span className="text-xs">Good</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-mood-okay"></div>
            <span className="text-xs">Okay</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-mood-bad"></div>
            <span className="text-xs">Bad</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-mood-terrible"></div>
            <span className="text-xs">Terrible</span>
          </div>
        </div>
      </div>

      {showMoodCard && selectedMoodCard && (
        <MoodCard 
          mood={selectedMoodCard.mood}
          note={selectedMoodCard.note}
          date={selectedMoodCard.date}
          onClose={() => setShowMoodCard(false)}
        />
      )}
    </>
  );
}
