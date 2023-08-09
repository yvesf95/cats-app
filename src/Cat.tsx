import { useParams } from "react-router-dom";

export default function CatDetail() {
  const params = useParams();
  
  return (
    <div>
      <h1>Cat {params.catId}</h1>
    </div>
  );
}
