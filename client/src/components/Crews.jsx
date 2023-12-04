import CrewList from "./CrewList";
//import Filter from "./Filter";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
//import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import Pagination from "./Pagination";
import Loader from "./Loader";
const Crews = (props) => {
  const [loading, setLoading] = useState(false);
  const [deptList, setDeptList] = useState([]);
  const { department = "Any", id } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const changePage = (selectedPage) => {
    console.log(`change page to ${selectedPage}`)
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    axios
      .get("/api/crews/depts")
      .then((res) => setDeptList(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setLoading(true)
    if (id) {
        axios
        .get(`/api/crews/movie/${id}/${currentPage}`)
        .then((res) => {
          setData(res.data.crews);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.log(err))
        .finally(()=>setLoading(false));
    } else {
      axios
        .get(`/api/crews/dept/${department}/${currentPage}`)
        .then((res) => {
          setData(res.data.crews);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.log(err))
        .finally(()=>setLoading(false));
    }
  }, [currentPage, department, id]);

  return (
    <Grid container spacing={3}>
      {/* Filter Bar on the left */}
      <Grid item md={3}>
        <strong>Department</strong>
        <ListItem key={"Any"} disablePadding>
          <ListItemButton component={Link} to={"/crews/department/Any"}>
            <ListItemText primary={"Any Department"} />
          </ListItemButton>
        </ListItem>
        
        {deptList.map((dept) => (
          <ListItem key={dept} disablePadding>
            <ListItemButton component={Link} to={`/crews/department/${dept}`}>
              <ListItemText primary={dept} />
            </ListItemButton>
          </ListItem>
        ))}
      </Grid>

      {/* Crews display */}
      <Grid item md={9}>
        {/* Content of current page */}
        <Loader loading={loading} >
         <CrewList dept={department} data={data} />
        </Loader>
        {/* Pagination buttons */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          changePage={changePage}
        />
      </Grid>
    </Grid>
  );
};

export default Crews;
