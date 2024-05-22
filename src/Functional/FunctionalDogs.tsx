import { DogCard } from "../Shared/DogCard";
import { TDog, TCurrentViewType } from "../types";
import { Dispatch, SetStateAction } from "react";

type FunctionalDogsProps = {
  currentView: TCurrentViewType;
  allDogs: TDog[] | null;
  deleteDogAction: (id: number) => void;
  updateDogAction: (id: number, isFavorite: boolean) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const FunctionalDogs = ({
  currentView,
  allDogs,
  deleteDogAction,
  updateDogAction,
  isLoading,
  setIsLoading,
}: FunctionalDogsProps) => {
  const favoritedDogs = allDogs?.filter((dog) => dog.isFavorite);
  const notFavoritedDogs = allDogs?.filter((dog) => !dog.isFavorite);

  let currentDogsList;

  if (currentView === "favorited") currentDogsList = favoritedDogs;
  else if (currentView === "notFavorited") currentDogsList = notFavoritedDogs;
  else if (currentView === "all") currentDogsList = allDogs;
  else currentDogsList = [];

  return (
    <>
      {currentDogsList?.map((dog: TDog) => {
        return (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              setIsLoading(true);
              deleteDogAction(dog.id);
            }}
            onHeartClick={() => {
              setIsLoading(true);
              updateDogAction(dog.id, false);
            }}
            onEmptyHeartClick={() => {
              setIsLoading(true);
              updateDogAction(dog.id, true);
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
