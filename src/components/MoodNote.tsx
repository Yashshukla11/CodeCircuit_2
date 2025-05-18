
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MoodType } from '@/context/MoodContext';
import { toast } from 'sonner';

interface MoodNoteProps {
  selectedMood: MoodType | null;
  onSave: (note: string) => void;
}

export default function MoodNote({ selectedMood, onSave }: MoodNoteProps) {
  const [note, setNote] = useState('');
  
  const handleSave = () => {
    if (!selectedMood) {
      toast.error('Please select a mood first');
      return;
    }
    
    onSave(note);
    setNote('');
  };
  
  const moodPrompts: Record<MoodType, string[]> = {
    great: [
      'What made today special?',
      'Share your win!',
      'What are you grateful for?',
    ],
    good: [
      'What went well today?',
      'What made you smile?',
      'Any small victories?',
    ],
    okay: [
      'Just a normal day?',
      'How could it have been better?',
      'Any bright spots?',
    ],
    bad: [
      'What's bringing you down?',
      'How can tomorrow be better?',
      'What would help right now?',
    ],
    terrible: [
      'Let it all out - what happened?',
      'What self-care do you need?',
      'Who could you reach out to?',
    ],
  };
  
  const getRandomPrompt = () => {
    if (!selectedMood) return 'How are you feeling today?';
    const prompts = moodPrompts[selectedMood];
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  return (
    <div className="mt-8 w-full max-w-md mx-auto">
      <Textarea
        placeholder={getRandomPrompt()}
        className="min-h-[100px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      
      <div className="flex justify-end mt-4">
        <Button 
          onClick={handleSave}
          disabled={!selectedMood}
          className="animate-fade-in"
        >
          Save Mood
        </Button>
      </div>
    </div>
  );
}
