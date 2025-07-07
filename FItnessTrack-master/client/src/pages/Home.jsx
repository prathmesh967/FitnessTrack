import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { FitnessCenter } from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.primary};
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-bottom: 40px;
  max-width: 600px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Welcome to Fittrack</Title>
      <Subtitle>
        Your personal fitness companion. Track your workouts, set goals, and achieve
        your fitness dreams with our comprehensive fitness tracking platform.
      </Subtitle>
      <ButtonContainer>
        <Button
          variant="contained"
          size="large"
          startIcon={<FitnessCenter />}
          onClick={() => navigate("/register")}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </ButtonContainer>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 Fittrack. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home; 