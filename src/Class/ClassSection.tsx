// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { TClassAppStateObject } from "./ClassApp.tsx";
import { TCurrentViewType, TDogListNumbers } from "../types.ts";

type TClassSectionProps = {
  viewToShow: TCurrentViewType;
  elementsNumber: TDogListNumbers | null;
  setCurrentView: (
    stateProp: keyof TClassAppStateObject,
    statePropValue: TClassAppStateObject[keyof TClassAppStateObject],
  ) => void;
  children: ReactNode;
};

export class ClassSection extends Component<TClassSectionProps> {
  render() {
    const { viewToShow, elementsNumber, setCurrentView } = this.props;

    const sections = Object.keys({ ...elementsNumber, "create-dog": null });

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {sections.map((sectionItem) => {
              if (sectionItem !== "all") {
                return (
                  <div
                    key={sectionItem}
                    className={`selector ${
                      viewToShow === sectionItem && "active"
                    }`}
                    onClick={() => {
                      setCurrentView(
                        "currentView",
                        sectionItem as TCurrentViewType,
                      );
                    }}
                  >
                    {sectionItem}{" "}
                    {(elementsNumber &&
                      elementsNumber[sectionItem] &&
                      `( ${elementsNumber[sectionItem]} )`) ??
                      ""}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
