export type FoodShot = {
  src: string;
  alt: string;
};

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export const FALLBACK_IMAGE = asset("/images/food/AAD00844.jpg");

export const heroImage: FoodShot = {
  src: asset("/images/food/AAD00844.jpg"),
  alt: "Namma Dabba tiffin with dal, jeera rice, layered paratha, papad, pickle and salad",
};

export const heroStackImage: FoodShot = {
  src: asset("/images/food/AAD00810.jpg"),
  alt: "Namma Dabba tiffin with dal, jeera rice, fried dumplings, papad and salad",
};

export const aboutImage: FoodShot = {
  src: asset("/images/food/AAD00820.jpg"),
  alt: "Namma Dabba tiffin with puris, pea rice, dal, sabzi, raita and salad",
};

export const occasionImage: FoodShot = {
  src: asset("/images/food/AAD00864.jpg"),
  alt: "A table of Namma Dabba tiffin boxes prepared for a larger gathering",
};

export type ServiceCard = {
  title: string;
  copy: string;
  image: string;
  alt: string;
  enquiry: string;
  tone: "red" | "yellow";
};

export const services: ServiceCard[] = [
  {
    title: "Daily Tiffin",
    copy: "Everyday meals that bring a little taste of home to your busy routine.",
    image: asset("/images/food/AAD00805.jpg"),
    alt: "Everyday Namma Dabba tiffin with roti, yellow dal and a small salad",
    enquiry: "I'd like to enquire about daily tiffin.",
    tone: "red",
  },
  {
    title: "Lunch & Dinner",
    copy: "Enjoy comforting North Indian food whenever hunger calls.",
    image: asset("/images/food/AAD00828.jpg"),
    alt: "Namma Dabba lunch tiffin with dal, curry, jeera rice, roti, papad and salad",
    enquiry: "I'd like to enquire about lunch and dinner.",
    tone: "yellow",
  },
  {
    title: "Office Meals",
    copy: "Make office lunches more delicious with convenient meal options.",
    image: asset("/images/food/AAD00824.jpg"),
    alt: "Namma Dabba office-style tiffin with paratha, dal, curd, rice, papad and salad",
    enquiry: "I'd like to enquire about office meals.",
    tone: "red",
  },
  {
    title: "Bulk & Party Orders",
    copy: "Good food for celebrations, gatherings and special occasions.",
    image: asset("/images/food/AAD00857.jpg"),
    alt: "Several Namma Dabba tiffin boxes arranged together for a group order",
    enquiry: "I'd like to enquire about a bulk or party order.",
    tone: "yellow",
  },
];

export const galleryImages: FoodShot[] = [
  {
    src: asset("/images/food/AAD00857.jpg"),
    alt: "A spread of Namma Dabba tiffin boxes filled with home-style North Indian food",
  },
  {
    src: asset("/images/food/AAD00861.jpg"),
    alt: "Multiple Namma Dabba tiffins laid out for a shared meal",
  },
  {
    src: asset("/images/food/AAD00814.jpg"),
    alt: "Namma Dabba tiffin with dal, dumplings, jeera rice, roti, papad and salad",
  },
  {
    src: asset("/images/food/AAD00836.jpg"),
    alt: "Namma Dabba tiffin with dal, greens, jeera rice, pickle and salad",
  },
  {
    src: asset("/images/food/AAD00812.jpg"),
    alt: "Namma Dabba tiffin with dal, dumplings, jeera rice, papad and salad",
  },
  {
    src: asset("/images/food/AAD00816.jpg"),
    alt: "Homemade North Indian tiffin from Namma Dabba",
  },
  {
    src: asset("/images/food/AAD00821.jpg"),
    alt: "Homemade North Indian tiffin from Namma Dabba",
  },
  {
    src: asset("/images/food/AAD00827.jpg"),
    alt: "Homemade North Indian tiffin from Namma Dabba",
  },
  {
    src: asset("/images/food/AAD00833.jpg"),
    alt: "Close view of a Namma Dabba tiffin with roti, jeera rice, dal and paneer curry",
  },
  {
    src: asset("/images/food/AAD00840.jpg"),
    alt: "Homemade North Indian tiffin from Namma Dabba",
  },
  {
    src: asset("/images/food/AAD00845.jpg"),
    alt: "Homemade North Indian tiffin from Namma Dabba",
  },
  {
    src: asset("/images/food/AAD00848.jpg"),
    alt: "Namma Dabba tiffin with paratha, dal, jeera rice, sabzi, curd and pickle",
  },
  {
    src: asset("/images/food/AAD00851.jpg"),
    alt: "Homemade North Indian tiffin from Namma Dabba",
  },
  {
    src: asset("/images/food/AAD00858.jpg"),
    alt: "Rows of packed Namma Dabba tiffins with roti, puri, rice and dal",
  },
  {
    src: asset("/images/food/AAD00862.jpg"),
    alt: "Namma Dabba tiffin boxes prepared together",
  },
  {
    src: asset("/images/food/AAD00865.jpg"),
    alt: "Namma Dabba tiffin boxes prepared together",
  },
];

export type FoodVideo = {
  src: string;
  poster: string;
  title: string;
  alt: string;
};

export const foodVideos: FoodVideo[] = [
  {
    src: asset("/videos/00000-mts-to-mp4.mp4"),
    poster: asset("/images/food/posters/00000-mts-to-mp4.jpg"),
    title: "Dabbas at the counter",
    alt: "Empty compartment dabbas lined up on a service counter",
  },
  {
    src: asset("/videos/00006-mts-to-mp4.mp4"),
    poster: asset("/images/food/posters/00006-mts-to-mp4.jpg"),
    title: "Sabzi, up close",
    alt: "Close view of a yellow sabzi with herbs, cucumber and lime in a dabba",
  },
  {
    src: asset("/videos/00005-mts-to-mp4.mp4"),
    poster: asset("/images/food/posters/00005-mts-to-mp4.jpg"),
    title: "Packing a tiffin",
    alt: "Gloved hands placing a roti into a compartment tiffin",
  },
  {
    src: asset("/videos/00021-mts-to-mp4.mp4"),
    poster: asset("/images/food/posters/00021-mts-to-mp4.jpg"),
    title: "In the kitchen",
    alt: "Kitchen team portioning food into dabbas",
  },
];
