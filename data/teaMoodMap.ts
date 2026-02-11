export type MotionStyle = "still" | "drift" | "pulse";

export type TeaMood = {
  label: string;
  slug: string;
  youtubeUrl: string;
  microPoem: string;
  backgroundFrom: string;
  backgroundTo: string;
  accentColor: string;
  motionStyle: MotionStyle;
};

export const teaMoods: TeaMood[] = [
  {
    label: "gorgeous giesha",
    slug: "gorgeous-giesha",
    youtubeUrl: "https://www.youtube.com/watch?v=uDAMEj403hI",
    microPoem: "Light through petals — a quiet bloom.",
    backgroundFrom: "#221920",
    backgroundTo: "#3e2f3b",
    accentColor: "#d3a2b4",
    motionStyle: "drift"
  },
  {
    label: "sticky honey chai",
    slug: "sticky-honey-chai",
    youtubeUrl: "https://www.youtube.com/watch?v=-l1G0Fkfksw&list=RD-l1G0Fkfksw&start_radio=1",
    microPoem: "Spice and gold — the room exhales.",
    backgroundFrom: "#21170f",
    backgroundTo: "#4e3220",
    accentColor: "#d69f62",
    motionStyle: "pulse"
  },
  {
    label: "beauty queen",
    slug: "beauty-queen",
    youtubeUrl: "https://www.youtube.com/watch?v=40EzqzV7o3Y",
    microPoem: "Radiance held in a warm glass.",
    backgroundFrom: "#19171f",
    backgroundTo: "#393247",
    accentColor: "#c3adc9",
    motionStyle: "still"
  },
  {
    label: "Red",
    slug: "red",
    youtubeUrl: "https://www.youtube.com/watch?v=I-SrGxoGFoE&list=RDI-SrGxoGFoE&start_radio=1",
    microPoem: "Earth’s heartbeat, steady and deep.",
    backgroundFrom: "#1f0f12",
    backgroundTo: "#532127",
    accentColor: "#cf7e84",
    motionStyle: "still"
  },
  {
    label: "liquorice legs",
    slug: "liquorice-legs",
    youtubeUrl: "https://www.youtube.com/watch?v=Vx1UGA_T1nI&list=RDVx1UGA_T1nI&start_radio=1",
    microPoem: "Dark sweetness, velvet and night.",
    backgroundFrom: "#14131d",
    backgroundTo: "#2c2737",
    accentColor: "#9a89b7",
    motionStyle: "drift"
  },
  {
    label: "Russian caravan",
    slug: "russian-caravan",
    youtubeUrl:
      "https://www.youtube.com/watch?v=tkYzhHbgdOk&list=RDEM8KJKsAWB_01c-y-Z6Na58Q&start_radio=1&rv=Vx1UGA_T1nI",
    microPoem: "Smoke, distance, and a slower hour.",
    backgroundFrom: "#161413",
    backgroundTo: "#3a3129",
    accentColor: "#ad8e6f",
    motionStyle: "drift"
  },
  {
    label: "Spi Chai",
    slug: "spi-chai",
    youtubeUrl: "https://www.youtube.com/watch?v=HPTqiuPlaFA&list=RDEM8KJKsAWB_01c-y-Z6Na58Q&index=2",
    microPoem: "Heat flickers — comfort follows.",
    backgroundFrom: "#221313",
    backgroundTo: "#4a2620",
    accentColor: "#da8878",
    motionStyle: "pulse"
  },
  {
    label: "Red, Green & Dreamy",
    slug: "red-green-dreamy",
    youtubeUrl: "https://www.youtube.com/watch?v=aw-znWz8QEI&list=RDEM8KJKsAWB_01c-y-Z6Na58Q&index=11",
    microPoem: "A garden at dusk — soft and bright.",
    backgroundFrom: "#141b1a",
    backgroundTo: "#2c453d",
    accentColor: "#89b9a9",
    motionStyle: "drift"
  },
  {
    label: "French Early Grey",
    slug: "french-early-grey",
    youtubeUrl: "https://www.youtube.com/watch?v=hRaqPMQ4WHw&list=RDEM8KJKsAWB_01c-y-Z6Na58Q&index=12",
    microPoem: "Citrus morning, linen air.",
    backgroundFrom: "#15181d",
    backgroundTo: "#33404c",
    accentColor: "#b8cad4",
    motionStyle: "still"
  },
  {
    label: "Melbourne Breakfast",
    slug: "melbourne-breakfast",
    youtubeUrl: "https://www.youtube.com/watch?v=lJkSCFfZltE",
    microPoem: "Sunrise strength with a polished edge.",
    backgroundFrom: "#1c1710",
    backgroundTo: "#4a3524",
    accentColor: "#d5a778",
    motionStyle: "pulse"
  },
  {
    label: "English Breakfast",
    slug: "english-breakfast",
    youtubeUrl: "https://www.youtube.com/watch?v=f6RG4OdkK2M",
    microPoem: "Bold, familiar — the day begins.",
    backgroundFrom: "#1a1310",
    backgroundTo: "#41291f",
    accentColor: "#c69072",
    motionStyle: "still"
  },
  {
    label: "Strawberries & Cream",
    slug: "strawberries-cream",
    youtubeUrl: "https://www.youtube.com/watch?v=kyDZ_kBrD90",
    microPoem: "Pink daylight, a playful drift.",
    backgroundFrom: "#1b1418",
    backgroundTo: "#493141",
    accentColor: "#e0a8be",
    motionStyle: "drift"
  },
  {
    label: "Matcha",
    slug: "matcha",
    youtubeUrl: "https://www.youtube.com/watch?v=vUf_SaRYKHs",
    microPoem: "Green hush — clarity wakes.",
    backgroundFrom: "#121812",
    backgroundTo: "#334a31",
    accentColor: "#a9c999",
    motionStyle: "still"
  },
  {
    label: "Just Chamomile",
    slug: "just-chamomile",
    youtubeUrl: "https://www.youtube.com/watch?v=zP1JkRPqq5A",
    microPoem: "Golden calm, unhurried.",
    backgroundFrom: "#19160f",
    backgroundTo: "#463a26",
    accentColor: "#d9bf7e",
    motionStyle: "drift"
  },
  {
    label: "Sweetest Dream",
    slug: "sweetest-dream",
    youtubeUrl: "https://www.youtube.com/watch?v=VufGXXP6sjk",
    microPoem: "Lavender dusk, gentler thoughts.",
    backgroundFrom: "#161420",
    backgroundTo: "#3a2f54",
    accentColor: "#b9a5da",
    motionStyle: "drift"
  },
  {
    label: "Wakey Wakey",
    slug: "wakey-wakey",
    youtubeUrl: "https://www.youtube.com/watch?v=gbvzq5xHzcM",
    microPoem: "Bright spark — eyes open wider.",
    backgroundFrom: "#1b160e",
    backgroundTo: "#4b3b1d",
    accentColor: "#e4c278",
    motionStyle: "pulse"
  }
];

export const teaMoodMap = Object.fromEntries(teaMoods.map((tea) => [tea.slug, tea])) as Record<
  string,
  TeaMood
>;
