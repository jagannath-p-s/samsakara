import aboutHeroImg from "@/assets/web/about-hero.jpg";
import aboutSecondaryImg from "@/assets/web/about-secondary.jpg";
import approachHeroImg from "@/assets/web/approach-hero.jpg";
import approachSecondaryImg from "@/assets/web/approach-secondary.jpg";
import homeHeroImg from "@/assets/web/home-hero.jpg";
import cookingImg from "@/assets/web/cooking.jpg";
import foodImg from "@/assets/web/food-dish.jpg";
import gardenImg from "@/assets/web/garden.jpg";
import keralaImg from "@/assets/web/kerala-landscape.jpg";
import mediterraneanImg from "@/assets/web/mediterranean.jpg";
import portraitHeroImg from "@/assets/web/portrait-hero.jpg";
import spicesImg from "@/assets/web/spices-market.jpg";

type PhotoMeta = {
  src: string;
  placeholder: string;
  aspect: string;
  objectPosition: string;
  captionKey: string;
};

function photo(
  src: string,
  meta: Omit<PhotoMeta, "src" | "placeholder">,
): PhotoMeta {
  return { src, placeholder: src, ...meta };
}

export const photos = {
  homeHero: photo(homeHeroImg, {
    aspect: "4 / 5",
    objectPosition: "50% 18%",
    captionKey: "homePortrait",
  }),
  aboutHero: photo(aboutHeroImg, {
    aspect: "4 / 5",
    objectPosition: "50% 22%",
    captionKey: "portrait",
  }),
  aboutSecondary: photo(aboutSecondaryImg, {
    aspect: "5 / 4",
    objectPosition: "55% center",
    captionKey: "aboutKitchen",
  }),
  approachHero: photo(approachHeroImg, {
    aspect: "5 / 4",
    objectPosition: "50% 35%",
    captionKey: "approachConsultation",
  }),
  approachSecondary: photo(approachSecondaryImg, {
    aspect: "5 / 4",
    objectPosition: "48% 40%",
    captionKey: "approachReading",
  }),
  portrait: photo(homeHeroImg, {
    aspect: "4 / 5",
    objectPosition: "50% 18%",
    captionKey: "portrait",
  }),
  mediterranean: photo(mediterraneanImg, {
    aspect: "1 / 1",
    objectPosition: "center 58%",
    captionKey: "mediterranean",
  }),
  cooking: photo(cookingImg, {
    aspect: "16 / 10",
    objectPosition: "55% center",
    captionKey: "cooking",
  }),
  samanthaLaptop: photo(cookingImg, {
    aspect: "16 / 10",
    objectPosition: "55% center",
    captionKey: "laptop",
  }),
  spices: photo(spicesImg, {
    aspect: "3 / 2",
    objectPosition: "center 42%",
    captionKey: "spices",
  }),
  kerala: photo(keralaImg, {
    aspect: "3 / 2",
    objectPosition: "68% center",
    captionKey: "kerala",
  }),
  food: photo(foodImg, {
    aspect: "4 / 3",
    objectPosition: "center 48%",
    captionKey: "food",
  }),
  garden: photo(gardenImg, {
    aspect: "4 / 5",
    objectPosition: "center 32%",
    captionKey: "garden",
  }),
  portraitAlt: photo(portraitHeroImg, {
    aspect: "1 / 1",
    objectPosition: "center center",
    captionKey: "portrait",
  }),
} as const satisfies Record<string, PhotoMeta>;

export type PhotoKey = keyof typeof photos;
