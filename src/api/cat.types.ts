export type CatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type Breed = {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
};

export type CatDetails = CatImage & {
  breeds: Breed[];
};
