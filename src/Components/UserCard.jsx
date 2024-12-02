/* eslint-disable react/prop-types */

import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
const UserCard = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "1rem",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          transform: "scale(1.01)",
        },
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
        <Stack direction="row" gap={1} mb={1}>
          <MailIcon color="action" sx={{ fontSize: "16px" }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {user.email}
          </Typography>
        </Stack>
        <Stack direction="row" gap={1} mb={1}>
          <LocalPhoneIcon color="action" sx={{ fontSize: "16px" }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {user.phone}
          </Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <LocationOnIcon color="action" sx={{ fontSize: "16px" }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {user.address.street}, {user.address.suite}, {user.address.city},{" "}
            {user.address.zipcode}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ marginBottom: ".5rem" }}>
        <Button
          size="small"
          variant="contained"
          sx={{
            marginLeft: ".5rem",
            borderRadius: "1rem",
          }}
          onClick={() => {
            navigate(`/${user.id}`);
          }}
        >
          view details
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
