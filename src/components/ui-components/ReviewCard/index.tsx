import { Rating } from "@mui/material";
import type { Game, Review, User } from "@prisma/client";
import Image from "next/image";

interface ReviewProps {
    review: Review & { user: User, game: Game }
}

const ReviewCard = ({ review }: ReviewProps) => {
    return (
        <div className="drop-shadow flex flex-col shadow-[#2e026d] shadow-inner bg-white p-5 rounded-xl gap-2 items-center">
            <div className="text-center text-2xl w-full border-double border-b-4 border-[#2e026d] pt-4 pb-2 mt-2">
                {review.title}
            </div>

            {review.score && <div className="text-center text-2xl w-full border-double border-b-4 border-[#2e026d] py-4 my-2">
                <div className="flex flex-row items-center justify-center gap-4 bg-[#6d3faf] -mt-4">
                    <p className="text-white">Puntuación: </p>
                    <Rating readOnly value={review.score / 2} precision={0.5} title="Puntuación"/>
                    <p className="text-white">{`${review.score} /10`}</p>
                </div>
            </div>}

            <div className="overflow-auto h-44 border-solid border-b-2 border-[#2e026d] pb-4 my-2">
                {review.body}
            </div>

            <div className="flex flex-row gap-10 items-center py-4">
                <p className="text-center">{`Autor: ${review.user.name as string}`}</p>
                <p className="text-center">{`Tiempo de juego: ${review.time?.toString() as string} Horas`}</p>
                <p className="text-center">{`Titulo: ${review.game && review.game.name}`}</p>
            </div>

            {/* <img
                className="drop-shadow-2xl rounded-md"
                src={review.game.image ?? ""}
                alt="imagen de juego" /> */}
                <Image 
                    loader={() => review.game.image ?? ''} 
                    sizes="(max-width: 500px) 5vw, (max-width: 1000px) 5vw, 5vw" 
                    height={1000} 
                    width={1000} 
                    alt={`image-review-of-${review.title}`} 
                    src={review.game.image ?? ''} />
 
        </div>
    )
}

export default ReviewCard;