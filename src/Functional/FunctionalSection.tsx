// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TCurrentViewType, TDogListNumbers } from "../types.ts";

type TFunctionalSectionProps = {
  viewToShow: TCurrentViewType;
  elementsNumber: TDogListNumbers | null;
  setCurrentView: (name: TCurrentViewType) => void;
  children: ReactNode;
};

export const FunctionalSection = ({
  viewToShow,
  elementsNumber,
  setCurrentView,
  children,
}: TFunctionalSectionProps) => {
  const sections = Object.keys({
    ...elementsNumber,
    "create-dog": null,
  }) as TCurrentViewType[];

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {sections.map((section) => {
            if (section !== "all") {
              return (
                <div
                  key={section}
                  className={`selector ${viewToShow === section && "active"}`}
                  onClick={() => {
                    setCurrentView(section);
                  }}
                >
                  {section}{" "}
                  {elementsNumber && elementsNumber[section] && (
                    <>{elementsNumber[section]}</>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
