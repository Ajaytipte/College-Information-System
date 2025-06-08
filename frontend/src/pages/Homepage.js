import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box, Button } from "@mui/material";
import styled from "styled-components";
import Students from "../assets/students.svg";
import { LightPurpleButton } from "../components/buttonStyles";
import Chatbot from "../components/Chatbot";


const Homepage = () => {
  return (
    <StyledContainer>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <img src={Students} alt="students" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTitle>
              Welcome to
              <br />
              College Information
              <br />
              System
            </StyledTitle>
            <StyledText>
              Streamline school management, class organization, and add students
              and faculty. Seamlessly track attendance, assess performance, and
              provide feedback. Access records, view marks, and communicate
              effortlessly.
            </StyledText>
            <StyledBox>
              <StyledLink to="/choose">
                <LightPurpleButton variant="contained" fullWidth>
                  Login
                </LightPurpleButton>
              </StyledLink>

              <StyledLink to="/Adminregister">
                <LightPurpleButton variant="outlined" fullWidth>
                  Sign Up
                </LightPurpleButton>
              </StyledLink>

            
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
      
      <Chatbot />

    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
  margin-top: 0;

  @media (max-width: 960px) {
    margin-top: 40px;
  }

  @media (max-width: 600px) {
    margin-top: 60px;
    padding: 16px;
  }
`;


const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row; /* Changed from column to row */
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;


const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledImage = styled.img`
  width: 100%;
  margin-top: 20px;

  @media (max-width: 960px) {
    margin-top: 30px;
  }

  @media (max-width: 600px) {
    margin-top: 50px;
  }
`;