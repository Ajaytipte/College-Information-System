import React from 'react'
import styled from 'styled-components'
import { Card, CardContent, Typography, Avatar, Box, Grid } from '@mui/material'
import { useSelector } from 'react-redux'

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user)

  if (response) console.log(response)
  else if (error) console.log(error)

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <Container>
      <ProfileCard>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar sx={{ width: 100, height: 100, bgcolor: '#1976d2' }}>
              {currentUser.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
          <Typography variant="h5" align="center" gutterBottom>
            {currentUser.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InfoText><strong>Email:</strong> {currentUser.email}</InfoText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoText><strong>Class:</strong> {teachSclass?.sclassName}</InfoText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoText><strong>Subject:</strong> {teachSubject?.subName}</InfoText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoText><strong>School:</strong> {teachSchool?.schoolName}</InfoText>
            </Grid>
          </Grid>
        </CardContent>
      </ProfileCard>
    </Container>
  )
}

export default TeacherProfile

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #f5f5f5;
`

const ProfileCard = styled(Card)`
  max-width: 500px;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`

const InfoText = styled(Typography)`
  font-size: 1rem;
  padding: 0.5rem;
  word-wrap: break-word;
`
