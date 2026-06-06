import { CSSProperties, ReactNode } from "react";

function normalizeFlagId(id: string) {
  if (id === "bd") return "bangladesh";
  if (id === "lk") return "sri-lanka";
  return id;
}

function getFlagBackground(id: string): CSSProperties {
  switch (normalizeFlagId(id)) {
    case "bangladesh":
      return { background: "#006A4E" };
    case "india":
      return { background: "linear-gradient(#FF9933 0 33.33%, #fff 33.33% 66.66%, #138808 66.66%)" };
    case "sri-lanka":
      return { background: "linear-gradient(90deg,#00534E 0 14%,#FFB700 14% 24%,#8D153A 24%)" };
    case "pakistan":
      return { background: "linear-gradient(90deg,#fff 0 24%,#01411C 24%)" };
    case "russia":
      return { background: "linear-gradient(#fff 0 33.33%, #1C57A7 33.33% 66.66%, #D52B1E 66.66%)" };
    case "uk":
      return { background: "#012169" };
    case "germany":
      return { background: "linear-gradient(#000 0 33.33%, #DD0000 33.33% 66.66%, #FFCE00 66.66%)" };
    default:
      return { background: "linear-gradient(135deg, #1f2937, #334155)" };
  }
}

function getFlagDetails(id: string, size: number): ReactNode {
  const normalizedId = normalizeFlagId(id);
  const dotSize = Math.max(8, Math.round(size * 0.36));

  switch (normalizedId) {
    case "bangladesh":
      return (
        <span
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: "#F42A41",
            transform: "translateX(8%)",
            boxShadow: "0 0 0 1px rgba(0,0,0,.06)",
          }}
        />
      );
    case "india":
      return (
        <span
          style={{
            width: Math.max(7, Math.round(size * 0.18)),
            height: Math.max(7, Math.round(size * 0.18)),
            borderRadius: "50%",
            border: "1.5px solid #1A3C8E",
            boxShadow: "0 0 0 1px rgba(255,255,255,.55)",
          }}
        />
      );
    case "pakistan":
      return (
        <span style={{ position: "relative", width: dotSize, height: dotSize }}>
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#fff",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 1,
              bottom: 1,
              left: Math.round(dotSize * 0.28),
              right: -1,
              borderRadius: "50%",
              background: "#01411C",
            }}
          />
        </span>
      );
    case "sri-lanka":
      return (
        <span
          style={{
            width: Math.max(6, Math.round(size * 0.14)),
            height: Math.max(6, Math.round(size * 0.14)),
            borderRadius: "50%",
            background: "#FFB700",
            boxShadow: "0 0 0 1px rgba(0,0,0,.08)",
          }}
        />
      );
    case "uk":
      return (
        <>
          <span style={{ position: "absolute", inset: "44% 0", background: "#fff" }} />
          <span style={{ position: "absolute", inset: "0 44%", background: "#fff" }} />
          <span style={{ position: "absolute", inset: "47% 0", background: "#C8102E" }} />
          <span style={{ position: "absolute", inset: "0 47%", background: "#C8102E" }} />
        </>
      );
    default:
      return null;
  }
}

export function FlagBadge({
  id,
  size = 52,
  rounded = 18,
}: {
  id: string;
  size?: number;
  rounded?: number;
}) {
  return (
    <span
      className="flag-badge"
      style={{
        width: size,
        height: size,
        borderRadius: `${rounded}px`,
        display: "inline-grid",
        placeItems: "center",
        overflow: "hidden",
        flex: "0 0 auto",
        position: "relative",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12)",
        ...getFlagBackground(id),
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,.16), transparent 42%, rgba(0,0,0,.08))",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        {getFlagDetails(id, size)}
      </span>
    </span>
  );
}
