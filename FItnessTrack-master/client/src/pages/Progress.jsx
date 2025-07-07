import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 22px;
  gap: 20px;
  overflow-y: auto;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
`;

const ChartCard = styled(Card)`
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.card_shadow};
  height: 100%;
`;

const COLORS = ["#2196f3", "#4caf50", "#ff9800", "#f44336"];

// Sample data
const caloriesData = [
  { date: "2024-03-01", calories: 300 },
  { date: "2024-03-03", calories: 250 },
  { date: "2024-03-05", calories: 350 },
  { date: "2024-03-07", calories: 200 },
  { date: "2024-03-09", calories: 300 }
];

const workoutTypeData = [
  { name: "Strength", value: 3 },
  { name: "Cardio", value: 2 }
];

// Separate component for the line chart
const CaloriesChart = () => (
  <Box sx={{ width: "100%", height: 300 }}>
    <ResponsiveContainer>
      <LineChart
        data={caloriesData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#666" />
        <XAxis
          dataKey="date"
          stroke="#666"
          tick={{ fill: "#666" }}
        />
        <YAxis stroke="#666" tick={{ fill: "#666" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="calories"
          stroke="#2196f3"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </Box>
);

// Separate component for the pie chart
const WorkoutTypeChart = () => (
  <Box sx={{ width: "100%", height: 300 }}>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={workoutTypeData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {workoutTypeData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </Box>
);

const Progress = () => {
  return (
    <Container>
      <Title>Progress</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calories Burned Over Time
              </Typography>
              <CaloriesChart />
            </CardContent>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Workout Types Distribution
              </Typography>
              <WorkoutTypeChart />
            </CardContent>
          </ChartCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Progress; 