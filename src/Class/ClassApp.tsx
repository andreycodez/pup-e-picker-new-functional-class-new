import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import {
  TDog,
  TCurrentViewType,
  TNewDogObject,
  TDogList,
  TNewDogData,
} from "../types.ts";
import { Requests } from "../api.tsx";
import { getDogsListNumbers } from "../utils.ts";

export type TClassAppStateObject = {
  allDogs: TDog[] | null;
  currentView: TCurrentViewType;
};

export class ClassApp extends Component<
  Record<string, never>,
  TClassAppStateObject
> {
  state: TClassAppStateObject = {
    allDogs: null,
    currentView: "all",
  };

  fetchDogs = () => {
    return Requests.getAllDogs()
      .then((data) => this.stateUpdateHandler("allDogs", data))
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchDogs();
  }

  stateUpdateHandler = (
    key: keyof typeof this.state,
    value: TCurrentViewType | TDog[] | null,
  ) => {
    this.setState({
      ...this.state,
      [key]:
        key === "currentView" && value === this.state.currentView
          ? "all"
          : value,
    });
  };

  addDog = (dogData: TNewDogData) => {
    const dataToAdd: TNewDogObject = {
      ...dogData,
      isFavorite: false,
    };
    return Requests.postDog(dataToAdd).then(() => this.fetchDogs());
  };

  updateFavoritedDogValue = (id: number, isFavorite: boolean) => {
    return Requests.updateDog(id, { isFavorite }).then(() => this.fetchDogs());
  };

  deleteDog = (id: number) => {
    return Requests.deleteDog(id).then(() => this.fetchDogs());
  };

  render() {
    const { allDogs, currentView } = this.state;
    const favorited = allDogs?.filter((dog) => dog.isFavorite);
    const notFavorited = allDogs?.filter((dog) => !dog.isFavorite);

    const dogsList: TDogList = {
      all: allDogs,
      favorited: favorited,
      notFavorited: notFavorited,
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          viewToShow={currentView}
          elementsNumber={getDogsListNumbers(dogsList)}
          setCurrentView={this.stateUpdateHandler}
        >
          {currentView !== "create-dog" && (
            <ClassDogs
              dogsList={dogsList[currentView]}
              actions={{
                doUpdate: this.updateFavoritedDogValue,
                doDelete: this.deleteDog,
              }}
            />
          )}
          {currentView === "create-dog" && (
            <ClassCreateDogForm addDog={this.addDog} />
          )}
        </ClassSection>
      </div>
    );
  }
}
