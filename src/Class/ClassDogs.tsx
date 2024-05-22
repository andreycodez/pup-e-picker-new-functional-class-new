import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { TDog, TCurrentViewType } from "../types.ts";

type TClassDogProps = {
  allDogs: TDog[] | null;
  currentView: TCurrentViewType;
  updateAction: (id: number, isFavorite: boolean) => Promise<void>;
  deleteAction: (id: number) => Promise<void>;
  isLoading: boolean;
  updateAppState: (
    prop: "allDogs" | "currentView" | "isLoading",
    val: TCurrentViewType | TDog[] | boolean,
  ) => void;
};

export class ClassDogs extends Component<TClassDogProps> {
  render() {
    const {
      allDogs,
      currentView,
      updateAction,
      deleteAction,
      isLoading,
      updateAppState,
    } = this.props;

    const favoritedDogs = allDogs?.filter((dog) => dog.isFavorite);
    const notFavoritedDogs = allDogs?.filter((dog) => !dog.isFavorite);

    let currentDogsList;

    if (currentView === "favorited") currentDogsList = favoritedDogs;
    else if (currentView === "notFavorited") currentDogsList = notFavoritedDogs;
    else if (currentView === "all") currentDogsList = allDogs;
    else currentDogsList = [];

    return (
      <>
        {currentDogsList?.map((dog: TDog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              updateAppState("isLoading", true);
              deleteAction(dog.id);
            }}
            onHeartClick={() => {
              updateAppState("isLoading", true);
              updateAction(dog.id, false);
            }}
            onEmptyHeartClick={() => {
              updateAppState("isLoading", true);
              updateAction(dog.id, true);
            }}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}
