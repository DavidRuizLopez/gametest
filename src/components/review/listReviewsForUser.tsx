import { api } from "gametest/utils/api";
import { signIn, useSession } from "next-auth/react";
import ReviewCard from "../ui-components/ReviewCard";
import { Review } from "@prisma/client";


const ListReviewForUser = () => {
    const { data: userSession, status} = useSession()
    const {data: reviewsData} = api.review.getFromUser.useQuery({ user: userSession?.user.id ?? ''})

    const listOfReviews = reviewsData?.sort((a: Review, b: Review) => {
        return b.date?.getTime()! - a.date?.getTime()!
    })

    if(status === 'unauthenticated') signIn().catch((err) => console.log(err))
    if(!userSession) return null;

    return(
        <div className="flex min-h-screen flex-col items-center justify-center py-5 my-10">
            <h1 className="text-5xl font-extrabold tracking-tight text-[hsl(280,100%,70%)]">
                {userSession?.user.name}
            </h1>
            <div className="grid grid-cols-2 m-12 gap-12">
                {listOfReviews?.map((review) => {
                    return <ReviewCard key={`review-${review.id}`} review={review} />
                })}
            </div>
        </div>
    )
}

export default ListReviewForUser;