import { useParams } from "react-router";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import SkeletonLoader from "../Components/Loader";
import axios from "axios";
import { useContextApi } from "../Context/Context";
import { Typography } from "@mui/material";

const url = import.meta.env.VITE_USER_URL;
// Ensure the URL includes the protocol
function formatUrl(websiteAddress) {
  return websiteAddress.startsWith("http://") ||
    websiteAddress.startsWith("https://")
    ? websiteAddress
    : `https://${websiteAddress}`;
}

const UserDetailsPage = () => {
  let params = useParams();
  const navigate = useNavigate();
  const { showAlert } = useContextApi();

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params && params.userId) {
      axios
        .get(url + "/" + params.userId)
        .then((response) => {
          setUserDetails(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          if (err?.response?.data?.message) {
            showAlert(err?.response?.data?.message, "error");
          } else {
            showAlert(err.message, "error");
          }
          setLoading(false);
        });
    }
  }, [params]);

  if (loading) {
    return (
      <Card elevation={0} sx={{ padding: "2rem" }}>
        <SkeletonLoader />
      </Card>
    );
  }

  return (
    <Paper sx={{ padding: "2rem" }} elevation={0}>
      {userDetails ? (
        <>
          {" "}
          <Card elevation={0} sx={{ width: "100%", marginBottom: "1rem" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="none"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
                href="/"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Link
                underline="none"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
              >
                User Details
              </Link>
            </Breadcrumbs>
          </Card>
          <Card sx={{ width: "100%" }} variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {userDetails.name}
              </Typography>
              <Stack direction="row" gap={1} mb={1}>
                <MailIcon color="action" sx={{ fontSize: "16px" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {userDetails.email}
                </Typography>
              </Stack>
              <Stack direction="row" gap={1} mb={1}>
                <LocalPhoneIcon color="action" sx={{ fontSize: "16px" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {userDetails.phone}
                </Typography>
              </Stack>
              <Stack direction="row" gap={1} mb={1}>
                <LocationOnIcon color="action" sx={{ fontSize: "16px" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {userDetails.address.street}, {userDetails.address.suite},{" "}
                  {userDetails.address.city}, {userDetails.address.zipcode}
                </Typography>
              </Stack>
              <Stack direction="row" gap={1} mb={1}>
                <LanguageIcon color="action" sx={{ fontSize: "16px" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <a
                    href={formatUrl(userDetails.website)}
                    alt="website"
                    target="_blank"
                  >
                    {userDetails.website}
                  </a>
                </Typography>
              </Stack>
              <Divider />
              <Stack gap={1} my={1}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color="textSecondary"
                >
                  Company Information
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Name : {userDetails.company.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Catch Phrase : {userDetails.company.catchPhrase}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  BS : {userDetails.company.bs}
                </Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                sx={{ marginLeft: ".5rem" }}
                onClick={() => {
                  navigate(`/`);
                }}
                endIcon={<ArrowBackIcon />}
              >
                Go back
              </Button>
            </CardActions>
          </Card>
        </>
      ) : null}
    </Paper>
  );
};

export default UserDetailsPage;
