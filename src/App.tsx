import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import CatsClient from "./api/cats-client";
import CatCard from "./common/components/CatCard";
import { Link, useSearchParams } from "react-router-dom";
import { Col } from "react-bootstrap";

const limit = 10;

function App() {
  const [searchParams] = useSearchParams();
  const [breed, setBreed] = useState(searchParams.get("breed") || "");
  const breedsQuery = useQuery({
    queryKey: ["breeds"],
    queryFn: CatsClient.getBreeds,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const catsMapRef = useRef(new Map());
  const catsQuery = useInfiniteQuery({
    queryKey: ["cats", breed],
    queryFn: async ({ pageParam = 0 }) => {
      const options = { page: pageParam, limit };
      const data = await CatsClient.getCatsByBreed(breed, options);

      let newCatsCounter = 0;
      for (const cat of data) {
        if (!catsMapRef.current.has(cat.id)) {
          catsMapRef.current.set(cat.id, cat);
          newCatsCounter++;
        }
      }

      if (newCatsCounter === 0) {
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

  const distinctIds = new Map();
  const cats =
    catsQuery.data?.pages
      .map((page) => page.data)
      .flat()
      .filter((cat) => {
        const isUnique = !distinctIds.has(cat.id);
        if (isUnique) {
          distinctIds.set(cat.id, cat);
        }
        return isUnique;
      }) || [];

  return (
    <Container className="my-4">
      <h1>Cats Browser</h1>

      <div className="mt-3">
        <label htmlFor="select-breed">Breed</label>
        <Form.Select
          id="select-breed"
          value={breed}
          onChange={(event) => setBreed(event.target.value)}
          className="mt-2"
          disabled={
            breedsQuery.status === "loading" || breedsQuery.status === "error"
          }
        >
          <option key="select">Select breed</option>
          {breedsQuery.data?.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </Form.Select>
      </div>

      {cats?.length === 0 && <h4 className="mt-3">No cats available.</h4>}

      <div className="grid gap-3 mt-3">
        {cats?.map((cat) => (
          <Col key={cat.id} className="g-col-6 g-col-md-4 g-col-lg-3">
            <CatCard url={cat.url}>
              <Link to={`/cats/${cat.id}`} className="btn btn-primary w-100">
                View details
              </Link>
            </CatCard>
          </Col>
        ))}
      </div>

      {catsQuery.hasNextPage && (
        <div className="py-3">
          <Button variant="success" onClick={() => catsQuery.fetchNextPage()}>
            {catsQuery.isFetchingNextPage ? "Loading cats..." : "Load More"}
          </Button>
        </div>
      )}
    </Container>
  );
}

export default App;
