import { Component, FormEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { INITIAL_REQUIRED_DOG_DATA } from "../constants.ts";
import toast from "react-hot-toast";
import { TCurrentViewType, TDog } from "../types.ts";

type TClassCreateDogFormProps = {
  addDog: (dogData: Omit<TDog, "id" | "isFavorite">) => Promise<void>;
  isLoading: boolean;
  updateAppState: (
    prop: "allDogs" | "currentView" | "isLoading",
    val: TCurrentViewType | TDog[] | boolean,
  ) => void;
};

export type TClassCreateDogState = Omit<TDog, "id" | "isFavorite">;

export class ClassCreateDogForm extends Component<
  TClassCreateDogFormProps,
  TClassCreateDogState
> {
  state = INITIAL_REQUIRED_DOG_DATA;

  handleStateUpdate = (name: string, value: string) => {
    this.setState({
      ...this.state,
      [`${name}`]: value,
    });
  };

  isFormReadyForSubmission = () => {
    const { name, image, description } = this.state;
    return name.length > 0 && description.length > 0 && image.length > 0;
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.updateAppState("isLoading", true);
    const newDogData = {
      name: this.state.name,
      image: this.state.image,
      description: this.state.description,
      isFavorite: false,
    };
    this.props.addDog(newDogData).then(() => {
      this.setState(INITIAL_REQUIRED_DOG_DATA);
      toast.success("The dog was created!");
    });
  };

  render() {
    const { isLoading } = this.props;
    console.log(this.isFormReadyForSubmission());
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          name="name"
          value={this.state.name}
          type="text"
          onChange={(e) =>
            this.handleStateUpdate(e.target.name, e.target.value)
          }
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          value={this.state.description}
          id="dog_description"
          cols={80}
          rows={10}
          onChange={(e) =>
            this.handleStateUpdate(e.target.name, e.target.value)
          }
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          name="image"
          value={this.state.image}
          onChange={(e) =>
            this.handleStateUpdate(e.target.name, e.target.value)
          }
          disabled={isLoading}
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
          value="submit"
          disabled={isLoading || !this.isFormReadyForSubmission()}
        />
      </form>
    );
  }
}
