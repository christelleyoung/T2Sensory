export type TeaPairing = {
  teaName: string;
  slug: string;
  tastingLine: string;
  videoTitle: string;
  youtubeUrl: string;
  youtubeId: string;
  palette: [string, string, string?];
};

export const teaPairings: TeaPairing[] = [
  {
    teaName: "Gorgeous Geisha",
    slug: "gorgeous-geisha",
    tastingLine: "Apricot hush and silk petals drifting through warm light.",
    videoTitle: "Surreal scenes in Orange and yellow - slow Motion High",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#1C0F0A", "#5B2A18", "#E39C3B"]
  },
  {
    teaName: "Sticky Honey Chai",
    slug: "sticky-honey-chai",
    tastingLine: "Amber spice and slow honeyed spirals in the dark.",
    videoTitle: "I Leave My Worries at the Hive - A Gentle Surreal AI Music Film (4K)",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#120C08", "#3C2414", "#D3A36A"]
  },
  {
    teaName: "Beauty Queen",
    slug: "beauty-queen",
    tastingLine: "Velvet florals and a quiet glow that lingers.",
    videoTitle: "AI Dance Video I Step Into Myself Tonight - 4K",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#140E18", "#3A233B", "#9C7AA5"]
  },
  {
    teaName: "Red",
    slug: "red",
    tastingLine: "Crimson warmth with a smoky, rhythmic pulse.",
    videoTitle: "You Move It For The Soul - AI Music and Dance Video in 4K",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#0F0506", "#4B1215", "#B63A3A"]
  },
  {
    teaName: "Liquorice Legs",
    slug: "liquorice-legs",
    tastingLine: "Dark licorice ribbons and a playful shiver.",
    videoTitle: "A Very Unusual Town - AI Music Video",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#0C0A0F", "#221B2F", "#64507A"]
  },
  {
    teaName: "Russian Caravan",
    slug: "russian-caravan",
    tastingLine: "Smoked resin and midnight caravans beyond the dunes.",
    videoTitle: "AI Short Film | It’s La Vida Loca",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#0E0A06", "#2E1D12", "#B4824D"]
  },
  {
    teaName: "Spi Chai",
    slug: "spi-chai",
    tastingLine: "Saffron smoke curling into a slow dance.",
    videoTitle: "Saffron and Smoke | Surreal AI Dance Video 4K",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#120A07", "#3C2415", "#D1984A"]
  },
  {
    teaName: "Red Green & Dreamy",
    slug: "red-green-dreamy",
    tastingLine: "Herbal dusk and a dreamy, cool hush.",
    videoTitle: "Night Owl-AI Dance Video 4K",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#06110C", "#163826", "#6FA38B"]
  },
  {
    teaName: "FEG",
    slug: "feg",
    tastingLine: "Bright sparks in a shadowed Parisian rain.",
    videoTitle: "AI Surreal Scenes Video - I met a strange man in Paris",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#0B0E15", "#1D2A3E", "#5C7BA2"]
  },
  {
    teaName: "MB",
    slug: "mb",
    tastingLine: "Cloudlight sweetness with an airy, floating finish.",
    videoTitle: "AI Art & Fashion Video | Beyond The Clouds  - 4K",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#0E1218", "#243449", "#7E9BB5"]
  },
  {
    teaName: "English Breakfast",
    slug: "english-breakfast",
    tastingLine: "Classic malt and a cinematic rabbit hole glow.",
    videoTitle: "AI Art Music Video: Surreal ‘Rabbit Holes’ Cinematic | Midjourney x Suno (4K)",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#120E09", "#3B2B1D", "#C19A6B"]
  },
  {
    teaName: "Strawberries & Cream",
    slug: "strawberries-cream",
    tastingLine: "Crimson fruit and cream drifting into dusk.",
    videoTitle: "The Crimson Seal (Bite My Lip) Official AI Music Video - 4K",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#16090D", "#43202A", "#D07A8A"]
  },
  {
    teaName: "Matcha",
    slug: "matcha",
    tastingLine: "Emerald stillness and a meditative hush.",
    videoTitle: "Between Imagining & Real - An AI Journey into the Bizarre",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#0C120B", "#203322", "#8CCB8A"]
  },
  {
    teaName: "Just Chamomile",
    slug: "just-chamomile",
    tastingLine: "Soft gold calm for slow, drifting thoughts.",
    videoTitle: "Thoughts & Memories — A Midjourney and Keyframe Journey Through the Inner World",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#0E0B07", "#2F2616", "#D8B46B"]
  },
  {
    teaName: "Sweetest Dream",
    slug: "sweetest-dream",
    tastingLine: "Lavender nights and a gentle falling sky.",
    videoTitle: "Flying With My Dreams - An AI Surreal Video",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#0C0B16", "#241F3D", "#9C8DD9"]
  },
  {
    teaName: "Wakey Wakey",
    slug: "wakey-wakey",
    tastingLine: "Bright citrus morning and a playful, color lift.",
    videoTitle: "AI Dance Video - I’m Living In Color",
    youtubeUrl: "",
    youtubeId: "",
    palette: ["#10110C", "#2D3420", "#C6D17A"]
  }
];

export const parseYouTubeId = (url: string): string => {
  if (!url) return "";
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/i
  );
  return match?.[1] ?? "";
};
