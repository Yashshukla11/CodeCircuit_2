
import { useState } from 'react';
import { MoodType } from '@/context/MoodContext';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface MoodButtonProps {
  mood: MoodType;
  selected: boolean;
  onClick: () => void;
}

export default function MoodButton({ mood, selected, onClick }: MoodButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const moodConfig = {
    great: {
      emoji: '😄',
      label: 'Great',
      color: 'bg-mood-great',
      hoverColor: 'hover:bg-violet-600',
      gradient: 'mood-gradient-great',
    },
    good: {
      emoji: '🙂',
      label: 'Good',
      color: 'bg-mood-good',
      hoverColor: 'hover:bg-blue-500',
      gradient: 'mood-gradient-good',
    },
    okay: {
      emoji: '😐',
      label: 'Okay',
      color: 'bg-mood-okay',
      hoverColor: 'hover:bg-green-500',
      gradient: 'mood-gradient-okay',
    },
    bad: {
      emoji: '😔',
      label: 'Bad',
      color: 'bg-mood-bad',
      hoverColor: 'hover:bg-amber-500',
      gradient: 'mood-gradient-bad',
    },
    terrible: {
      emoji: '😢',
      label: 'Terrible',
      color: 'bg-mood-terrible',
      hoverColor: 'hover:bg-red-500',
      gradient: 'mood-gradient-terrible',
    },
  };
  
  const { emoji, label, gradient } = moodConfig[mood];
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            'emoji-btn relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center',
            'transition-all duration-300',
            selected ? gradient : 'bg-white dark:bg-gray-800',
            selected ? 'shadow-lg transform scale-105' : 'shadow hover:shadow-md',
            selected && 'animate-pulse-soft shadow-glow',
            isHovered && 'animate-bounce-subtle'
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={`Select ${label} mood`}
        >
          <span className="text-2xl sm:text-3xl">{emoji}</span>
          <span className={cn(
            'absolute -bottom-6 text-xs font-medium',
            selected ? 'text-primary font-semibold' : 'text-gray-500 dark:text-gray-400'
          )}>
            {label}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>I'm feeling {label.toLowerCase()}</p>
      </TooltipContent>
    </Tooltip>
  );
}
