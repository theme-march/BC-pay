"use client";

import { Box, Button, Chip, Container, Stack, TextField, Typography } from "@mui/material";
import { LocationOn, Phone, Schedule } from "@mui/icons-material";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";

const locations = [
  { id: 1, country: "Bangladesh", city: "Dhaka", name: "Motijheel Exchange Center", address: "78 Motijheel C/A, Dhaka 1000", phone: "+880-2-9559123", hours: "Sun–Thu 09:00–17:00", active: true },
  { id: 2, country: "Bangladesh", city: "Dhaka", name: "Gulshan Money Exchange", address: "45 Gulshan Avenue, Dhaka 1212", phone: "+880-2-8826541", hours: "Sat–Thu 10:00–18:00", active: true },
  { id: 3, country: "Bangladesh", city: "Chittagong", name: "Port City Transfer Hub", address: "12 Station Road, Chittagong", phone: "+880-31-614523", hours: "Sun–Thu 09:00–16:00", active: true },
  { id: 4, country: "Bangladesh", city: "Sylhet", name: "Sylhet International Transfer", address: "Zindabazar, Sylhet 3100", phone: "+880-821-718232", hours: "Sat–Thu 09:00–17:00", active: false },
  { id: 5, country: "India", city: "Kolkata", name: "Kolkata Money Services", address: "24 Park Street, Kolkata 700016", phone: "+91-33-22291234", hours: "Mon–Sat 10:00–18:00", active: true },
  { id: 6, country: "India", city: "Delhi", name: "Delhi Transfer Point", address: "Connaught Place, New Delhi 110001", phone: "+91-11-23412345", hours: "Mon–Sat 09:00–17:00", active: true },
  { id: 7, country: "Sri Lanka", city: "Colombo", name: "Colombo Exchange Hub", address: "35 Galle Road, Colombo 03", phone: "+94-11-2345678", hours: "Mon–Fri 09:00–16:00", active: true },
  { id: 8, country: "Sri Lanka", city: "Kandy", name: "Kandy Money Transfer", address: "King Street, Kandy 20000", phone: "+94-81-2234567", hours: "Mon–Sat 09:00–15:00", active: true },
];

const COUNTRIES = ["All", "Bangladesh", "India", "Sri Lanka"];

export default function PickupPage() {
  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState("All");

  const filtered = locations.filter((loc) => {
    const matchesCountry = activeCountry === "All" || loc.country === activeCountry;
    const matchesSearch = `${loc.name} ${loc.city} ${loc.address}`.toLowerCase().includes(search.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <main>
      <Box sx={{ background: "radial-gradient(circle at 70% 5%, #0d2a1a 0%, #05080f 60%)", minHeight: "50vh" }}>
        <Header />
        <Container maxWidth="lg" sx={{ pt: { xs: 16, md: 20 }, pb: 10 }}>
          <Typography variant="h1" fontWeight={900} fontSize={{ xs: 36, md: 56 }} textTransform="uppercase" mb={2}>
            Cash pickup locations
          </Typography>
          <Typography color="text.secondary" fontSize={{ xs: 16, md: 18 }} mb={6}>
            Find an agent location to collect your transfer in cash. Bring your passport and the transfer code.
          </Typography>

          {/* Filters */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={5}>
            <TextField
              fullWidth
              placeholder="Search by city, office name, or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { bgcolor: "#1A1B1F", borderRadius: 3 } }}
            />
            <Stack direction="row" spacing={1} alignItems="center" flexShrink={0} flexWrap="wrap" useFlexGap>
              {COUNTRIES.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  onClick={() => setActiveCountry(c)}
                  sx={{
                    fontWeight: 800,
                    bgcolor: activeCountry === c ? "primary.main" : "#25262A",
                    color: activeCountry === c ? "white" : "text.secondary",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Stack>
          </Stack>

          {/* Location cards */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 2.5 }}>
            {filtered.map((loc) => (
              <Box
                key={loc.id}
                sx={{
                  bgcolor: "#0F1117",
                  borderRadius: 5,
                  p: 3.5,
                  border: loc.active ? "1px solid rgba(22,119,255,.15)" : "1px solid rgba(255,255,255,.05)",
                  opacity: loc.active ? 1 : 0.55,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    <Typography fontWeight={900} fontSize={18}>{loc.name}</Typography>
                    <Typography color="text.secondary">{loc.country} · {loc.city}</Typography>
                  </Box>
                  <Chip
                    label={loc.active ? "Open" : "Closed"}
                    size="small"
                    sx={{ bgcolor: loc.active ? "rgba(22,119,255,.2)" : "rgba(255,255,255,.08)", color: loc.active ? "#42A5F5" : "text.secondary", fontWeight: 800 }}
                  />
                </Stack>
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <LocationOn sx={{ fontSize: 18, color: "text.secondary", mt: "2px" }} />
                    <Typography color="text.secondary" fontSize={15}>{loc.address}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Phone sx={{ fontSize: 18, color: "text.secondary" }} />
                    <Typography color="text.secondary" fontSize={15}>{loc.phone}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Schedule sx={{ fontSize: 18, color: "text.secondary" }} />
                    <Typography color="text.secondary" fontSize={15}>{loc.hours}</Typography>
                  </Stack>
                </Stack>
                {loc.active && (
                  <Button variant="outlined" size="small" sx={{ mt: 2.5, borderRadius: 2 }}>
                    Get directions
                  </Button>
                )}
              </Box>
            ))}
          </Box>

          {filtered.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
              <Typography fontSize={18}>No locations found. Try a different search.</Typography>
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </main>
  );
}
