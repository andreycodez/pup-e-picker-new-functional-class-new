import { TDogListObject, TDogListNumbers } from "./types.ts";

export const getDogsListNumbers = (obj: TDogListObject) => {
  return Object.entries(obj).reduce(
    (acc: TDogListNumbers | null, [key, value]) => {
      if (value) {
        return { ...acc, [`${key}`]: value.length };
      } else return acc;
    },
    {},
  );
};
