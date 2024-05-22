import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TCurrentViewType } from "../types.ts";

type TFunctionalSectionProps = {
  viewToShow: TCurrentViewType;
  dogCounters: Record<TCurrentViewType, number | null> | null;
  setCurrentView: (name: TCurrentViewType) => void;
  children: ReactNode;
};

export const FunctionalSection = ({
  viewToShow,
  dogCounters,
  setCurrentView,
  children,
}: TFunctionalSectionProps) => {
  const favDogsCounter = dogCounters?.favorited;
  const notFavDogsCounter = dogCounters?.notFavorited;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <div
            className={`selector ${viewToShow === "favorited" && "active"}`}
            onClick={() => {
              setCurrentView("favorited");
            }}
          >
            favorited {` (${favDogsCounter})`}
          </div>
          <div
            className={`selector ${viewToShow === "notFavorited" && "active"}`}
            onClick={() => {
              setCurrentView("notFavorited");
            }}
          >
            not favorited {` (${notFavDogsCounter})`}
          </div>
          <div
            className={`selector ${viewToShow === "create-dog" && "active"}`}
            onClick={() => {
              setCurrentView("create-dog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
