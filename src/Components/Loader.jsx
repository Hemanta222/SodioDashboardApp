import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonLoader() {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton animation="wave" height={60} />
      <Stack flexDirection="row" gap={1}>
        <Skeleton animation={false} width={30} height={40} />{" "}
        <Skeleton animation="wave" height={40} sx={{ width: "100%" }} />
      </Stack>
      <Stack flexDirection="row" gap={1}>
        <Skeleton animation={false} width={30} height={40} />{" "}
        <Skeleton animation="wave" height={40} sx={{ width: "100%" }} />
      </Stack>
      <Stack flexDirection="row" gap={1}>
        <Skeleton animation={false} width={30} height={40} />{" "}
        <Skeleton animation="wave" height={40} sx={{ width: "100%" }} />
      </Stack>
    </Box>
  );
}
