import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors";

export default function Avatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: "#DC8DF0" }}>PK</Avatar>
    </Stack>
  );
}
