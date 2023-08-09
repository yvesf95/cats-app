import { PropsWithChildren } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Ratio from "react-bootstrap/Ratio";
import classNames from "../utils/classNames.util";

export type CatCardProps = {
  url: string;
  className?: string;
};

export default function CatCard(props: PropsWithChildren<CatCardProps>) {
  return (
    <Card className={classNames(props.className, "overflow-hidden")}>
      <Ratio aspectRatio="1x1">
        <Image src={props.url} className="object-fit-cover"></Image>
      </Ratio>
      {/* <Card.Img src={props.url}></Card.Img> */}
      <Card.Body>{props.children}</Card.Body>
    </Card>
  );
}
