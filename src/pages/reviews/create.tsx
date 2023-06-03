import { User } from "@prisma/client";
import NavBar from "gametest/components/navbar/Navbar";
import CreateReview from "gametest/components/review/CreateReview";
import { useSession } from "next-auth/react";

function Page() {
    const { data: currentUser } = useSession();
    return (
        <>
            <NavBar user={currentUser?.user as User} />
            {/* <div className="flex min-h-screen flex-col items-center justify-center py-5 my-10">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    <span className="text-[hsl(280,100%,70%)]">Crear nueva Review</span>
                </h1>
            </div> */}
            <CreateReview />
        </>
    )
}

export default Page;