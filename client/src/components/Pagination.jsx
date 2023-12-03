import React from "react";
import { Pagination as MuiPagination, Grid } from "@mui/material";
const Pagination = ({ totalPages, currentPage, changePage }) => {

  return (
    <Grid container sx={{mt:3}}>
      <Grid item sm></Grid>
      <Grid item >
        <MuiPagination count={totalPages} defaultPage={currentPage} onChange={(event, page)=> changePage(page)}/>
      </Grid>
      <Grid item sm></Grid>
    </Grid>

  );
};

export default Pagination;
