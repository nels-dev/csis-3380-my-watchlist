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

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL

function App() {
  return (
    <AuthProvider>
      <Container maxWidth="xl">
        <Header />
        <Search />
        <Grid container spacing={3}>
          <Grid item md={2} >
            <p><strong>Filtered by</strong></p>
            <Filter />
            <Filter />
          </Grid>
          <Grid item md={10}>
            <CrewList />
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </AuthProvider>
  );
}

export default App;
