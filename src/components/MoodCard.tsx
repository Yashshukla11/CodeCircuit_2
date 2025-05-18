
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share, Download, X } from 'lucide-react';
import { toast } from 'sonner';
import { MoodType } from '@/context/MoodContext';
import { cn } from '@/lib/utils';

interface MoodCardProps {
  mood: MoodType;
  note?: string;
  date: string;
  onClose: () => void;
}

type CardStyle = 'calm' | 'retro' | 'glitch' | 'minimal';

export default function MoodCard({ mood, note, date, onClose }: MoodCardProps) {
  const [cardStyle, setCardStyle] = useState<CardStyle>('calm');
  const [showTags, setShowTags] = useState(true);
  const [showQuote, setShowQuote] = useState(true);

  const moodEmoji = {
    great: '😄',
    good: '🙂',
    okay: '😐',
    bad: '😔',
    terrible: '😢',
  };

  const moodCaptions: Record<MoodType, string[]> = {
    great: [
      "Floating on cloud nine today! ✨",
      "Can't stop the good vibes flowing!",
      "Today's energy is immaculate ✨",
    ],
    good: [
      "Good days deserve to be celebrated 💫",
      "Sunny disposition, bright outlook ☀️",
      "Feeling pretty good about things today!",
    ],
    okay: [
      "Just cruising through today 🌊",
      "Middle ground kind of day",
      "Neutral vibes, steady pace",
    ],
    bad: [
      "Not my best day, but still breathing ✨",
      "Sometimes it's okay to not be okay",
      "Tomorrow is another chance ❤️‍🩹",
    ],
    terrible: [
      "Even the darkest nights end with sunrise 🌅",
      "Honoring all my feelings today",
      "This too shall pass ✨",
    ],
  };

  const moodTags: Record<MoodType, string[]> = {
    great: ['#thriving', '#gratitude', '#blessed', '#glowup'],
    good: ['#goodvibes', '#contentment', '#grateful', '#positive'],
    okay: ['#balance', '#neutral', '#steadygoing', '#midweekvibes'],
    bad: ['#selfcare', '#recovery', '#itsokaynottobeokay', '#rest'],
    terrible: ['#mentalhealth', '#healing', '#support', '#breakthrough'],
  };

  const getRandomCaption = () => {
    const captions = moodCaptions[mood];
    return captions[Math.floor(Math.random() * captions.length)];
  };

  const getRandomTags = () => {
    const tags = moodTags[mood];
    // Get 2 random tags
    const shuffled = [...tags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const getCardGradient = () => {
    switch (cardStyle) {
      case 'calm':
        return getMoodGradient(mood);
      case 'retro':
        return getRetroGradient(mood);
      case 'glitch':
        return getGlitchGradient(mood);
      case 'minimal':
        return getMinimalGradient(mood);
      default:
        return getMoodGradient(mood);
    }
  };
  
  const getMoodGradient = (mood: MoodType) => {
    const gradientMap: Record<MoodType, string> = {
      great: 'bg-gradient-to-br from-violet-300 to-purple-600',
      good: 'bg-gradient-to-br from-blue-300 to-blue-500',
      okay: 'bg-gradient-to-br from-green-300 to-emerald-500',
      bad: 'bg-gradient-to-br from-amber-300 to-amber-500',
      terrible: 'bg-gradient-to-br from-red-300 to-red-500',
    };
    return gradientMap[mood];
  };

  const getRetroGradient = (mood: MoodType) => {
    const gradientMap: Record<MoodType, string> = {
      great: 'bg-gradient-to-br from-fuchsia-400 to-purple-600',
      good: 'bg-gradient-to-br from-cyan-400 to-blue-600',
      okay: 'bg-gradient-to-br from-lime-400 to-green-600',
      bad: 'bg-gradient-to-br from-yellow-400 to-orange-600',
      terrible: 'bg-gradient-to-br from-pink-400 to-red-600',
    };
    return gradientMap[mood];
  };

  const getGlitchGradient = (mood: MoodType) => {
    const gradientMap: Record<MoodType, string> = {
      great: 'bg-gradient-to-br from-purple-400 via-pink-500 to-purple-600',
      good: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600',
      okay: 'bg-gradient-to-br from-green-400 via-teal-500 to-green-600',
      bad: 'bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600',
      terrible: 'bg-gradient-to-br from-red-400 via-pink-500 to-red-600',
    };
    return gradientMap[mood];
  };

  const getMinimalGradient = (mood: MoodType) => {
    const gradientMap: Record<MoodType, string> = {
      great: 'bg-gradient-to-br from-white to-purple-100',
      good: 'bg-gradient-to-br from-white to-blue-100',
      okay: 'bg-gradient-to-br from-white to-green-100',
      bad: 'bg-gradient-to-br from-white to-amber-100',
      terrible: 'bg-gradient-to-br from-white to-red-100',
    };
    return gradientMap[mood];
  };

  const getCardClasses = () => {
    return cn(
      'w-[350px] h-[500px] mx-auto overflow-hidden relative p-0',
      getCardGradient(),
      {
        'font-serif': cardStyle === 'calm',
        'retro-pixels': cardStyle === 'retro',
        'glitch-effect': cardStyle === 'glitch',
        'font-mono': cardStyle === 'minimal',
      }
    );
  };

  const handleShare = () => {
    // In a real implementation, we would generate an actual image 
    // and use the Web Share API or fallback to other sharing methods
    toast.success('Sharing your mood card!', {
      description: 'This would share your mood card to social media in a real app.',
    });
  };

  const handleDownload = () => {
    toast.success('Downloading your mood card!', {
      description: 'This would download your mood card as an image in a real app.',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="relative">
        <Card className={getCardClasses()}>
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="absolute top-4 right-4 z-10">
              <Button 
                variant="ghost" 
                size="icon"
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col items-center space-y-6 mt-4">
              <div className="text-8xl animate-bounce-subtle">{moodEmoji[mood]}</div>
              <h2 className={cn(
                "text-xl font-semibold text-center text-white", 
                cardStyle === 'minimal' ? 'text-black' : ''
              )}>
                {getRandomCaption()}
              </h2>
              
              {note && showQuote && (
                <div className={cn(
                  "px-4 py-3 rounded-lg text-sm italic text-center max-w-[280px]",
                  cardStyle === 'minimal' ? 'bg-black/5 text-black' : 'bg-white/20 text-white'
                )}>
                  "{note}"
                </div>
              )}
            </div>

            <div className="space-y-4">
              {showTags && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {getRandomTags().map((tag) => (
                    <span 
                      key={tag} 
                      className={cn(
                        "px-3 py-1 rounded-full text-xs",
                        cardStyle === 'minimal' ? 'bg-black/10 text-black' : 'bg-white/20 text-white'
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-center">
                <p className={cn(
                  "text-sm",
                  cardStyle === 'minimal' ? 'text-black/60' : 'text-white/70'
                )}>
                  {date}
                </p>
              </div>

              <div className="flex justify-center gap-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={handleShare}
                  className={cn(
                    "rounded-full",
                    cardStyle === 'minimal' 
                      ? 'bg-black text-white hover:bg-black/80' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  )}
                >
                  <Share className="mr-1 h-3 w-3" /> Share
                </Button>
                <Button 
                  variant="secondary"
                  size="sm"
                  onClick={handleDownload}
                  className={cn(
                    "rounded-full",
                    cardStyle === 'minimal' 
                      ? 'bg-black text-white hover:bg-black/80' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  )}
                >
                  <Download className="mr-1 h-3 w-3" /> Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="absolute bottom-[-60px] left-0 right-0 flex justify-center gap-2">
          <Button 
            size="sm" 
            variant={cardStyle === 'calm' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setCardStyle('calm')}
          >
            Calm
          </Button>
          <Button 
            size="sm" 
            variant={cardStyle === 'retro' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setCardStyle('retro')}
          >
            Retro
          </Button>
          <Button 
            size="sm" 
            variant={cardStyle === 'glitch' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setCardStyle('glitch')}
          >
            Glitch
          </Button>
          <Button 
            size="sm" 
            variant={cardStyle === 'minimal' ? 'default' : 'outline'} 
            className="rounded-full"
            onClick={() => setCardStyle('minimal')}
          >
            Minimal
          </Button>
        </div>
      </div>
    </div>
  );
}
