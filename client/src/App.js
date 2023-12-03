import "./App.css";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import axios from "axios";
import AuthProvider from "./context/auth.provider";
import Footer from "./components/Footer";
import Crews from "./components/Crews";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import CrewDetail from "./components/CrewDetail";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [deptList, setDeptList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/crews/depts")
      .then((res) => setDeptList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AuthProvider>
      <Container maxWidth="xl">
        <Header />
        <NavBar />
        <Routes>
          <Route path="/movies/crew/:id" element={<Movies />} />
          <Route path="/movies/:genre" element={<Movies />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/crews/movie/:id" element={<Crews />} />
          <Route path="/crews/department/:department" element={<Crews />} />
          <Route path="/crews/:id" element={<CrewDetail/>}/>
          <Route path="/crews" element={<Crews />} />
          <Route path="/" element={<Crews />} />
        </Routes>
        <Footer />
      </Container>
    </AuthProvider>
  );
}

export default App;
