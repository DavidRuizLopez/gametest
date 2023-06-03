import type { User } from "@prisma/client";
import NavBar from "gametest/components/navbar/Navbar";
import ProfileView from "gametest/components/profile/ProfileView";
import { useSession } from "next-auth/react";

function Page() {
    const { data: currentUser } = useSession();
    return(
            <>
                <NavBar user={currentUser?.user as User} />
                <ProfileView />
            </>
         )
}

export default Page;