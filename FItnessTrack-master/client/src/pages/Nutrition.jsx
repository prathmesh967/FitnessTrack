import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Add as AddIcon,
  WaterDrop,
  Restaurant,
  LocalFireDepartment,
  TrendingUp,
  Delete
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
  Chip
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const StatCard = styled(Card)`
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const ProgressSection = styled.div`
  margin-top: 20px;
`;

const MealList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MealCard = styled(Card)`
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const MealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const MealActions = styled.div`
  display: flex;
  gap: 8px;
`;

const Nutrition = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [calories, setCalories] = useState({
    consumed: 0,
    goal: 2000
  });
  const [meals, setMeals] = useState([]);
  const [openMealDialog, setOpenMealDialog] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: ""
  });

  useEffect(() => {
    // Load saved data from localStorage
    const savedWater = localStorage.getItem("waterIntake");
    const savedCalories = localStorage.getItem("calories");
    const savedMeals = localStorage.getItem("meals");

    if (savedWater) setWaterIntake(parseInt(savedWater));
    if (savedCalories) setCalories(JSON.parse(savedCalories));
    if (savedMeals) setMeals(JSON.parse(savedMeals));
  }, []);

  const handleWaterAdd = () => {
    const newIntake = waterIntake + 250; // 250ml per glass
    setWaterIntake(newIntake);
    localStorage.setItem("waterIntake", newIntake.toString());
    
    // Reset water intake at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
      setWaterIntake(0);
      localStorage.setItem("waterIntake", "0");
    }, timeUntilMidnight);
  };

  const handleMealAdd = () => {
    if (newMeal.name && newMeal.calories) {
      const meal = {
        id: Date.now(),
        ...newMeal,
        calories: parseInt(newMeal.calories) || 0,
        protein: parseInt(newMeal.protein) || 0,
        carbs: parseInt(newMeal.carbs) || 0,
        fat: parseInt(newMeal.fat) || 0,
        timestamp: new Date().toISOString()
      };

      const updatedMeals = [...meals, meal];
      setMeals(updatedMeals);
      localStorage.setItem("meals", JSON.stringify(updatedMeals));

      const newCalories = {
        ...calories,
        consumed: calories.consumed + meal.calories
      };
      setCalories(newCalories);
      localStorage.setItem("calories", JSON.stringify(newCalories));

      setNewMeal({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: ""
      });
      setOpenMealDialog(false);
    }
  };

  const handleMealDelete = (mealId) => {
    const mealToDelete = meals.find(meal => meal.id === mealId);
    const updatedMeals = meals.filter(meal => meal.id !== mealId);
    setMeals(updatedMeals);
    localStorage.setItem("meals", JSON.stringify(updatedMeals));

    const newCalories = {
      ...calories,
      consumed: calories.consumed - mealToDelete.calories
    };
    setCalories(newCalories);
    localStorage.setItem("calories", JSON.stringify(newCalories));
  };

  const getMacroTotal = (macro) => {
    return meals.reduce((sum, meal) => sum + (meal[macro] || 0), 0);
  };

  return (
    <Container>
      <Title>Nutrition Tracker</Title>

      <StatsGrid>
        <StatCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <WaterDrop style={{ marginRight: 8 }} />
              Water Intake
            </Typography>
            <Typography variant="h4">{waterIntake}ml</Typography>
            <Typography variant="body2" color="textSecondary">
              Goal: 2000ml
            </Typography>
            <ProgressSection>
              <LinearProgress
                variant="determinate"
                value={(waterIntake / 2000) * 100}
                style={{ height: 8, borderRadius: 4 }}
              />
            </ProgressSection>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleWaterAdd}
              style={{ marginTop: 16 }}
            >
              Add Glass (250ml)
            </Button>
          </CardContent>
        </StatCard>

        <StatCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <LocalFireDepartment style={{ marginRight: 8 }} />
              Calories
            </Typography>
            <Typography variant="h4">{calories.consumed}</Typography>
            <Typography variant="body2" color="textSecondary">
              Goal: {calories.goal}
            </Typography>
            <ProgressSection>
              <LinearProgress
                variant="determinate"
                value={(calories.consumed / calories.goal) * 100}
                style={{ height: 8, borderRadius: 4 }}
              />
            </ProgressSection>
          </CardContent>
        </StatCard>

        <StatCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <TrendingUp style={{ marginRight: 8 }} />
              Macros
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" color="textSecondary">
                  Protein
                </Typography>
                <Typography variant="h6">
                  {getMacroTotal('protein')}g
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="textSecondary">
                  Carbs
                </Typography>
                <Typography variant="h6">
                  {getMacroTotal('carbs')}g
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="textSecondary">
                  Fat
                </Typography>
                <Typography variant="h6">
                  {getMacroTotal('fat')}g
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </StatCard>
      </StatsGrid>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">
          <Restaurant style={{ marginRight: 8 }} />
          Today's Meals
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenMealDialog(true)}
        >
          Add Meal
        </Button>
      </div>

      <MealList>
        {meals.map((meal) => (
          <MealCard key={meal.id}>
            <CardContent>
              <MealHeader>
                <Typography variant="h6">{meal.name}</Typography>
                <MealActions>
                  <IconButton size="small" onClick={() => handleMealDelete(meal.id)}>
                    <Delete />
                  </IconButton>
                </MealActions>
              </MealHeader>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Chip
                    icon={<LocalFireDepartment />}
                    label={`${meal.calories} cal`}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Chip
                    label={`P: ${meal.protein}g`}
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Chip
                    label={`C: ${meal.carbs}g`}
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Chip
                    label={`F: ${meal.fat}g`}
                    size="small"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </MealCard>
        ))}
      </MealList>

      <Dialog open={openMealDialog} onClose={() => setOpenMealDialog(false)}>
        <DialogTitle>Add Meal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Meal Name"
            fullWidth
            value={newMeal.name}
            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Calories"
            type="number"
            fullWidth
            value={newMeal.calories}
            onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Protein (g)"
            type="number"
            fullWidth
            value={newMeal.protein}
            onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Carbs (g)"
            type="number"
            fullWidth
            value={newMeal.carbs}
            onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Fat (g)"
            type="number"
            fullWidth
            value={newMeal.fat}
            onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMealDialog(false)}>Cancel</Button>
          <Button onClick={handleMealAdd} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Nutrition; 