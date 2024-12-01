/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import SkeletonLoader from "../Components/Loader";
import { Card, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserCard from "../Components/UserCard";
import { useContextApi } from "../Context/Context";
import SearchAndFilterBar from "../Components/SearchAndFilterBar";
const url = import.meta.env.VITE_USER_URL;

const UsersPage = () => {
  //   const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { users, setUsers, showAlert } = useContextApi();

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          showAlert(err?.response?.data?.message, "error");
        } else {
          showAlert(err.message, "error");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Paper sx={{ padding: "2rem" }} elevation={0}>
        <Grid container spacing={2}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={new Date().getTime() + "_" + index}
            >
              <Card sx={{ height: 180, padding: "1rem" }}>
                <SkeletonLoader />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }

  return (
    <Paper sx={{ padding: "2rem" }}>
      <SearchAndFilterBar />
      <br />
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default UsersPage;
