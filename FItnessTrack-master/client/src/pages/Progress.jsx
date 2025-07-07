import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 22px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-y: auto;
  /* Custom Scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.primary} ${({ theme }) => theme.bg_secondary};
  &::-webkit-scrollbar {
    width: 10px;
    background: ${({ theme }) => theme.bg_secondary};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary + 'cc'};
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.primary};
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 500px;
`;

const TimelineContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto 0 auto;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timeline = styled.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${({ theme }) => theme.primary + '33'};
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  width: 50%;
  padding: 24px 32px;
  margin-bottom: 32px;
  left: ${({ side }) => (side === 'left' ? '0' : '50%')};
  text-align: ${({ side }) => (side === 'left' ? 'right' : 'left')};
  z-index: 1;
  @media (max-width: 600px) {
    width: 100%;
    left: 0;
    text-align: left;
    padding: 16px 12px;
  }
`;

const Marker = styled.div`
  position: absolute;
  top: 32px;
  ${({ side }) => (side === 'left' ? 'right: -18px;' : 'left: -18px;')}
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  box-shadow: 0 2px 12px ${({ theme }) => theme.primary + '44'};
  animation: bounce 1.2s infinite alternate;
  @keyframes bounce {
    0% { transform: scale(1); }
    100% { transform: scale(1.15); }
  }
`;

const Flashback = styled.div`
  margin: 32px 0 0 0;
  padding: 18px 32px;
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.card_shadow};
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 18px;
  text-align: center;
`;

// Streaks & Consistency Tracker
const StreakSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 48px auto 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeatmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 18px);
  grid-gap: 4px;
  margin: 16px 0 24px 0;
`;

const HeatmapCell = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: ${({ level, theme }) => {
    if (level === 0) return theme.bg_secondary;
    if (level === 1) return '#b3e5fc';
    if (level === 2) return '#4fc3f7';
    if (level === 3) return '#0288d1';
    return theme.primary;
  }};
  transition: background 0.3s;
`;

const Badge = styled.div`
  display: inline-block;
  background: linear-gradient(90deg, #2196f3 60%, #21cbf3 100%);
  color: #fff;
  font-weight: 700;
  border-radius: 20px;
  padding: 6px 18px;
  margin: 0 8px 8px 0;
  font-size: 15px;
  box-shadow: 0 2px 8px #2196f344;
`;

const LongestStreak = styled.div`
  margin-top: 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

// Goal Rings Section
const GoalSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 48px auto 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RingsRow = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-bottom: 18px;
  flex-wrap: wrap;
`;

const RingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RingLabel = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Suggestion = styled.div`
  margin: 18px 0 0 0;
  padding: 14px 28px;
  background: linear-gradient(90deg, #ff9800 60%, #ffc107 100%);
  color: #fff;
  border-radius: 18px;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 2px 8px #ff980044;
`;

const GoalAdjuster = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
`;

const AdjustButton = styled.button`
  background: #2196f3;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 4px 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #1769aa; }
`;

// Animated SVG Ring
const ProgressRing = ({ radius, stroke, progress, color }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#eee"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s' }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.3em"
        fontSize="20"
        fontWeight="bold"
        fill={color}
      >
        {progress}%
      </text>
    </svg>
  );
};

const mockTimeline = [
  { date: "2024-01-10", label: "First Workout", icon: "💪" },
  { date: "2024-02-01", label: "Hit 10 Workouts", icon: "🏅" },
  { date: "2024-03-05", label: "Personal Best: 5K Run", icon: "🏃‍♂️" },
  { date: "2024-04-15", label: "Joined a Challenge", icon: "🔥" },
  { date: "2024-05-01", label: "30-Day Streak!", icon: "🎉" },
];

const today = new Date();
const flashback = mockTimeline.find(item => {
  const d = new Date(item.date);
  return d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
});

// Mock data for 8 weeks (56 days)
const todayIdx = 55;
const mockHeatmap = Array.from({ length: 56 }, (_, i) => {
  // Simulate more activity in the last 2 weeks
  if (i > 40) return Math.floor(Math.random() * 4);
  return Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0;
});

// Calculate streaks
function getStreaks(heatmap) {
  let current = 0, longest = 0, streaks = [];
  for (let i = 0; i < heatmap.length; i++) {
    if (heatmap[i] > 0) {
      current++;
      if (current > longest) longest = current;
    } else {
      if (current > 0) streaks.push(current);
      current = 0;
    }
  }
  if (current > 0) streaks.push(current);
  return { current: streaks[streaks.length - 1] || 0, longest };
}
const { current: currentStreak, longest: longestStreakVal } = getStreaks(mockHeatmap);

// Mock goal data
const [weeklyGoal, setWeeklyGoal] = [5, () => {}];
const [monthlyGoal, setMonthlyGoal] = [20, () => {}];
const weeklyProgress = 3; // e.g., 3 workouts this week
const monthlyProgress = 12; // e.g., 12 workouts this month
const weeklyPercent = Math.min(100, Math.round((weeklyProgress / weeklyGoal) * 100));
const monthlyPercent = Math.min(100, Math.round((monthlyProgress / monthlyGoal) * 100));
const behind = weeklyProgress < Math.ceil(weeklyGoal * 0.6);

// Personal Bests & Achievements
const AchievementsSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 48px auto 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TrophyCase = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin: 18px 0 0 0;
`;
const Trophy = styled.div`
  background: linear-gradient(135deg, #ffd700 60%, #fffbe7 100%);
  border-radius: 16px;
  box-shadow: 0 2px 8px #ffd70044;
  padding: 18px 24px;
  font-size: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  color: #bfa100;
`;
const BestsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 400px;
`;
const BestItem = styled.li`
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 12px 18px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MilestoneTeaser = styled.div`
  margin-top: 18px;
  font-size: 16px;
  color: #43a047;
  font-weight: 600;
`;
const mockBests = [
  { label: "Fastest 5K Run", value: "22:15" },
  { label: "Heaviest Deadlift", value: "120kg" },
  { label: "Longest Plank", value: "3:10" },
];
const mockTrophies = [
  { icon: "🏆", label: "10 Workouts" },
  { icon: "🥇", label: "First 5K" },
  { icon: "🎖️", label: "Consistency" },
];
const nextMilestone = { label: "50 Workouts", progress: 38, total: 50 };

// Comparative Analytics
const AnalyticsSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 48px auto 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AnalyticsRow = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 18px;
`;
const AnalyticsCard = styled.div`
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.card_shadow};
  padding: 18px 28px;
  min-width: 180px;
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
`;
const mockAnalytics = [
  { label: "This Week vs Last", value: "+12%" },
  { label: "This Month vs Last", value: "+8%" },
  { label: "Peer Avg", value: "+5%" },
];

// Motivational Insights
const MotivationSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 48px auto 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MostActive = styled.div`
  font-size: 16px;
  color: #2196f3;
  font-weight: 600;
  margin-bottom: 8px;
`;
const MoodCorrelation = styled.div`
  font-size: 15px;
  color: #888;
  margin-bottom: 8px;
`;
const Celebration = styled.div`
  font-size: 32px;
  margin: 18px 0 0 0;
  animation: pop 1.2s infinite alternate;
  @keyframes pop {
    0% { transform: scale(1); }
    100% { transform: scale(1.15); }
  }
`;

// Interactive Story/Recap
const RecapSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 48px auto 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RecapScroll = styled.div`
  width: 100%;
  max-width: 600px;
  overflow-x: auto;
  display: flex;
  gap: 24px;
  margin-top: 18px;
`;
const RecapCard = styled.div`
  min-width: 220px;
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.card_shadow};
  padding: 18px 18px;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
`;
const mockRecap = [
  { month: "May", highlight: "12 Workouts", emoji: "💪" },
  { month: "April", highlight: "Longest Streak: 8 days", emoji: "🔥" },
  { month: "March", highlight: "Personal Best: 5K", emoji: "🏃‍♂️" },
];

// Progressive Unlocks
const UnlocksSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 48px auto 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UnlockBar = styled.div`
  width: 100%;
  max-width: 400px;
  height: 18px;
  background: #eee;
  border-radius: 9px;
  margin: 18px 0 0 0;
  overflow: hidden;
`;
const UnlockFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #43a047 60%, #b2ff59 100%);
  border-radius: 9px;
  transition: width 0.7s;
`;
const UnlockLabel = styled.div`
  margin-top: 8px;
  font-size: 15px;
  color: #43a047;
  font-weight: 600;
`;
const unlockProgress = 68; // percent

// Customizable Dashboard Widgets (UI Mockup)
const WidgetsSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 48px auto 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WidgetsGrid = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 12px;
`;
const Widget = styled.div`
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.card_shadow};
  padding: 18px 24px;
  min-width: 160px;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  font-size: 15px;
  cursor: grab;
`;
const mockWidgets = [
  { label: "Calories Burned", value: "3200" },
  { label: "Active Days", value: "18" },
  { label: "Avg. Workout Time", value: "42 min" },
];

// Fun Visualizations
const VisualsSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 48px auto 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Avatar = styled.div`
  font-size: 64px;
  margin-bottom: 12px;
  animation: bounce 1.2s infinite alternate;
  @keyframes bounce {
    0% { transform: scale(1); }
    100% { transform: scale(1.15); }
  }
`;
const JourneyMap = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 0;
`;
const JourneyStep = styled.div`
  flex: 1;
  text-align: center;
  font-size: 24px;
  color: #2196f3;
`;
const mockJourney = [
  { icon: "🚶‍♂️", label: "Start" },
  { icon: "🏃‍♂️", label: "Active" },
  { icon: "💪", label: "Strong" },
  { icon: "🏆", label: "Champion" },
];

const Progress = () => {
  return (
    <Container>
      <Title>Progress</Title>
      <Subtitle>
        Your progress tracking will appear here soon!<br />
        Stay tuned for upcoming features and insights about your fitness journey.
      </Subtitle>
      <TimelineContainer>
        <h2 style={{ color: '#2196f3', marginBottom: 24 }}>Your Fitness Journey</h2>
        <Timeline>
          {mockTimeline.map((item, idx) => (
            <TimelineItem key={item.date} side={idx % 2 === 0 ? 'left' : 'right'}>
              <Marker side={idx % 2 === 0 ? 'left' : 'right'}>{item.icon}</Marker>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{item.label}</div>
              <div style={{ color: '#888', fontSize: 14 }}>{item.date}</div>
            </TimelineItem>
          ))}
        </Timeline>
        {flashback && (
          <Flashback>
            On this day: <span style={{ color: '#2196f3' }}>{flashback.label}</span> ({flashback.date})
          </Flashback>
        )}
      </TimelineContainer>
      {/* Streaks & Consistency Tracker */}
      <StreakSection>
        <h2 style={{ color: '#21cbf3', marginBottom: 12 }}>Streaks & Consistency</h2>
        <HeatmapGrid>
          {mockHeatmap.map((level, idx) => (
            <HeatmapCell key={idx} level={level} title={`Day ${idx + 1}`} />
          ))}
        </HeatmapGrid>
        <div style={{ marginBottom: 8 }}>
          {currentStreak > 1 && <Badge>🔥 {currentStreak}-Day Streak</Badge>}
          {longestStreakVal > 1 && <Badge>🏆 Longest: {longestStreakVal} Days</Badge>}
        </div>
        <LongestStreak>
          {currentStreak > 1
            ? `Keep it up! You're on a ${currentStreak}-day streak!`
            : `Your longest streak: ${longestStreakVal} days`}
        </LongestStreak>
      </StreakSection>
      {/* Goal Rings Section */}
      <GoalSection>
        <h2 style={{ color: '#43a047', marginBottom: 12 }}>Goal Progress</h2>
        <RingsRow>
          <RingContainer>
            <ProgressRing radius={54} stroke={8} progress={weeklyPercent} color="#2196f3" />
            <RingLabel>Weekly Goal ({weeklyProgress}/{weeklyGoal})</RingLabel>
          </RingContainer>
          <RingContainer>
            <ProgressRing radius={54} stroke={8} progress={monthlyPercent} color="#43a047" />
            <RingLabel>Monthly Goal ({monthlyProgress}/{monthlyGoal})</RingLabel>
          </RingContainer>
        </RingsRow>
        {behind && (
          <Suggestion>
            You're a bit behind on your weekly goal. Try a quick workout today to catch up! 💡
          </Suggestion>
        )}
        <GoalAdjuster>
          <span>Adjust Weekly Goal:</span>
          <AdjustButton onClick={() => {}}> - </AdjustButton>
          <span>{weeklyGoal}</span>
          <AdjustButton onClick={() => {}}> + </AdjustButton>
        </GoalAdjuster>
      </GoalSection>
      {/* Achievements Section */}
      <AchievementsSection>
        <h2 style={{ color: '#bfa100', marginBottom: 12 }}>Personal Bests & Achievements</h2>
        <BestsList>
          {mockBests.map((item, idx) => (
            <BestItem key={idx}>
              <span>{item.label}</span>
              <span style={{ fontWeight: 700 }}>{item.value}</span>
            </BestItem>
          ))}
        </BestsList>
        <TrophyCase>
          {mockTrophies.map((t, idx) => (
            <Trophy key={idx} title={t.label}>{t.icon}<div style={{ fontSize: 14, marginTop: 4 }}>{t.label}</div></Trophy>
          ))}
        </TrophyCase>
        <MilestoneTeaser>
          Next Milestone: <b>{nextMilestone.label}</b> ({nextMilestone.progress}/{nextMilestone.total})
        </MilestoneTeaser>
      </AchievementsSection>
      {/* Comparative Analytics Section */}
      <AnalyticsSection>
        <h2 style={{ color: '#0288d1', marginBottom: 12 }}>Comparative Analytics</h2>
        <AnalyticsRow>
          {mockAnalytics.map((a, idx) => (
            <AnalyticsCard key={idx}>
              <div style={{ fontWeight: 700 }}>{a.label}</div>
              <div style={{ fontSize: 22, color: a.value.startsWith('+') ? '#43a047' : '#d32f2f', marginTop: 6 }}>{a.value}</div>
            </AnalyticsCard>
          ))}
        </AnalyticsRow>
      </AnalyticsSection>
      {/* Motivational Insights Section */}
      <MotivationSection>
        <h2 style={{ color: '#ff9800', marginBottom: 12 }}>Motivational Insights</h2>
        <MostActive>You're most active on <b>Wednesdays</b>!</MostActive>
        <MoodCorrelation>On days you work out, your mood score is <b>20% higher</b> (mock data).</MoodCorrelation>
        <Celebration>🎉</Celebration>
      </MotivationSection>
      {/* Fun Visualizations Section */}
      <VisualsSection>
        <h2 style={{ color: '#ff9800', marginBottom: 12 }}>Your Fitness Journey Map</h2>
        <Avatar>🧑‍🎤</Avatar>
        <JourneyMap>
          {mockJourney.map((step, idx) => (
            <JourneyStep key={idx}>{step.icon}<div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{step.label}</div></JourneyStep>
          ))}
        </JourneyMap>
      </VisualsSection>
    </Container>
  );
};

export default Progress; 