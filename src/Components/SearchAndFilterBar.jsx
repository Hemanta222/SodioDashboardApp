import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContextApi } from "../Context/Context";
import { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
const SearchAndFilterBar = () => {
  const { city, setCity, users, searchText, setSearchText } = useContextApi();
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
    if (searchText) {
      setSearchText("");
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <FormControl sx={{ minWidth: { xs: "100%", sm: "50%", md: "300px" } }}>
        <InputLabel id="demo-simple-select-label">Select City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="Select City"
          onChange={handleChange}
          sx={{
            pl: 2,
            borderRadius: "1.6rem",
            boxShadow: " rgba(158,207,255,1) 0px 2px 8px 0px",
          }}
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
      <FormControl
        variant="standard"
        sx={{
          minWidth: { xs: "100%", sm: "50%", md: "300px" },
          marginLeft: { xs: "auto", sm: "16px" },
          marginTop: { xs: "1rem", sm: "auto" },
        }}
      >
        <TextField
          id="outlined-required"
          placeholder="Search User"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "1.6rem",
              boxShadow: " rgba(158,207,255,1) 0px 2px 8px 0px",
            },
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </FormControl>
    </Box>
  );
};

export default SearchAndFilterBar;
