import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Ratio from "react-bootstrap/Ratio";

export type CatCardParams = {
  url: string;
  gotoUrl: string;
  title?: string;
  description?: string;
  className?: string;
};

export default function CatCard(params: CatCardParams) {
  return (
    <Card className={params.className}>
      <Ratio aspectRatio="1x1">
        <Image src={params.url} style={{ objectFit: "cover" }}></Image>
      </Ratio>
      <Card.Body>
        {params.title && <Card.Title>{params.title}</Card.Title>}
        {params.description && <Card.Text>{params.description}</Card.Text>}
        <Button variant="primary" className="w-100">
          View details
        </Button>
      </Card.Body>
    </Card>
  );
}
