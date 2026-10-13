import type { Service } from "../services";

export const services: Omit<Service, "slug">[] = [
  { id: "foto-e-video", name: "Photo and video", icon: "camera", desc: "Dishes, venue and social media video" },
  { id: "presenza-online", name: "Online presence", icon: "globe", desc: "Google, TripAdvisor and your channels" },
];
