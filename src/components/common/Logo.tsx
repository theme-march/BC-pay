import Image from "next/image";
import { Box, Stack } from "@mui/material";

export function Logo() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box sx={{ width: 132, height: 90, position: "relative" }}>
        <Image
          src="/logo/brain-code.png"
          alt="BC Pay logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Stack>
  );
}
