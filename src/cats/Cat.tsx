import { useQuery } from "@tanstack/react-query";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import { Link, useParams } from "react-router-dom";
import CatsClient from "../api/cats-client";

export default function CatPage() {
  const { catId } = useParams();

  const { data, status, error } = useQuery({
    queryKey: ["cat"],
    queryFn: () => CatsClient.getCatDetails(catId!),
  });

  if (status === "loading") return <h1>Loading...</h1>;
  if (error) {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  const breed = data?.breeds[0];
  return (
    <Container className="my-4">
      <Card>
        <Card.Header>
          <Link to={`/?breed=${breed?.id}`} className="btn btn-primary">
            Back
          </Link>
        </Card.Header>
        <Card.Img src={data?.url} style={{ objectFit: "cover" }}></Card.Img>
        {breed && (
          <Card.Body>
            <h4>{breed.name}</h4>
            <h5>Origin: {breed.origin}</h5>
            <h6>{breed.temperament}</h6>
            <p>{breed.description}</p>
          </Card.Body>
        )}
      </Card>
    </Container>
  );
}
