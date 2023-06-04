import type { User } from "@prisma/client";
import NavBar from "gametest/components/navbar/Navbar";
import ListReview from "gametest/components/review/listReviews";
import { useSession } from "next-auth/react";

function Page() {
    const { data: currentUser } = useSession();
    return (
        <>
            <NavBar user={currentUser?.user as User} />
            <ListReview />
        </>
    )

}

export default Page;