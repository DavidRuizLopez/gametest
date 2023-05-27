import type { Game, Review, User } from "@prisma/client";

interface ReviewProps {
    review: Review & { user: User, game: Game}
}

const ReviewCard = ({review} : ReviewProps) => {
    return(
        <div className="drop-shadow gap-6">
            {review.title}
            {review.body}
            {review.user.name}
            {review.time && review.time}
            {review.game && review.game.name}
        </div>
    )
}

export default ReviewCard;