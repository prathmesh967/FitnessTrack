import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    // Check if the email is in use
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use."));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT || "default_jwt_secret", {
      expiresIn: "9999 years",
    });
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error('UserRegister error:', error);
    return next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select('+password');
    // Check if user exists
    if (!user) {
      return next(createError(404, "User not found"));
    }
    console.log('Fetched user:', user);
    console.log('User password:', user.password);
    // Check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT || "default_jwt_secret", {
      expiresIn: "9999 years",
    });

    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const currentDateFormatted = new Date();
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    //calculte total calories burnt
    const totalCaloriesBurnt = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Calculate total no of workouts
    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    //Calculate average calories burnt per workout
    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    // Fetch category of workouts
    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Format category data for pie chart

    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    const weeks = [];
    const caloriesBurnt = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
      );
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

      caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
      );
    }

    return res.status(200).json({
      totalCaloriesBurnt:
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt
          : 0,
      totalWorkouts: totalWorkouts,
      avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: {
        weeks: weeks,
        caloriesBurned: caloriesBurnt,
      },
      pieChartData: pieChartData,
    });
  } catch (err) {
    next(err);
  }
};

export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    let date = req.query.date ? new Date(req.query.date) : new Date();
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const workouts = await Workout.find({
      user: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    })
      .sort({ date: -1 }); // Sort by date in descending order

    return res.status(200).json(workouts);
  } catch (err) {
    next(err);
  }
};

export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const workout = req.body;

    // Parse workout lines and calculate total calories
    const workoutLines = workout.workoutString
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== ""); // Split by newline, trim whitespace, and remove empty lines

    let totalCaloriesBurned = 0;
    const workoutDetails = [];
    let category = "General"; // Default category

    for (const line of workoutLines) {
      // Extract category from lines starting with #
      if (line.startsWith('#')) {
        category = line.substring(1).trim();
        continue;
      }
      
      const parsed = parseWorkoutLine(line);
      if (parsed) {
        const calories = calculateCaloriesBurnt(parsed);
        totalCaloriesBurned += calories;
        workoutDetails.push({ ...parsed, caloriesBurned: calories });
      }
    }

    const newWorkout = new Workout({
      user: userId,
      workoutString: workout.workoutString,
      date: new Date(),
      img: workout.img || null,
      caloriesBurned: totalCaloriesBurned,
      category: category,
      workoutDetails: workoutDetails,
    });

    const createdWorkout = await newWorkout.save();

    return res.status(200).json(createdWorkout);
  } catch (err) {
    next(err);
  }
};

const parseWorkoutLine = (line) => {
  // Skip lines that start with # (category headers)
  if (line.startsWith('#')) {
    return null;
  }
  
  // Parse lines that start with - (workout details)
  if (line.startsWith('-')) {
    const workoutName = line.substring(1).trim();
    return {
      workoutName: workoutName,
      duration: 10, // Default duration
      sets: 3,      // Default sets
      reps: 10      // Default reps
    };
  }
  
  return null;
};

const calculateCaloriesBurnt = (workoutDetails) => {
  // This is a simplified calculation. You can replace this with a more accurate one.
  const durationInMinutes = parseInt(workoutDetails.duration);
  const sets = parseInt(workoutDetails.sets);
  const reps = parseInt(workoutDetails.reps);
  const workoutName = workoutDetails.workoutName;

  // Basic calorie estimation based on duration, sets, and reps
  // (This is a placeholder - replace with real calculation based on workout type)
  return durationInMinutes * sets * reps * 0.1;
};
