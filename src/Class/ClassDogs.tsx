import { DogCard } from '../Shared/DogCard';
import { Component } from 'react';
import { TDogList, TDog } from '../types.ts';

type TClassDogProps = {
  dogsList: TDogList[keyof TDogList];
  actions: {
    doUpdate: (id: number, isFavorite: boolean) => Promise<void>;
    doDelete: (id: number) => Promise<void>;
  };
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<TClassDogProps> {
  state = {
    isLoading: false,
  };

  handleAction = (
    cb:
      | ((id: number) => Promise<void>)
      | ((id: number, isFavorite: boolean) => Promise<void>),
    id: number,
    isFavorite?: boolean
  ) => {
    this.setState({ isLoading: true });
    cb(id, !!isFavorite).then(() => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const {
      dogsList,
      actions: { doUpdate, doDelete },
    } = this.props;
    return (
      <>
        {dogsList?.map((dog: TDog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              this.handleAction(doDelete, dog.id);
            }}
            onHeartClick={() => {
              this.handleAction(doUpdate, dog.id, false);
            }}
            onEmptyHeartClick={() => {
              this.handleAction(doUpdate, dog.id, true);
            }}
            isLoading={this.state.isLoading}
          />
        ))}
      </>
    );
  }
}
