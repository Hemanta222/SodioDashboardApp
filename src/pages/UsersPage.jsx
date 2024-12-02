/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import SkeletonLoader from "../Components/Loader";
import { Card, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserCard from "../Components/UserCard";
import { useContextApi } from "../Context/Context";
import SearchAndFilterBar from "../Components/SearchAndFilterBar";
import { filterRecordsWithRegex } from "../utils/textSearch";
import { debounce } from "../utils/debounce";
const url = import.meta.env.VITE_USER_URL;

const UsersPage = () => {
  //   const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { users, setUsers, showAlert, city, searchText } = useContextApi();
  const [records, setRecords] = useState([]);

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

  // Debounced filter function
  const debouncedFilter = useMemo(
    () =>
      debounce((text, data) => {
        const filtered = filterRecordsWithRegex(data, text, "name");
        setRecords(filtered);
      }, 300),
    []
  );

  useEffect(() => {
    if (!users || !users.length) {
      setRecords([]);
      return;
    }

    // Filter users based on city
    let filteredRecords = city
      ? users.filter((user) => user.address.city === city)
      : users;

    // Apply debounced search filter
    if (searchText) {
      debouncedFilter(searchText, filteredRecords);
    } else {
      setRecords(filteredRecords);
    }

    // Update records
    setRecords(filteredRecords);
  }, [city, searchText, users]);

  if (loading) {
    return (
      <Paper sx={{ padding: "2rem" }} elevation={0}>
        <Grid container spacing={2}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={new Date().getTime() + "_" + index}
            >
              <Card sx={{ height: 180, padding: "1rem", borderRadius: "1rem" }}>
                <SkeletonLoader />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{ padding: "2rem", backgroundColor: "transparent" }}
      elevation={0}
    >
      <SearchAndFilterBar />
      <br />
      <Grid container spacing={3}>
        {records.map((user) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
      <br />
    </Paper>
  );
};

export default UsersPage;
