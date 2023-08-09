import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import CatsClient from "./api/cats-client";
import CatCard from "./components/CatCard";

const limit = 10;

function App() {
  const [breed, setBreed] = useState("");
  const breedsQuery = useQuery({
    queryKey: ["breeds"],
    queryFn: CatsClient.getBreeds,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const catsQuery = useInfiniteQuery({
    queryKey: ["cats", breed],
    queryFn: async ({ pageParam = 0 }) => {
      const options = { page: pageParam, limit };
      const data = await CatsClient.getCatsByBreed(breed, options);
      if (data.length < limit) {
        return { data };
      }
      return { data, page: pageParam + 1 };
    },
    getNextPageParam: (prevData) => prevData.page,
    enabled: !!breed,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (breedsQuery.status === "loading") {
    return <h1>Loading...</h1>;
  }
  if (breedsQuery.status === "error") {
    return <h1>{JSON.stringify(breedsQuery.error)}</h1>;
  }

  return (
    <Container>
      <h1>Cats Browser</h1>

      <div className="mt-3">
        <label htmlFor="select-breed">Breed</label>
        <Form.Select
          id="select-breed"
          onChange={(event) => setBreed(event.target.value)}
          className="mt-2"
        >
          <option key="select">Select breed</option>
          {breedsQuery.data?.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </Form.Select>
      </div>

      {(!catsQuery.data?.pages || catsQuery.data.pages.length === 0) && (
        <h4 className="mt-3">No cats available.</h4>
      )}

      <div className="grid gap-3 mt-3">
        {catsQuery.data?.pages.map((group) =>
          group.data?.map((cat) => (
            <CatCard
              key={cat.id}
              url={cat.url}
              gotoUrl={`/cats/${cat.id}`}
              className="g-col-6 g-col-sm-4 g-col-lg-3 g-col-xl-2 px-0"
            ></CatCard>
          ))
        )}
      </div>

      {catsQuery.hasNextPage && (
        <div className="py-3">
          <Button variant="success" onClick={() => catsQuery.fetchNextPage()}>
            {catsQuery.isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </Container>
  );
}

export default App;
