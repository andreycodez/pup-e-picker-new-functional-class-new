import { TNewDogObject, TPartialDogData } from './types.ts';

export const baseUrl = 'http://localhost:3000/dogs/';

const getAllDogs = () => {
  return fetch(baseUrl)
    .then((res: Response) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(`Could not fetch dogs. Reason: ${err}`);
    });
};

const postDog = (data: TNewDogObject) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(`Could not post a dog ${data}. Reason: ${err}`);
    });
};

const deleteDog = (id: number) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(`Could not delete a dog of id: ${id}. Reason: ${err}`);
    });
};

const updateDog = (id: number, data: TPartialDogData) => {
  return fetch(`${baseUrl}${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(
        `Could not update the dog with id: ${id}. Reason: ${err}`
      );
    });
};

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs,
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog,
  // should delete a dog from the database
  deleteDog,
  updateDog,
  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log('dummy stuff');
  },
};
