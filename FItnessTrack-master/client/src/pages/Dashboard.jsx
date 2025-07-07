import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 8px;
  @media (max-width: 600px) {
    gap: 8px;
    padding: 0 2px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

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

const UnlocksSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 24px auto 0 auto;
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

const Dashboard = () => {
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`#Legs\n-Back Squat\n-5 setsX15 reps\n-30 kg\n-10 min`);

  const dashboardData = async () => {
    const token = localStorage.getItem("fittrack-app-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };
  const getTodaysWorkout = async () => {
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, "").then((res) => {
      setTodaysWorkouts(res?.data);
      console.log(res.data);
    });
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await addWorkout(token, { workoutString: workout })
      .then((res) => {
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);
  return (
    <Container>
      <Wrapper>
        <RecapSection>
          <h2 style={{ color: '#2196f3', marginBottom: 12 }}>Your Fitness Story</h2>
          <RecapScroll>
            {mockRecap.map((r, idx) => (
              <RecapCard key={idx}>
                <div style={{ fontSize: 32 }}>{r.emoji}</div>
                <div style={{ fontWeight: 700, margin: '8px 0' }}>{r.month}</div>
                <div>{r.highlight}</div>
              </RecapCard>
            ))}
          </RecapScroll>
        </RecapSection>
        <WidgetsSection>
          <h2 style={{ color: '#2196f3', marginBottom: 12 }}>Your Dashboard Widgets</h2>
          <WidgetsGrid>
            {mockWidgets.map((w, idx) => (
              <Widget key={idx} draggable>{w.label}<div style={{ fontWeight: 700, fontSize: 18, marginTop: 6 }}>{w.value}</div></Widget>
            ))}
          </WidgetsGrid>
          <div style={{ color: '#888', fontSize: 13, marginTop: 8 }}>(Drag to rearrange - UI only)</div>
        </WidgetsSection>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard item={item} data={data} />
          ))}
        </FlexWrap>
        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>
        <Section>
          <Title>Todays Workouts</Title>
          <CardWrapper>
            {todaysWorkouts.map((workout) => (
              <WorkoutCard workout={workout} />
            ))}
          </CardWrapper>
        </Section>
        <UnlocksSection>
          <h2 style={{ color: '#43a047', marginBottom: 12 }}>Unlocks</h2>
          <UnlockBar>
            <UnlockFill style={{ width: unlockProgress + '%' }} />
          </UnlockBar>
          <UnlockLabel>{unlockProgress}% to next unlock (New Workout Plan!)</UnlockLabel>
        </UnlocksSection>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
