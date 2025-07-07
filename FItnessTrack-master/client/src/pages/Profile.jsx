import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Person,
  Edit,
  Save,
  Settings,
  Notifications,
  Security,
  FitnessCenter,
  Height,
  Scale,
  Cake,
  Email,
  Phone,
  LocationOn,
  Male,
  Female
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  TextField,
  IconButton,
  Switch,
  FormControlLabel,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Tabs,
  Tab
} from "@mui/material";

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

const ProfileCard = styled(Card)`
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  border: 3px solid ${({ theme }) => theme.primary};
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    gender: "male",
    age: 28,
    height: 175,
    weight: 75,
    fitnessGoal: "weight_loss",
    notifications: {
      email: true,
      push: true,
      workout: true,
      achievements: true
    },
    privacy: {
      profileVisibility: "public",
      showProgress: true,
      showWorkouts: true
    }
  });

  useEffect(() => {
    // Load user data from localStorage
    const savedData = localStorage.getItem("userProfile");
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePrivacyChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(userData));
    setIsEditing(false);
  };

  return (
    <Container>
      <Title>Profile</Title>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
          }}
        >
          <Tab icon={<Person />} label="Personal Info" />
          <Tab icon={<Settings />} label="Settings" />
          <Tab icon={<Security />} label="Privacy" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <ProfileCard>
          <CardContent>
            <AvatarSection>
              <StyledAvatar src={userData.avatar} />
              <div>
                <Typography variant="h5">{userData.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {userData.email}
                </Typography>
              </div>
              <IconButton 
                onClick={() => setIsEditing(!isEditing)}
                color="primary"
              >
                {isEditing ? <Save /> : <Edit />}
              </IconButton>
            </AvatarSection>

            <InfoSection>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <InfoItem>
                    <Email color="primary" />
                    <TextField
                      fullWidth
                      label="Email"
                      value={userData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </InfoItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem>
                    <Phone color="primary" />
                    <TextField
                      fullWidth
                      label="Phone"
                      value={userData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </InfoItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem>
                    <LocationOn color="primary" />
                    <TextField
                      fullWidth
                      label="Location"
                      value={userData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      disabled={!isEditing}
                    />
                  </InfoItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem>
                    {userData.gender === "male" ? <Male color="primary" /> : <Female color="primary" />}
                    <FormControl fullWidth disabled={!isEditing}>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={userData.gender}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        label="Gender"
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </InfoItem>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InfoItem>
                    <Cake color="primary" />
                    <TextField
                      fullWidth
                      label="Age"
                      type="number"
                      value={userData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      disabled={!isEditing}
                    />
                  </InfoItem>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InfoItem>
                    <Height color="primary" />
                    <TextField
                      fullWidth
                      label="Height (cm)"
                      type="number"
                      value={userData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      disabled={!isEditing}
                    />
                  </InfoItem>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InfoItem>
                    <Scale color="primary" />
                    <TextField
                      fullWidth
                      label="Weight (kg)"
                      type="number"
                      value={userData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      disabled={!isEditing}
                    />
                  </InfoItem>
                </Grid>
                <Grid item xs={12}>
                  <InfoItem>
                    <FitnessCenter color="primary" />
                    <FormControl fullWidth disabled={!isEditing}>
                      <InputLabel>Fitness Goal</InputLabel>
                      <Select
                        value={userData.fitnessGoal}
                        onChange={(e) => handleInputChange("fitnessGoal", e.target.value)}
                        label="Fitness Goal"
                      >
                        <MenuItem value="weight_loss">Weight Loss</MenuItem>
                        <MenuItem value="muscle_gain">Muscle Gain</MenuItem>
                        <MenuItem value="maintenance">Maintenance</MenuItem>
                        <MenuItem value="general_fitness">General Fitness</MenuItem>
                      </Select>
                    </FormControl>
                  </InfoItem>
                </Grid>
              </Grid>
            </InfoSection>

            {isEditing && (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  startIcon={<Save />}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </CardContent>
        </ProfileCard>
      )}

      {tabValue === 1 && (
        <ProfileCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <Notifications style={{ marginRight: 8 }} />
              Notification Settings
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={userData.notifications.email}
                      onChange={() => handleNotificationChange("email")}
                    />
                  }
                  label="Email Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={userData.notifications.push}
                      onChange={() => handleNotificationChange("push")}
                    />
                  }
                  label="Push Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={userData.notifications.workout}
                      onChange={() => handleNotificationChange("workout")}
                    />
                  }
                  label="Workout Reminders"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={userData.notifications.achievements}
                      onChange={() => handleNotificationChange("achievements")}
                    />
                  }
                  label="Achievement Alerts"
                />
              </Grid>
            </Grid>
          </CardContent>
        </ProfileCard>
      )}

      {tabValue === 2 && (
        <ProfileCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <Security style={{ marginRight: 8 }} />
              Privacy Settings
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Profile Visibility</InputLabel>
                  <Select
                    value={userData.privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                    label="Profile Visibility"
                  >
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                    <MenuItem value="friends">Friends Only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={userData.privacy.showProgress}
                      onChange={(e) => handlePrivacyChange("showProgress", e.target.checked)}
                    />
                  }
                  label="Show Progress to Others"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={userData.privacy.showWorkouts}
                      onChange={(e) => handlePrivacyChange("showWorkouts", e.target.checked)}
                    />
                  }
                  label="Show Workout History"
                />
              </Grid>
            </Grid>
          </CardContent>
        </ProfileCard>
      )}
    </Container>
  );
};

export default Profile; 