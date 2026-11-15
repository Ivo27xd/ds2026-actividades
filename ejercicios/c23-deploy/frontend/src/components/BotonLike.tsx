import { useState } from "react";
import Button from "react-bootstrap/Button";
import { LuHeart } from "react-icons/lu";

function MeGusta() {
  const [liked, setLiked] = useState(false);

  return (
    <Button
      variant={liked ? "danger" : "outline-secondary"}
      className="btn-like d-inline-flex align-items-center gap-2"
      onClick={() => setLiked(!liked)}
      aria-pressed={liked}
    >
      <LuHeart size={15} fill={liked ? "currentColor" : "none"} />
      <span>{liked ? "Guardado" : "Me gusta"}</span>
    </Button>
  );
}

export default MeGusta;
