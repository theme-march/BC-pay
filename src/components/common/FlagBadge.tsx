import { Box } from "@mui/material";

const flagStyles: Record<string, object> = {
  bangladesh: { background: "#006A4E", "&:after": { content: '""', width: "46%", height: "46%", borderRadius: "50%", bgcolor: "#F42A41" } },
  india: { background: "linear-gradient(#FF9933 0 33%, #fff 33% 66%, #138808 66%)" },
  "sri-lanka": { background: "linear-gradient(90deg,#00534E 0 18%,#FFB700 18% 30%,#8D153A 30%)" },
  pakistan: { background: "linear-gradient(90deg,#fff 0 25%,#01411C 25%)" },
  nepal: { background: "linear-gradient(135deg,#DC143C,#003893)" },
  uzbekistan: { background: "linear-gradient(#1EB4D7 0 32%,#fff 32% 64%,#1EB53A 64%)" },
  tajikistan: { background: "linear-gradient(#C00 0 33%,#fff 33% 66%,#060 66%)" },
  kyrgyzstan: { background: "#E8112D" },
  germany: { background: "linear-gradient(#000 0 33%,#DD0000 33% 66%,#FFCE00 66%)" },
  russia: { background: "linear-gradient(#fff 0 33%,#1C57A7 33% 66%,#D52B1E 66%)" },
  uk: { background: "linear-gradient(135deg,#012169 0 40%,#fff 40% 46%,#C8102E 46% 54%,#fff 54% 60%,#012169 60%)" },
  bd: { background: "#006A4E", "&:after": { content: '""', width: "46%", height: "46%", borderRadius: "50%", bgcolor: "#F42A41" } },
  lk: { background: "linear-gradient(90deg,#00534E 0 18%,#FFB700 18% 30%,#8D153A 30%)" }
};

export function FlagBadge({ id, size = 52, rounded = 18 }: { id: string; size?: number; rounded?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: `${rounded}px`,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        flex: "0 0 auto",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12)",
        ...flagStyles[id]
      }}
    />
  );
}
