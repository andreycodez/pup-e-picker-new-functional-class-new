import { DogCard } from "../Shared/DogCard";
import { TDog, TDogList, TActionCallback } from "../types";
import { useState } from "react";

type FunctionalDogsProps = {
  dogsList: TDogList[keyof TDogList];
  deleteAction: TActionCallback;
  updateDogAction: TActionCallback;
};

export const FunctionalDogs = ({
  dogsList,
  deleteAction,
  updateDogAction,
}: FunctionalDogsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAction = (
    cb: TActionCallback,
    id: number,
    isFavorite?: boolean,
  ) => {
    setIsLoading(true);
    cb(id, !!isFavorite).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <>
      {dogsList?.map((dog: TDog) => {
        return (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              handleAction(deleteAction, dog.id);
            }}
            onHeartClick={() => {
              handleAction(updateDogAction, dog.id, false);
            }}
            onEmptyHeartClick={() => {
              handleAction(updateDogAction, dog.id, true);
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
