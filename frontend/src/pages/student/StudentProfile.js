import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper,
  Button, TextField
} from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    dob: "January 1, 2000",
    gender: "Male",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    address: "123 Main Street, City, Country",
    emergency: "(987) 654-3210"
  });

  if (response) console.log(response);
  if (error) console.log(error);

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you can make an API call to update the profile
    console.log("Updated Data:", formData);
    setEditMode(false);
  };

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                {String(currentUser.name).charAt(0)}
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="h5" component="h2" textAlign="center">
                {currentUser.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle1" component="p" textAlign="center">
                Student Roll No: {currentUser.rollNum}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle1" component="p" textAlign="center">
                Class: {sclassName.sclassName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle1" component="p" textAlign="center">
                School: {studentSchool.schoolName}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>

      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Personal Information</Typography>
            <Button variant="contained" onClick={() => setEditMode(!editMode)}>
              {editMode ? "Cancel" : "Edit Profile"}
            </Button>
          </Box>
          <Grid container spacing={2}>
            {[
              { label: "Date of Birth", name: "dob" },
              { label: "Gender", name: "gender" },
              { label: "Email", name: "email" },
              { label: "Phone", name: "phone" },
              { label: "Address", name: "address" },
              { label: "Emergency Contact", name: "emergency" },
            ].map(({ label, name }) => (
              <Grid item xs={12} sm={6} key={name}>
                {editMode ? (
                  <TextField
                    fullWidth
                    label={label}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography variant="subtitle1">
                    <strong>{label}:</strong> {formData[name]}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
          {editMode && (
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default StudentProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
