import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: ".8rem" }}
        >
          Sodio Dashboard Application
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
