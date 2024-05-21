import { dogPictures } from "./dog-pictures.ts";
import { TDogFormState, TNewDogObject } from "./types.ts";

const defaultSelectedImage: string = dogPictures.BlueHeeler;

export const INITIAL_REQUIRED_DOG_DATA: TNewDogObject = {
  name: "",
  image: defaultSelectedImage,
  description: "",
  isFavorite: false,
};

export const INITIAL_DOG_FORM_STATE: TDogFormState = {
  name: "",
  description: "",
  image: defaultSelectedImage,
  isFormDisabled: false,
};
