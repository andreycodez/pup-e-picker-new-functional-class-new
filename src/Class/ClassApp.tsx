import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { TDog, TCurrentViewType } from "../types.ts";
import { Requests } from "../api.tsx";

export type TClassAppStateObject = {
  allDogs: TDog[] | null;
  currentView: TCurrentViewType;
  isLoading: boolean;
};

export class ClassApp extends Component<
  Record<string, never>,
  TClassAppStateObject
> {
  state: TClassAppStateObject = {
    allDogs: null,
    currentView: "all",
    isLoading: false,
  };

  fetchDogs = async () => {
    return Requests.getAllDogs()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => this.stateUpdateHandler("isLoading", false));
  };

  componentDidMount() {
    this.fetchDogs().then((data) => this.setState({ allDogs: data }));
  }

  stateUpdateHandler = (
    key: "allDogs" | "currentView" | "isLoading",
    value: TCurrentViewType | TDog[] | boolean | null,
  ) => {
    this.setState({
      ...this.state,
      [key]:
        key === "currentView" && value === this.state.currentView
          ? "all"
          : value,
    });
  };

  addDog = (dogData: Omit<TDog, "id" | "isFavorite">) => {
    const dataToAdd = {
      ...dogData,
      isFavorite: false,
    };
    return Requests.postDog(dataToAdd).then(() =>
      this.fetchDogs().then((data) => this.setState({ allDogs: data })),
    );
  };

  updateFavoritedDogValue = (id: number, isFavorite: boolean) => {
    return Requests.updateDog(id, { isFavorite }).then(() =>
      this.fetchDogs().then((data) => this.setState({ allDogs: data })),
    );
  };

  deleteDog = (id: number) => {
    return Requests.deleteDog(id).then(() =>
      this.fetchDogs().then((data) => this.setState({ allDogs: data })),
    );
  };

  render() {
    const { allDogs, currentView, isLoading } = this.state;
    const dogCounters = {
      all: allDogs?.length || 0,
      favorited: allDogs?.filter((dog) => dog.isFavorite).length || 0,
      notFavorited: allDogs?.filter((dog) => !dog.isFavorite).length || 0,
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          viewToShow={currentView}
          dogCounters={{ ...dogCounters, "create-dog": null }}
          updateAppState={this.stateUpdateHandler}
        >
          {currentView !== "create-dog" && (
            <ClassDogs
              currentView={currentView}
              allDogs={allDogs}
              updateAction={this.updateFavoritedDogValue}
              deleteAction={this.deleteDog}
              isLoading={isLoading}
              updateAppState={this.stateUpdateHandler}
            />
          )}
          {currentView === "create-dog" && (
            <ClassCreateDogForm
              addDog={this.addDog}
              isLoading={isLoading}
              updateAppState={this.stateUpdateHandler}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
