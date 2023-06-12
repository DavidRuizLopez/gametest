import { api } from "gametest/utils/api";
import { signIn, useSession } from "next-auth/react";
import ReviewCard from "../ui-components/ReviewCard";
import { Review } from "@prisma/client";

const ListReview = () => {
    const { data: userSession, status} = useSession()
    const {data: reviewsData} = api.review.getAll.useQuery()

    const listOfReviews = reviewsData?.sort((a: Review, b: Review) => {
        return b.date?.getTime()! - a.date?.getTime()!
    })

    if(status === 'unauthenticated') signIn().catch((err) => console.log(err))
    if(!userSession) return null;

    return(
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <h1 className="text-5xl font-extrabold tracking-tight py-4 mt-6 text-[hsl(280,100%,70%)]"> 
                Todas las reviews
            </h1>
            <div className="grid grid-cols-2 m-12 gap-12">
                {listOfReviews?.map((review) => {
                    return <ReviewCard key={`review-${review.id}`} review={review} />
                })}
            </div>
        </main>
    )
}

export default ListReview;