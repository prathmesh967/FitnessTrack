# FitnessTrack

A comprehensive full-stack fitness tracking application built with React and Node.js. Track your workouts, monitor nutrition, set goals, and visualize your progress with interactive charts and dashboards.

## Features

- **User Authentication**: Secure sign-up and login with JWT tokens
- **Workout Tracking**: Add, view, and manage your workout sessions
- **Nutrition Monitoring**: Track your daily nutrition intake
- **Goal Setting**: Set and track fitness goals
- **Progress Visualization**: Interactive charts showing your fitness progress over time
- **Dashboard**: Overview of your fitness metrics and recent activities
- **Profile Management**: Update your personal information and preferences
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend:** React, Redux Toolkit, Material-UI, React Router, Chart.js, Axios, Styled Components
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, CORS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fitnesstrack.git
   cd fitnesstrack
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```
   MONGODB_URL=mongodb://localhost:27017/fittrack
   JWT_SECRET=your_jwt_secret_key_here
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URL` in the `.env` file.

## Usage

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:8080`

2. **Start the frontend client**
   ```bash
   cd client
   npm start
   ```
   The client will run on `http://localhost:3000`

3. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/user/signup` - User registration
- `POST /api/user/signin` - User login

### Protected Routes (require JWT token)
- `GET /api/user/dashboard` - Get user dashboard data
- `GET /api/user/workout` - Get user workouts by date
- `POST /api/user/workout` - Add new workout

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with React and Material-UI for the frontend
- Powered by Node.js and Express for the backend
- Data visualization with Chart.js
- Icons provided by Material-UI Icons</content>
<parameter name="filePath">d:\FitnessTrack\FitnessTrack\FItnessTrack-master\README.md
