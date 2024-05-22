import { dogPictures } from "../dog-pictures";
import { INITIAL_REQUIRED_DOG_DATA } from "../constants.ts";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { TDog } from "../types.ts";

// use this as your default selected image

type CreateDogFormProps = {
  addSingleDog: (dogData: Omit<TDog, "id">) => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const FunctionalCreateDogForm = ({
  addSingleDog,
  isLoading,
  setIsLoading,
}: CreateDogFormProps) => {
  const [dogData, setDogData] = useState<Omit<TDog, "id" | "isFavorite">>(
    INITIAL_REQUIRED_DOG_DATA,
  );

  const isFormReadyForSubmission = () => {
    return (
      dogData.name.length > 0 &&
      dogData.description.length > 0 &&
      dogData.image.length > 0
    );
  };

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
        setIsLoading(true);
        e.preventDefault();
        addSingleDog({ ...dogData, isFavorite: false }).then(() => {
          setDogData(INITIAL_REQUIRED_DOG_DATA);
          setIsLoading(false);
          toast.success("The dog was created!");
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
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        value={dogData.description}
        onChange={updateDogDataState}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        name="image"
        id=""
        value={dogData.image}
        disabled={isLoading}
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
      <input
        type="submit"
        disabled={isLoading || !isFormReadyForSubmission()}
      />
    </form>
  );
};
