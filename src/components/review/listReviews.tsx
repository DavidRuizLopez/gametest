import { api } from "gametest/utils/api";
import { signIn, useSession } from "next-auth/react";
import ReviewCard from "../ui-components/ReviewCard";


const ListReview = () => {
    const { data: userSession, status} = useSession()
    const {data: reviewsData} = api.review.getAll.useQuery()

    if(status === 'unauthenticated') signIn().catch((err) => console.log(err))
    if(!userSession) return null;
    

    return(
        <div className="flex flex-row">
            {reviewsData?.map((review) => {
                return <ReviewCard key={`review-${review.id}`} review={review} />
            })}
        </div>
    )
}

export default ListReview;