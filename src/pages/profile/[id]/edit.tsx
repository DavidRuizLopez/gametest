import type { User } from "@prisma/client";
import NavBar from "gametest/components/navbar/Navbar";
import EditProfile from "gametest/components/profile/EditProfile";
import { prisma } from "gametest/server/db";
import type { GetServerSidePropsContext } from "next";

function Page({user}: {user: User}) {
    return(
            <>
                <NavBar user={user} />
                <EditProfile user={user} />
            </>
         )
}

export default Page;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query

    const user = await prisma.user.findUniqueOrThrow({
        where: { id: id as string }
    })

    return {
        props: {
            user
        }
    }
}