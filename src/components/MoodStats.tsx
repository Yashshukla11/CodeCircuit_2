
import { useMood, MoodType } from '@/context/MoodContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns';

export default function MoodStats() {
  const { getAllMoods } = useMood();
  const moods = getAllMoods();
  
  // Count moods by type
  const moodCounts: Record<MoodType, number> = {
    great: 0,
    good: 0,
    okay: 0,
    bad: 0,
    terrible: 0,
  };
  
  moods.forEach((entry) => {
    moodCounts[entry.mood]++;
  });
  
  const pieData = Object.entries(moodCounts)
    .map(([mood, count]) => ({
      name: mood,
      value: count,
    }))
    .filter((item) => item.value > 0);
  
  const COLORS = {
    great: '#8B5CF6',
    good: '#3B82F6',
    okay: '#10B981',
    bad: '#F59E0B',
    terrible: '#EF4444',
  };
  
  // Calculate current month's mood data
  const currentMonth = new Date();
  const firstDay = startOfMonth(currentMonth);
  const lastDay = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
  
  const monthData = daysInMonth.map((day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const moodEntry = moods.find((m) => isSameDay(new Date(m.date), day));
    
    return {
      date: format(day, 'dd'),
      mood: moodEntry ? moodEntry.mood : null,
      value: moodEntry ? 
        moodEntry.mood === 'great' ? 5 :
        moodEntry.mood === 'good' ? 4 :
        moodEntry.mood === 'okay' ? 3 :
        moodEntry.mood === 'bad' ? 2 : 1
        : 0
    };
  });
  
  // Calculate streak
  const calculateStreak = () => {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 100; i++) { // Check up to 100 days back
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - i);
      const dateStr = format(checkDate, 'yyyy-MM-dd');
      
      const hasMood = moods.some((m) => m.date === dateStr);
      
      if (hasMood) {
        streak++;
      } else if (i > 0) { // If today doesn't have mood, that's okay
        break;
      }
    }
    
    return streak;
  };
  
  const streak = calculateStreak();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold mb-2">Mood Distribution</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1000}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[entry.name as MoodType]} 
                      className="animate-pulse-soft"
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} days`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold mb-2">This Month's Moods</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthData.filter(d => d.value > 0)}>
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} hide />
                <Tooltip 
                  formatter={(value, name) => {
                    const moodMap: Record<number, string> = {
                      1: 'Terrible',
                      2: 'Bad',
                      3: 'Okay',
                      4: 'Good',
                      5: 'Great'
                    };
                    return [moodMap[value as number]];
                  }}
                />
                <Bar 
                  dataKey="value" 
                  name="Mood" 
                  animationDuration={1000}
                >
                  {monthData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.mood ? COLORS[entry.mood as MoodType] : '#ccc'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-4">Current Streak</h3>
          <div className={`text-5xl font-bold mb-2 ${streak > 3 ? 'text-primary animate-pulse-soft' : ''}`}>
            {streak}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {streak === 0 ? "Start your streak today!" : 
             streak === 1 ? "First day - keep going!" :
             `${streak} days in a row!`}
          </p>
        </div>
      </div>
      
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold mb-4">Mood Insights</h3>
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <p>
            {moods.length === 0
              ? "Start tracking your moods to get personalized insights!"
              : moods.length < 5
              ? "Keep logging your moods daily to unlock more insights!"
              : moodCounts.great + moodCounts.good > moodCounts.bad + moodCounts.terrible
              ? "You've been feeling mostly positive lately. That's great!"
              : "You've had some tough days recently. Remember to practice self-care."}
          </p>
          
          {moods.length > 7 && (
            <p className="pt-2">
              {streak > 3
                ? `Amazing job! You've maintained a ${streak}-day tracking streak!`
                : "Try to log your mood daily to build a consistent tracking habit."}
            </p>
          )}
          
          {Object.values(moodCounts).reduce((a, b) => a + b, 0) > 0 && (
            <div className="pt-2 text-xs text-gray-500">
              Based on {Object.values(moodCounts).reduce((a, b) => a + b, 0)} logged moods
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
