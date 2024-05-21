// Add your own custom types in here

export type TDog = {
  id: number;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
};

export type TDogList = {
  all: TDog[] | null;
  favorited: TDog[] | undefined;
  notFavorited: TDog[] | undefined;
};

export type TDogListObject = {
  [key: string]: TDog[] | undefined | null;
};

export type TDogListNumbers = {
  [key: keyof TDogListObject]: number;
};

export type TCurrentViewType = keyof TDogList | "create-dog";

export type TNewDogObject = Omit<TDog, "id">;

export type TNewDogData = Omit<TNewDogObject, "isFavorite">;

export type TDogFormState = TNewDogData & { isFormDisabled: boolean };

export type TPartialDogData = Partial<TNewDogObject>;

export type TActionCallback =
  | ((id: number) => Promise<void>)
  | ((id: number, isFavorite: boolean) => Promise<void>);
