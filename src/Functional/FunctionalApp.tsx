import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useEffect, useState } from "react";
import { TCurrentViewType, TDog } from "../types.ts";
import { Requests } from "../api.tsx";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<TDog[] | null>(null);
  const [currentView, setCurrentView] = useState<TCurrentViewType>("all");
  const [isLoading, setIsLoading] = useState(false);

  const dogCounters = {
    all: allDogs?.length || 0,
    favorited: allDogs?.filter((dog: TDog) => dog.isFavorite).length || 0,
    notFavorited: allDogs?.filter((dog: TDog) => !dog.isFavorite).length || 0,
  };

  const fetchDogs = () => {
    Requests.getAllDogs()
      .then(setAllDogs)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const updateView = (viewName: TCurrentViewType) => {
    const newViewValue =
      viewName === currentView && viewName !== "create-dog" ? "all" : viewName;
    setCurrentView(newViewValue);
  };

  const addDog = async (dogData: Omit<TDog, "id">) => {
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
        dogCounters={{ ...dogCounters, "create-dog": null }}
        setCurrentView={updateView}
      >
        <>
          {currentView !== "create-dog" && (
            <FunctionalDogs
              currentView={currentView}
              allDogs={allDogs}
              deleteDogAction={deleteDog}
              updateDogAction={updateFavoriteDog}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {currentView === "create-dog" && (
            <FunctionalCreateDogForm
              addSingleDog={addDog}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </>
      </FunctionalSection>
    </div>
  );
}
