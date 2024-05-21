import { Component, FormEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { TNewDogData, TNewDogObject } from "../types.ts";
import { INITIAL_DOG_FORM_STATE } from "../constants.ts";
import toast from "react-hot-toast";

type TClassCreateDogFormProps = {
  addDog: (dogData: TNewDogData) => Promise<void>;
};

export type TClassCreateDogState = Omit<TNewDogObject, "isFavorite"> & {
  isFormDisabled: boolean;
};

export class ClassCreateDogForm extends Component<
  TClassCreateDogFormProps,
  TClassCreateDogState
> {
  state = INITIAL_DOG_FORM_STATE;

  handleStateUpdate = (name: string, value: string) => {
    this.setState({
      ...this.state,
      [`${name}`]: value,
    });
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.setState({ isFormDisabled: true });
    this.props.addDog(this.state).then(() => {
      this.setState(INITIAL_DOG_FORM_STATE);
      toast.success("The dog was created!");
    });
  };

  render() {
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
          disabled={this.state.isFormDisabled}
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
          disabled={this.state.isFormDisabled}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          name="image"
          value={this.state.image}
          onChange={(e) =>
            this.handleStateUpdate(e.target.name, e.target.value)
          }
          disabled={this.state.isFormDisabled}
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
          disabled={this.state.isFormDisabled}
        />
      </form>
    );
  }
}
