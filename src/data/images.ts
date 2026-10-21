import type { ImageMetadata } from "astro";
import jagoHero from "../assets/projects/jagoasn-screenshot.jpg";
import jago1 from "../assets/projects/jagoasn-1.jpg";
import jago2 from "../assets/projects/jagoasn-2.jpg";
import jago3 from "../assets/projects/jagoasn-3.jpg";
import jago4 from "../assets/projects/jagoasn-4.jpg";
import commandHero from "../assets/projects/chrommandr-screenshot.jpg";
import command1 from "../assets/projects/chrommandr-1.jpg";
import simrsHero from "../assets/projects/simrs-screenshot.jpg";
import simrs1 from "../assets/projects/simrs-1.jpg";
import simrs2 from "../assets/projects/simrs-2.jpg";
export type GalleryImage = {
  image: ImageMetadata;
  alt: string;
  caption: string;
};
export type ProjectImages = { hero: ImageMetadata; gallery: GalleryImage[] };
export const projectImages: Record<string, ProjectImages> = {
  jagoasn: {
    hero: jagoHero,
    gallery: [
      {
        image: jago1,
        alt: "JagoASN learning dashboard with try-out and study menus",
        caption:
          "A learning dashboard connects practice tests, results, and progress.",
      },
      {
        image: jago2,
        alt: "JagoASN subscription comparison",
        caption: "Subscription plans present the available study packages.",
      },
      {
        image: jago3,
        alt: "JagoASN timed question interface and question navigation",
        caption:
          "A timed practice exam keeps the question and test navigation together.",
      },
      {
        image: jago4,
        alt: "JagoASN exam answer review",
        caption: "Answer review supports the next round of preparation.",
      },
    ],
  },
  chrommandr: {
    hero: commandHero,
    gallery: [
      {
        image: command1,
        alt: "Chrommandr search field with an Open New Tab action",
        caption:
          "A focused command palette provides a direct route to browser actions. Browser chrome and desktop UI are cropped from the source.",
      },
    ],
  },
  simrs: {
    hero: simrsHero,
    gallery: [
      {
        image: simrs1,
        alt: "SimRS registration filters and column controls, with patient records excluded",
        caption:
          "Registration filtering and configurable columns. Patient rows are excluded from this published image.",
      },
      {
        image: simrs2,
        alt: "SimRS hospital dashboard and registration trends, with patient activity excluded",
        caption:
          "Operational summaries and registration trends. The activity feed is excluded to protect patient information.",
      },
    ],
  },
};
