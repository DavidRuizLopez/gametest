import { Rating } from "@mui/material";
import type { Game, Review, User } from "@prisma/client";

interface ReviewProps {
    review: Review & { user: User, game: Game }
}

const ReviewCard = ({ review }: ReviewProps) => {
    return (
        <div className="drop-shadow flex flex-col shadow-[#2e026d] shadow-inner bg-white p-5 rounded-xl gap-2 items-center">
            <div className="text-center text-2xl w-full border-double border-b-4 border-[#2e026d] py-4 my-2">{review.title}</div>
            <div className="overflow-auto h-40 border-solid border-b-2 border-[#2e026d] pb-4 my-2">{review.body}</div>
            <div className="flex flex-row gap-10 items-center py-4">
                <p className="text-center">{`Autor: ${review.user.name as string}`}</p>
                <p className="text-center">{`Tiempo de juego: ${review.time?.toString() as string} Horas`}</p>
                <p className="text-center">{`Titulo: ${review.game && review.game.name}`}</p>
            </div>
            {review.score && <div className="text-center text-2xl w-full border-double border-b-4 border-[#2e026d] py-4 my-2">
                <p>Puntuación: </p><Rating readOnly value={review.score / 2} precision={0.5} title="Puntuación"/><p> {review.score}</p>
            </div>}
            <img
                className="drop-shadow-2xl rounded-md"
                src={review.game.image ?? ""}
                alt="imagen de juego" />
        </div>
    )
}

export default ReviewCard;