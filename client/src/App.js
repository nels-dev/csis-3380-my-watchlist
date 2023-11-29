import './App.css';
import Header from './components/Header';
import Container from '@mui/material/Container'
import axios from 'axios';
import AuthProvider from './context/auth.provider';
import Search from './components/Search';
import Footer from './components/Footer';
import CrewList from './components/CrewList';
import Filter from './components/Filter';
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL

function App() {

  const [deptList, setDeptList] = useState([]);

  useEffect(() => {
    axios.get('/api/crews/depts')
      .then(res => setDeptList(res.data))
      .catch(err => console.log(err))
  }, []);

  return (
    <AuthProvider>
      <Container maxWidth="xl">
        <Header />
        <Search />

        <Grid container spacing={3}>
          {/* Filter Bar on the left */}
          <Grid item md={2} >
            <strong>Department: </strong>
            <Filter name="Any Department" dept="" />

            {deptList.map((deptName, id) => (
              <Filter name={deptName} dept={deptName} key={id} />
            ))}

          </Grid>
          {/* Crews display */}
          <Grid item md={10}>
            <Routes>
              <Route path="/" element={<CrewList dept="Any" />} />
              {deptList.map((deptName, id) => (
                <Route path={`/${deptName}`} element={<CrewList dept={deptName} />} />
              ))}

            </Routes>
          </Grid>
        </Grid>

        <Footer />
      </Container>
    </AuthProvider>
  );
}

export default App;
