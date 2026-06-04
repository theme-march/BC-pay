"use client";

import {
  Check,
  KeyboardArrowDown,
  LightMode,
  NightsStay,
} from "@mui/icons-material";
import { Box, Button, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import { Logo } from "@/components/common/Logo";
import { FlagBadge } from "@/components/common/FlagBadge";
import { languageOptions, useLanguage } from "@/i18n/LanguageContext";
import { useThemeMode } from "@/theme/ThemeModeContext";

export function Header() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const { option, setLanguage } = useLanguage();
  const { mode, setMode } = useThemeMode();

  return (
    <Stack
      component="header"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        position: "absolute",
        inset: "10px 0 auto",
        zIndex: 10,
        width: "100%",
        maxWidth: 1536,
        mx: "auto",
        px: 0,
      }}
    >
      <Logo />
      <Stack direction="row" spacing={1.1} alignItems="flex-start">
        <Stack
          direction="row"
          sx={{
            bgcolor: "rgba(17,17,17,.92)",
            borderRadius: "16px",
            p: "4px",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 8px 24px rgba(0,0,0,.24)",
          }}
        >
          <IconButton
            size="small"
            onClick={() => setMode("light")}
            sx={{
              width: 38,
              height: 38,
              color: "#D6D6D6",
              bgcolor: mode === "light" ? "#3A3A3D" : "transparent",
              borderRadius: "12px",
            }}
          >
            <LightMode />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setMode("dark")}
            sx={{
              width: 38,
              height: 38,
              color: "#FFFFFF",
              bgcolor: mode === "dark" ? "#2C2E35" : "transparent",
              borderRadius: "12px",
            }}
          >
            <NightsStay />
          </IconButton>
        </Stack>
        <Button
          onClick={(event) => setAnchor(event.currentTarget)}
          startIcon={<FlagBadge id={option.flag} size={28} rounded={14} />}
          endIcon={<KeyboardArrowDown />}
          sx={{
            bgcolor: "rgba(17,17,17,.94)",
            color: "white",
            px: 1.3,
            minHeight: 48,
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 8px 24px rgba(0,0,0,.24)",
            "& .MuiButton-endIcon": { ml: 0.5 },
          }}
        >
          {option.short}
        </Button>
      </Stack>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            bgcolor: "#101010",
            color: "white",
            borderRadius: "22px",
            mt: 1,
            minWidth: 220,
            p: 1,
            border: "1px solid rgba(255,255,255,.1)",
            boxShadow: "0 22px 60px rgba(0,0,0,.44)",
            maxHeight: 270,
            overflowY: "auto",
          },
        }}
        MenuListProps={{ sx: { p: 0 } }}
      >
        {languageOptions.map((item) => (
          <MenuItem
            key={item.code}
            selected={item.code === option.code}
            onClick={() => {
              setLanguage(item.code);
              setAnchor(null);
            }}
            sx={{
              borderRadius: "14px",
              py: 1.15,
              px: 1.2,
              fontWeight: 900,
              "&.Mui-selected": { bgcolor: "rgba(255,255,255,.06)" },
              "&.Mui-selected:hover": { bgcolor: "rgba(255,255,255,.1)" },
            }}
          >
            <Stack
              direction="row"
              spacing={1.2}
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <FlagBadge id={item.flag} size={26} rounded={13} />
              <span>{item.label}</span>
              <Box
                sx={{
                  ml: "auto",
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  opacity: item.code === option.code ? 1 : 0,
                }}
              >
                <Check fontSize="small" />
              </Box>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
}
