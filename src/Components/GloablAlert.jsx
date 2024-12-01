import { Snackbar, Alert } from "@mui/material";
import { useContextApi } from "../Context/Context";

const GlobalAlert = () => {
  const { alert, closeAlert } = useContextApi();

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        variant="filled"
        onClose={closeAlert}
        severity={alert.severity}
        sx={{ width: "100%" }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;
