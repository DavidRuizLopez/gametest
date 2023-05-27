import { api } from "gametest/utils/api";


const ListReview = () => {
    const {data: reviewsData} = api.review.getAll.useQuery()
    return(
        <>
            {reviewsData?.map((review) => {
                return(
                    <div>
                        {review.title}
                        {review.body}
                        {review.user.name}
                        {review.time}
                        {review.game && review.game.name}
                    </div>
                )
            })}
        </>
    )
}

export default ListReview;