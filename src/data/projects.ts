import { Project } from "@/components/ProjectCard";

// Create an array of gradient background colors for projects that don't have images
const gradientBackgrounds = [
  "linear-gradient(90deg, hsla(29, 92%, 70%, 1) 0%, hsla(0, 87%, 73%, 1) 100%)",
  "linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)",
  "linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)",
  "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)",
  "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)",
  "linear-gradient(90deg, hsla(59, 86%, 68%, 1) 0%, hsla(134, 36%, 53%, 1) 100%)",
  "linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)",
  "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)",
  "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
  "linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
];

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "WavePulse",
    description: "A smooth animation library for creating wave-like effects in your UI elements",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop",
    category: "UI Library",
    url: "https://github.com",
    likes: 245,
  },
  {
    id: "2",
    title: "GradientFlow",
    description: "Create stunning gradient backgrounds that smoothly animate and respond to user interaction",
    imageUrl: "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=1470&auto=format&fit=crop",
    category: "CSS Framework",
    url: "https://github.com",
    likes: 187,
  },
  {
    id: "3",
    title: "NeonShadow",
    description: "Add neon glow effects to your UI components with this tiny JavaScript library",
    imageUrl: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=1478&auto=format&fit=crop",
    category: "UI Effects",
    url: "https://github.com",
    likes: 320,
  },
  {
    id: "4",
    title: "PixelDrift",
    description: "A pixel-art animation framework for creating retro game interfaces",
    imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1506&auto=format&fit=crop",
    category: "Animation",
    url: "https://github.com",
    likes: 156,
  },
  {
    id: "5",
    title: "CyberUI",
    description: "A cyberpunk-inspired UI toolkit with glitchy animations and futuristic components",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1420&auto=format&fit=crop",
    category: "UI Framework",
    url: "https://github.com",
    likes: 275,
  },
  {
    id: "6",
    title: "MorphShift",
    description: "Create smooth shape-shifting transitions between UI states with this lightweight library",
    imageUrl: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1527&auto=format&fit=crop",
    category: "Animation",
    url: "https://github.com",
    likes: 198,
  },
  {
    id: "7",
    title: "VibeKit",
    description: "A complete design system with mood-based component variants and theme generation",
    imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1470&auto=format&fit=crop",
    category: "Design System",
    url: "https://github.com",
    likes: 340,
  },
  {
    id: "8",
    title: "NeuVerse",
    description: "A neumorphic design system with soft shadows and minimal color palette",
    imageUrl: "https://images.unsplash.com/photo-1624696941338-dcf3b6acbec6?q=80&w=1470&auto=format&fit=crop",
    category: "UI Kit",
    url: "https://github.com",
    likes: 223,
  },
  {
    id: "9",
    title: "QuantumBox",
    description: "A physics-based animation library for creating realistic motion in UI elements",
    imageUrl: "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=1470&auto=format&fit=crop",
    category: "Animation",
    url: "https://github.com",
    likes: 289,
  },
  {
    id: "10",
    title: "EchoRipple",
    description: "Create interactive ripple effects that respond to audio input or music playback",
    imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1528&auto=format&fit=crop",
    category: "Audio Visualization",
    url: "https://github.com",
    likes: 210,
  },
  {
    id: "11",
    title: "MindfulUI",
    description: "A calm, accessible design system focused on reducing cognitive load and visual noise",
    imageUrl: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=1470&auto=format&fit=crop",
    category: "Accessibility",
    url: "https://github.com",
    likes: 176,
  },
  {
    id: "12",
    title: "RetroWave",
    description: "80s and 90s inspired UI components with vaporwave aesthetics and glitch effects",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
    category: "UI Kit",
    url: "https://github.com",
    likes: 302,
  },
];

// Add the uploaded image to our first project
mockProjects[0].imageUrl = "/lovable-uploads/f831692d-2db1-49c6-9613-beae528f4107.png";

// For any projects that might have broken image links, use gradient backgrounds
export const getProjectWithFallback = (project: Project): Project => {
  const index = parseInt(project.id, 10) % gradientBackgrounds.length;
  const fallbackStyle = gradientBackgrounds[index];
  
  return {
    ...project,
    // Keep the imageUrl, but we'll handle fallbacks in the component
    fallbackBackground: fallbackStyle
  } as Project;
};
