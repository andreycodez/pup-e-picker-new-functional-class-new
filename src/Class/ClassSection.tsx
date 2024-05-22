// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { TCurrentViewType, TDog } from "../types.ts";

type TClassSectionProps = {
  dogCounters: Record<TCurrentViewType, number | null> | null;
  viewToShow: TCurrentViewType;
  updateAppState: (
    prop: "allDogs" | "currentView" | "isLoading",
    value: TDog[] | TCurrentViewType | boolean | null,
  ) => void;
  children: ReactNode;
};

export class ClassSection extends Component<TClassSectionProps> {
  render() {
    const { viewToShow, dogCounters, updateAppState } = this.props;
    const favDogCounter = dogCounters?.favorited;
    const notFavDogCounter = dogCounters?.notFavorited;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            <div
              className={`selector ${viewToShow === "favorited" && "active"}`}
              onClick={() => {
                updateAppState("currentView", "favorited");
              }}
            >
              favorited {`( ${favDogCounter} )`}
            </div>
            <div
              className={`selector ${
                viewToShow === "notFavorited" && "active"
              }`}
              onClick={() => {
                updateAppState("currentView", "notFavorited");
              }}
            >
              notFavorited {`( ${notFavDogCounter} )`}
            </div>
            <div
              className={`selector ${viewToShow === "create-dog" && "active"}`}
              onClick={() => {
                updateAppState("currentView", "create-dog");
              }}
            >
              create-dog
            </div>
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
