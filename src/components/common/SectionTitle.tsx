import { Typography } from "@mui/material";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: 34, md: 46 },
        mb: { xs: 3, md: 6 },
        textTransform: "uppercase",
        textShadow: "3px 3px 0 rgba(22,119,255,.35)"
      }}
    >
      {children}
    </Typography>
  );
}
