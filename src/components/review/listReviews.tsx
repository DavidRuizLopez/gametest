import { api } from "gametest/utils/api";
import { signIn, useSession } from "next-auth/react";
import ReviewCard from "../ui-components/ReviewCard";
import { User } from "@prisma/client";


const ListReview = () => {
    const { data: userSession, status} = useSession()
    const {data: reviewsData} = api.review.getAll.useQuery()

    if(status === 'unauthenticated') signIn().catch((err) => console.log(err))
    if(!userSession) return null;

    return(
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="flex min-h-screen flex-col items-center justify-center py-5 my-10">
                <h1 className="text-5xl font-extrabold tracking-tight text-[hsl(280,100%,70%)]">
                    Todas las reviews
                </h1>
                <div className="grid grid-cols-2 m-12 gap-12">
                    {reviewsData?.map((review) => {
                        return <ReviewCard key={`review-${review.id}`} review={review} />
                    })}
                </div>
            </div>
        </main>
    )
}

export default ListReview;