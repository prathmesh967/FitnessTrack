import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Add as AddIcon,
  FitnessCenter,
  Delete,
  CheckCircle,
} from "@mui/icons-material";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  LinearProgress,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 22px;
  gap: 20px;
  overflow-y: scroll;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
`;

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const GoalCard = styled(Card)`
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const GoalActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ProgressSection = styled.div`
  margin-top: 20px;
`;

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [openGoalDialog, setOpenGoalDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    type: "workout",
    target: "",
    current: "0",
    unit: "kg",
    deadline: ""
  });

  useEffect(() => {
    // Load saved goals from localStorage
    const savedGoals = localStorage.getItem("goals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const handleGoalAdd = () => {
    if (newGoal.title && newGoal.target) {
      const goal = {
        id: Date.now(),
        ...newGoal,
        target: parseFloat(newGoal.target),
        current: parseFloat(newGoal.current),
        completed: false
      };

      const updatedGoals = [...goals, goal];
      setGoals(updatedGoals);
      localStorage.setItem("goals", JSON.stringify(updatedGoals));

      setNewGoal({
        title: "",
        type: "workout",
        target: "",
        current: "0",
        unit: "kg",
        deadline: ""
      });
      setOpenGoalDialog(false);
    }
  };

  const handleGoalDelete = (goalId) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const handleGoalUpdate = (goalId, newCurrent) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const newProgress = parseFloat(newCurrent) || 0;
        return {
          ...goal,
          current: newProgress,
          completed: newProgress >= goal.target
        };
      }
      return goal;
    });
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const getProgressColor = (current, target) => {
    const progress = (current / target) * 100;
    if (progress >= 100) return "#4caf50";
    if (progress >= 70) return "#2196f3";
    if (progress >= 40) return "#ff9800";
    return "#f44336";
  };

  const getProgressStyle = (current, target) => {
    const color = getProgressColor(current, target);
    return {
      height: 8,
      borderRadius: 4,
      backgroundColor: "#e0e0e0",
      "& .MuiLinearProgress-bar": {
        backgroundColor: color
      }
    };
  };

  return (
    <Container>
      <Title>Goals Tracker</Title>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">
          <FitnessCenter style={{ marginRight: 8 }} />
          My Goals
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenGoalDialog(true)}
        >
          Add Goal
        </Button>
      </div>

      <GoalsGrid>
        {goals.map((goal) => (
          <GoalCard key={goal.id}>
            <CardContent>
              <GoalHeader>
                <Typography variant="h6">{goal.title}</Typography>
                <GoalActions>
                  <IconButton size="small" onClick={() => handleGoalDelete(goal.id)}>
                    <Delete />
                  </IconButton>
                </GoalActions>
              </GoalHeader>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {goal.type === "workout" ? "Workout Goal" : "Weight Goal"}
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Progress
                  </Typography>
                  <Typography variant="h6">
                    {goal.current} / {goal.target} {goal.unit}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Deadline
                  </Typography>
                  <Typography variant="body1">
                    {goal.deadline || "No deadline"}
                  </Typography>
                </Grid>
              </Grid>
              <ProgressSection>
                <LinearProgress
                  variant="determinate"
                  value={(goal.current / goal.target) * 100}
                  style={getProgressStyle(goal.current, goal.target)}
                />
              </ProgressSection>
              <div style={{ marginTop: 16 }}>
                <TextField
                  label="Update Progress"
                  type="number"
                  size="small"
                  fullWidth
                  value={goal.current}
                  onChange={(e) => handleGoalUpdate(goal.id, e.target.value)}
                  InputProps={{
                    endAdornment: <Typography variant="body2">{goal.unit}</Typography>
                  }}
                />
              </div>
              {goal.completed && (
                <Chip
                  icon={<CheckCircle />}
                  label="Completed"
                  color="success"
                  size="small"
                  style={{ marginTop: 8 }}
                />
              )}
            </CardContent>
          </GoalCard>
        ))}
      </GoalsGrid>

      <Dialog open={openGoalDialog} onClose={() => setOpenGoalDialog(false)}>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Goal Title"
            fullWidth
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Goal Type</InputLabel>
            <Select
              value={newGoal.type}
              onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
            >
              <MenuItem value="workout">Workout Goal</MenuItem>
              <MenuItem value="weight">Weight Goal</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Target"
            type="number"
            fullWidth
            value={newGoal.target}
            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Unit</InputLabel>
            <Select
              value={newGoal.unit}
              onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
            >
              <MenuItem value="kg">Kilograms (kg)</MenuItem>
              <MenuItem value="lbs">Pounds (lbs)</MenuItem>
              <MenuItem value="reps">Repetitions</MenuItem>
              <MenuItem value="sets">Sets</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Deadline"
            type="date"
            fullWidth
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGoalDialog(false)}>Cancel</Button>
          <Button onClick={handleGoalAdd} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Goals; 