import './App.css';
import Header from './components/Header';
import Container from '@mui/material/Container'
import axios from 'axios';
import AuthProvider from './context/auth.provider';
import Search from './components/Search';
import Footer from './components/Footer';
import CrewList from './components/CrewList';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL

function App() {
  return (
    <AuthProvider>
      <Container maxWidth="xl">
        <Header/>
        <Search />
        <CrewList />
        <Footer />
      </Container>
    </AuthProvider>
  );
}

export default App;
