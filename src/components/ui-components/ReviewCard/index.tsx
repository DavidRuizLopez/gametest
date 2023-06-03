import type { Game, Review, User } from "@prisma/client";

interface ReviewProps {
    review: Review & { user: User, game: Game}
}

const ReviewCard = ({review} : ReviewProps) => {
    return(
        <div className="drop-shadow flex flex-col shadow-[#2e026d] shadow-inner bg-white p-5 rounded-xl gap-2 items-center">
            <div className="text-center text-2xl w-full border-double border-b-4 border-[#2e026d] py-4 my-2">{review.title}</div>
            <div className="overflow-auto h-40 border-solid border-b-2 border-[#2e026d] pb-4 my-2">{review.body}</div>
            <div>{review.user.name}</div>
            <div><p>{`Tiempo de juego: ${review.time} Horas`}</p></div>
            <div>{review.game && review.game.name}</div>
        </div>
    )
}

export default ReviewCard;