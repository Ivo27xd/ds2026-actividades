import { useState } from "react";
import Button from 'react-bootstrap/Button'

function MeGusta() {
    const [liked, setLiked] = useState(false)

    return (
        <Button
            variant={liked ? 'danger' : 'outline-danger'}
            onClick={() => setLiked(!liked)}
        >
            {liked ? '❤️ Me gusta' : '♡ Me gusta'}
        </Button>
    )
}

export default MeGusta