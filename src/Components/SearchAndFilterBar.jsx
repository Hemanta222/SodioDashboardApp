import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useContextApi } from "../Context/Context";
import { useEffect, useState } from "react";

const SearchAndFilterBar = () => {
  const { city, setCity, users } = useContextApi();
  const [cities, setCities] = useState([]);
  useEffect(() => {
    if (users && users.length) {
      const cities = new Set(); // Use a Set for unique values
      users.forEach((user) => cities.add(user.address.city));

      setCities(Array.from(cities));
    }
  }, [users]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };
  return (
    <Paper sx={{ p: 2 }} variant="outlined">
      <Grid container spacing={2}>
        <Grid size={{ xs: 3, md: 2 }}>
          <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Select City
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Select City"
              variant="outlined"
              value={city}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {cities.map((city) => (
                <MenuItem value={city} key={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
            <TextField
              id="outlined-required"
              label="Search User"
              placeholder="Search User"
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 3, md: 2 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ height: "54px", mt: 1 }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchAndFilterBar;
