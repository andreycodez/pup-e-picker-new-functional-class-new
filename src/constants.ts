import { dogPictures } from "./dog-pictures.ts";

const defaultSelectedImage: string = dogPictures.BlueHeeler;

export const INITIAL_REQUIRED_DOG_DATA = {
  name: "",
  image: defaultSelectedImage,
  description: "",
};
