import { dogPictures } from "../dog-pictures";
import { INITIAL_REQUIRED_DOG_DATA } from "../constants.ts";
import { TNewDogObject } from "../types.ts";
import { ChangeEvent, useState } from "react";

// use this as your default selected image
type CreateDogFormProps = {
  addSingleDog: (dogData: TNewDogObject) => Promise<void>;
};

export const FunctionalCreateDogForm = ({
  addSingleDog,
}: CreateDogFormProps) => {
  const [dogData, setDogData] = useState<TNewDogObject>(
    INITIAL_REQUIRED_DOG_DATA,
  );
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const updateDogDataState = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setDogData({
      ...dogData,
      [name]: value,
    });
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        setIsFormDisabled(true);
        e.preventDefault();
        addSingleDog(dogData).then(() => {
          setDogData(INITIAL_REQUIRED_DOG_DATA);
          setIsFormDisabled(false);
        });
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        name="name"
        value={dogData.name}
        onChange={updateDogDataState}
        disabled={isFormDisabled}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id=""
        cols={80}
        rows={10}
        disabled={isFormDisabled}
        value={dogData.description}
        onChange={updateDogDataState}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        name="image"
        id=""
        value={dogData.image}
        disabled={isFormDisabled}
        onChange={updateDogDataState}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isFormDisabled} />
    </form>
  );
};
