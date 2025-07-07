import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  IconButton,
} from "@mui/material";
import {
  FitnessCenter,
  Timer,
  TrendingUp,
  PlayArrow,
  Close,
  DirectionsRun,
  SelfImprovement,
  Pause,
  SkipNext,
  CheckCircle,
} from "@mui/icons-material";

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

const WorkoutCard = styled(Card)`
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.card_shadow};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    transform: translateY(-5px);
  }
`;

const CategoryChip = styled(Chip)`
  margin: 4px;
`;

const WorkoutTimer = styled.div`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  color: ${({ theme }) => theme.primary};
`;

const ExerciseCard = styled(Card)`
  margin: 10px 0;
  background: ${({ theme }) => theme.bg_secondary};
  border-left: 4px solid ${({ active, theme }) => active ? theme.primary : 'transparent'};
`;

const TimerControls = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

const workoutPlans = [
  {
    id: 1,
    title: "Full Body Strength",
    duration: "45 min",
    difficulty: "Intermediate",
    calories: 350,
    category: "Strength",
    description: "A comprehensive full-body workout targeting all major muscle groups.",
    exercises: [
      { name: "Push-ups", sets: 3, reps: "12-15", rest: "60", exerciseTime: "45" },
      { name: "Squats", sets: 3, reps: "15-20", rest: "60", exerciseTime: "45" },
      { name: "Dumbbell Rows", sets: 3, reps: "12-15", rest: "60", exerciseTime: "45" },
      { name: "Lunges", sets: 3, reps: "12 each leg", rest: "60", exerciseTime: "45" },
      { name: "Plank", sets: 3, reps: "30-45s", rest: "45", exerciseTime: "45" },
    ],
    icon: <FitnessCenter />,
  },
  {
    id: 2,
    title: "HIIT Cardio Blast",
    duration: "30 min",
    difficulty: "Advanced",
    calories: 400,
    category: "Cardio",
    description: "High-intensity interval training to boost metabolism and burn calories.",
    exercises: [
      { name: "Jumping Jacks", sets: 4, reps: "45s", rest: "15", exerciseTime: "45" },
      { name: "Mountain Climbers", sets: 4, reps: "45s", rest: "15", exerciseTime: "45" },
      { name: "Burpees", sets: 4, reps: "30s", rest: "15", exerciseTime: "30" },
      { name: "High Knees", sets: 4, reps: "45s", rest: "15", exerciseTime: "45" },
      { name: "Butt Kicks", sets: 4, reps: "45s", rest: "15", exerciseTime: "45" },
    ],
    icon: <DirectionsRun />,
  },
  {
    id: 3,
    title: "Core Crusher",
    duration: "25 min",
    difficulty: "Intermediate",
    calories: 200,
    category: "Core",
    description: "Target your abs and core muscles with this intense workout.",
    exercises: [
      { name: "Crunches", sets: 3, reps: "20", rest: "30s" },
      { name: "Russian Twists", sets: 3, reps: "20 each side", rest: "30s" },
      { name: "Leg Raises", sets: 3, reps: "15", rest: "30s" },
      { name: "Plank Variations", sets: 3, reps: "45s each", rest: "30s" },
      { name: "Bicycle Crunches", sets: 3, reps: "20 each side", rest: "30s" },
    ],
    icon: <SelfImprovement />,
  },
  {
    id: 4,
    title: "Upper Body Power",
    duration: "40 min",
    difficulty: "Intermediate",
    calories: 300,
    category: "Strength",
    description: "Focus on building upper body strength and muscle.",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s" },
      { name: "Pull-ups", sets: 3, reps: "8-10", rest: "90s" },
      { name: "Shoulder Press", sets: 3, reps: "10-12", rest: "60s" },
      { name: "Bicep Curls", sets: 3, reps: "12-15", rest: "60s" },
      { name: "Tricep Dips", sets: 3, reps: "12-15", rest: "60s" },
    ],
    icon: <FitnessCenter />,
  },
  {
    id: 5,
    title: "Lower Body Strength",
    duration: "35 min",
    difficulty: "Intermediate",
    calories: 280,
    category: "Strength",
    description: "Build strong legs and glutes with this targeted workout.",
    exercises: [
      { name: "Squats", sets: 4, reps: "12-15", rest: "90s" },
      { name: "Deadlifts", sets: 4, reps: "8-10", rest: "90s" },
      { name: "Lunges", sets: 3, reps: "12 each leg", rest: "60s" },
      { name: "Calf Raises", sets: 3, reps: "15-20", rest: "45s" },
      { name: "Glute Bridges", sets: 3, reps: "15", rest: "45s" },
    ],
    icon: <DirectionsRun />,
  },
  {
    id: 6,
    title: "Yoga Flow",
    duration: "45 min",
    difficulty: "Beginner",
    calories: 180,
    category: "Flexibility",
    description: "Improve flexibility and reduce stress with this calming yoga session.",
    exercises: [
      { name: "Sun Salutations", sets: 3, reps: "5 rounds", rest: "30s" },
      { name: "Warrior Poses", sets: 2, reps: "30s each side", rest: "15s" },
      { name: "Tree Pose", sets: 2, reps: "30s each side", rest: "15s" },
      { name: "Child's Pose", sets: 2, reps: "1 min", rest: "15s" },
      { name: "Savasana", sets: 1, reps: "5 min", rest: "0s" },
    ],
    icon: <SelfImprovement />,
  },
];

const categories = [
  { name: "All", icon: <FitnessCenter /> },
  { name: "Strength", icon: <FitnessCenter /> },
  { name: "Cardio", icon: <DirectionsRun /> },
  { name: "Core", icon: <SelfImprovement /> },
  { name: "Flexibility", icon: <SelfImprovement /> },
];

const Workout = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [isSetRest, setIsSetRest] = useState(false);

  const handleNextExercise = () => {
    if (!selectedWorkout) return;
    if (currentExercise < selectedWorkout.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setCurrentSet(1);
      setIsResting(true);
      setIsSetRest(false);
      setTimeRemaining(parseInt(selectedWorkout.exercises[currentExercise].rest));
    } else {
      setIsWorkoutActive(false);
      setSelectedWorkout(null);
    }
  };

  const handleNextSet = () => {
    if (!selectedWorkout) return;
    if (currentSet < selectedWorkout.exercises[currentExercise].sets) {
      setCurrentSet(prev => prev + 1);
      setTimeRemaining(parseInt(selectedWorkout.exercises[currentExercise].exerciseTime));
    } else {
      handleNextExercise();
    }
  };

  const startWorkout = () => {
    if (!selectedWorkout) return;
    setIsWorkoutActive(true);
    setCurrentExercise(0);
    setCurrentSet(1);
    setCompletedExercises([]);
    setIsResting(false);
    setIsSetRest(false);
    setTimeRemaining(parseInt(selectedWorkout.exercises[0].exerciseTime));
  };

  useEffect(() => {
    if (!selectedWorkout) return;
    let timer;
    if (isWorkoutActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isWorkoutActive && timeRemaining === 0) {
      if (isResting) {
        if (isSetRest) {
          setIsSetRest(false);
          setIsResting(false);
          setTimeRemaining(parseInt(selectedWorkout.exercises[currentExercise].exerciseTime));
        } else {
          setIsResting(false);
          handleNextSet();
        }
      } else {
        setIsResting(true);
        setIsSetRest(true);
        setTimeRemaining(parseInt(selectedWorkout.exercises[currentExercise].rest));
      }
    }
    return () => clearInterval(timer);
  }, [isWorkoutActive, timeRemaining, isResting, currentExercise, currentSet, handleNextSet, isSetRest, selectedWorkout]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExerciseComplete = () => {
    if (!selectedWorkout) return;
    setCompletedExercises([...completedExercises, currentExercise]);
    handleNextExercise();
  };

  const filteredWorkouts = selectedCategory === "All"
    ? workoutPlans
    : workoutPlans.filter(workout => workout.category === selectedCategory);

  return (
    <Container>
      <Title>Workout Plans</Title>
      
      <Box sx={{ mb: 2 }}>
        {categories.map((category) => (
          <CategoryChip
            key={category.name}
            label={category.name}
            icon={category.icon}
            onClick={() => setSelectedCategory(category.name)}
            color={selectedCategory === category.name ? "primary" : "default"}
            variant={selectedCategory === category.name ? "filled" : "outlined"}
          />
        ))}
      </Box>

      <Grid container spacing={3}>
        {filteredWorkouts.map((workout) => (
          <Grid item xs={12} sm={6} md={4} key={workout.id}>
            <WorkoutCard>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {workout.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {workout.title}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Timer color="primary" />
                    <Typography variant="body2">{workout.duration}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TrendingUp color="primary" />
                    <Typography variant="body2">{workout.difficulty}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Estimated calories: {workout.calories}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {workout.description}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<PlayArrow />}
                  sx={{ mt: 2 }}
                  onClick={() => setSelectedWorkout(workout)}
                >
                  Start Workout
                </Button>
              </CardContent>
            </WorkoutCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={!!selectedWorkout}
        onClose={() => {
          if (!isWorkoutActive) {
            setSelectedWorkout(null);
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        {selectedWorkout && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {selectedWorkout.icon}
                {selectedWorkout.title}
              </Box>
            </DialogTitle>
            <DialogContent>
              {!isWorkoutActive ? (
                <>
                  <Typography variant="body1" gutterBottom>
                    {selectedWorkout.description}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <Chip icon={<Timer />} label={selectedWorkout.duration} />
                    <Chip icon={<TrendingUp />} label={selectedWorkout.difficulty} />
                    <Chip label={`${selectedWorkout.calories} calories`} />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Exercises
                  </Typography>
                  <List>
                    {selectedWorkout.exercises.map((exercise, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemIcon>
                            <FitnessCenter />
                          </ListItemIcon>
                          <ListItemText
                            primary={exercise.name}
                            secondary={`${exercise.sets} sets × ${exercise.reps} (Rest: ${exercise.rest})`}
                          />
                        </ListItem>
                        {index < selectedWorkout.exercises.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </>
              ) : (
                <>
                  <WorkoutTimer>
                    {formatTime(timeRemaining)}
                  </WorkoutTimer>
                  <Typography variant="h6" align="center" gutterBottom>
                    {isResting 
                      ? isSetRest 
                        ? "Rest Between Sets" 
                        : "Rest Between Exercises"
                      : "Current Exercise"}
                  </Typography>
                  <ExerciseCard active={!isResting}>
                    <CardContent>
                      <Typography variant="h6">
                        {selectedWorkout.exercises[currentExercise].name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Set {currentSet} of {selectedWorkout.exercises[currentExercise].sets}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {selectedWorkout.exercises[currentExercise].reps}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={(completedExercises.length / selectedWorkout.exercises.length) * 100}
                        sx={{ mt: 2 }}
                      />
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Progress: {completedExercises.length}/{selectedWorkout.exercises.length} exercises
                      </Typography>
                    </CardContent>
                  </ExerciseCard>
                  <TimerControls>
                    <IconButton 
                      color="primary" 
                      onClick={() => setIsWorkoutActive(!isWorkoutActive)}
                    >
                      {isWorkoutActive ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton 
                      color="primary" 
                      onClick={handleExerciseComplete}
                      disabled={isResting}
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton 
                      color="primary" 
                      onClick={handleNextExercise}
                    >
                      <SkipNext />
                    </IconButton>
                  </TimerControls>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                startIcon={<Close />}
                onClick={() => {
                  if (!isWorkoutActive) {
                    setSelectedWorkout(null);
                  }
                }}
                disabled={isWorkoutActive}
              >
                Close
              </Button>
              {!isWorkoutActive && (
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={startWorkout}
                >
                  Start Workout
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Workout; 