import type{ Review, User } from "@prisma/client";
import NavBar from "gametest/components/navbar/Navbar";
import EditReview from "gametest/components/review/EditReview";
import { prisma } from "gametest/server/db";
import type { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";

function Page({review}: {review: Review}) {
    const { data: currentUser } = useSession();
    return (
        <>
            <NavBar user={currentUser?.user as User} />
            <EditReview review={review}/>
        </>
    )
}

export default Page;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query

    const review = await prisma.review.findUniqueOrThrow({
        where: {id: id as string},
    })

    return {
        props: {
            review: {
                ...review,
                date: review.date?.getTime()
            }
        }
    }
}