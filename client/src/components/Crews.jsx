import CrewList from "./CrewList";
//import Filter from "./Filter";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
//import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useParams } from "react-router-dom";
import Pagination from "./Pagination";

const Crews = (props) => {
  const [deptList, setDeptList] = useState([]);
  const { department = "Any", id } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const changePage = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    axios
      .get("/api/crews/depts")
      .then((res) => setDeptList(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (id) {
        axios
        .get(`/api/crews/movie/${id}/${currentPage}`)
        .then((res) => {
          setData(res.data.crews);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`/api/crews/dept/${department}/${currentPage}`)
        .then((res) => {
          setData(res.data.crews);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.log(err));
    }
  }, [currentPage, department]);

  return (
    <Grid container spacing={3}>
      {/* Filter Bar on the left */}
      <Grid item md={2}>
        <strong>Department: </strong>
        <ListItem key={"Any"} disablePadding>
          <ListItemButton component="a" href={"/crews/Any"}>
            <ListItemText primary={"Any Department"} />
          </ListItemButton>
        </ListItem>

        {deptList.map((dept) => (
          <ListItem key={dept} disablePadding>
            <ListItemButton component="a" href={`/crews/${dept}`}>
              <ListItemText primary={dept} />
            </ListItemButton>
          </ListItem>
        ))}
      </Grid>

      {/* Crews display */}
      <Grid item md={10}>
        {/* Content of current page */}
        <CrewList dept={department} data={data} />
        {/* Pagination buttons */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          changePage={changePage}
        />
        {/* <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => changePage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div> */}
      </Grid>
    </Grid>
  );
};

export default Crews;
