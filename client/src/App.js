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
import MovieDetail from "./components/MovieDetail";
import FavouriteCrews from "./components/FavouriteCrews";
import WatchList from "./components/WatchList";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function App() {
  return (
    <AuthProvider>
      <Container maxWidth="xl">
        <Header />
        <NavBar />
        <Routes>
          <Route path="/movies/crew/:id" element={<Movies />} />
          <Route path="/movies/genre/:genre" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/crews/movie/:id" element={<Crews />} />
          <Route path="/crews/department/:department" element={<Crews />} />
          <Route path="/crews/:id" element={<CrewDetail/>}/>
          <Route path="/crews" element={<Crews />} />
          <Route path="/favourite" element={<FavouriteCrews/>}/>
          <Route path="/watch-list" element={<WatchList/>}/>
          <Route path="/" element={<Crews />} />
        </Routes>
        <Footer />
      </Container>
    </AuthProvider>
  );
}

export default App;
