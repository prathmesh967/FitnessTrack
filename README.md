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

<img width="1918" height="1077" alt="Screenshot 2026-05-05 165157" src="https://github.com/user-attachments/assets/cb0e4086-6a8f-45e1-84e2-cbc1dfd0f18d" />
<img width="1918" height="1073" alt="Screenshot 2026-05-05 165209" src="https://github.com/user-attachments/assets/08900181-6057-4246-8f60-e5c27c17b1dd" />
<img width="556" height="480" alt="Screenshot 2026-05-05 165229" src="https://github.com/user-attachments/assets/1543d28a-6356-464a-ae1d-994454b806ab" />
<img width="1910" height="964" alt="Screenshot 2026-05-05 165650" src="https://github.com/user-attachments/assets/d4539af8-d6c0-4f75-ba9a-01cbf86040f8" />
<img width="1652" height="974" alt="Screenshot 2026-05-05 171707" src="https://github.com/user-attachments/assets/4d900ec1-d5ea-443c-ace1-7177c5ae73c8" />
<img width="1915" height="978" alt="Screenshot 2026-05-05 171800" src="https://github.com/user-attachments/assets/c1314e40-036c-420e-9003-46b520d149a9" />
<img width="777" height="854" alt="Screenshot 2026-05-05 171817" src="https://github.com/user-attachments/assets/9c25be1c-dd2c-4a27-accb-0535e0132923" />
<img width="1915" height="977" alt="Screenshot 2026-05-05 171836" src="https://github.com/user-attachments/assets/f616d7c9-bbfe-4d06-add7-c4fbb33f7139" />
<img width="1919" height="1076" alt="Screenshot 2026-05-05 165139" src="https://github.com/user-attachments/assets/5e61846c-3a34-4b6f-9331-c531632a6cef" />
