import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useEffect, useState } from "react";
import { TCurrentViewType, TDog, TNewDogObject } from "../types.ts";
import { Requests } from "../api.tsx";
import { getDogsListNumbers } from "../utils.ts";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<TDog[] | null>(null);
  const [currentView, setCurrentView] = useState<TCurrentViewType>("all");

  const favDogs = allDogs?.filter((dog: TDog) => dog.isFavorite);
  const notFavDogs = allDogs?.filter((dog: TDog) => !dog.isFavorite);
  const dogsList = {
    all: allDogs,
    favorited: favDogs,
    notFavorited: notFavDogs,
  };

  const fetchDogs = () => {
    Requests.getAllDogs()
      .then(setAllDogs)
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const updateView = (viewName: TCurrentViewType) => {
    const newViewValue =
      viewName === currentView && viewName !== "create-dog" ? "all" : viewName;
    setCurrentView(newViewValue);
  };

  const addDog = async (dogData: TNewDogObject) => {
    return Requests.postDog(dogData).then(fetchDogs);
  };

  const deleteDog = async (dogId: number) => {
    return Requests.deleteDog(dogId).then(fetchDogs);
  };

  const updateFavoriteDog = (id: number, isFavorite: boolean) => {
    return Requests.updateDog(id, { isFavorite }).then(fetchDogs);
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        viewToShow={currentView}
        elementsNumber={getDogsListNumbers(dogsList)}
        setCurrentView={updateView}
      >
        <>
          {currentView !== "create-dog" && (
            <FunctionalDogs
              dogsList={dogsList[currentView]}
              deleteAction={deleteDog}
              updateDogAction={updateFavoriteDog}
            />
          )}
          {currentView === "create-dog" && (
            <FunctionalCreateDogForm addSingleDog={addDog} />
          )}
        </>
      </FunctionalSection>
    </div>
  );
}
