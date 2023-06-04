import type{ User } from "@prisma/client";
import NavBar from "gametest/components/navbar/Navbar";
import CreateReview from "gametest/components/review/CreateReview";
import { useSession } from "next-auth/react";

function Page() {
    const { data: currentUser } = useSession();
    return (
        <>
            <NavBar user={currentUser?.user as User} />
            <CreateReview />
        </>
    )
}

export default Page;