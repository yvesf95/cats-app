import axios from "axios";

export type Breed = {
  id: string;
  name: string;
};

export type CatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type GetCatsByBreedOptions = {
  imageSize?: ImageSize;
  limit?: number;
  page?: number;
};

export type ImageSize = "small" | "med" | "full";

const BASE_URL = "https://api.thecatapi.com";

async function getBreeds() {
  const url = `${BASE_URL}/v1/breeds`;
  const { data } = await axios.get<Breed[]>(url);
  return data;
}

async function getCatsByBreed(breed: string, options?: GetCatsByBreedOptions) {
  const url = `${BASE_URL}/v1/images/search`;
  const params = {
    breed_ids: breed,
    size: options?.imageSize || "small",
    limit: options?.limit || 10,
    page: options?.page || 0,
    order: "ASC",
  };
  const { data } = await axios.get<CatImage[]>(url, { params });
  return data;
}

const CatsClient = {
  getBreeds,
  getCatsByBreed: getCatsByBreed,
};

export default CatsClient;
