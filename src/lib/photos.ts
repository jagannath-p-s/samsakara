// Centralised image sources served from /public/images.
const image = (filename: string) => `/images/${filename}`;

const pexels = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const photos = {
  portrait: { src: image("samantha-portrait.jpg"), placeholder: image("samantha-portrait.jpg") },
  kerala: { src: image("kerala.jpg"), placeholder: image("kerala.jpg") },
  spices: { src: image("spices.jpg"), placeholder: image("spices.jpg") },
  food: { src: image("food.jpg"), placeholder: image("food.jpg") },
  cooking: { src: image("cooking.jpg"), placeholder: image("cooking.jpg") },
  mediterranean: { src: pexels(32531680), placeholder: pexels(32531680, 24) },
  garden: { src: pexels(37733802), placeholder: pexels(37733802, 24) },
} as const;

export type PhotoKey = keyof typeof photos;
