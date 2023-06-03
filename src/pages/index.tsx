import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import NavBar from "gametest/components/navbar/Navbar";
import type { User } from "@prisma/client";
import HomePage from "gametest/components/home/HomePage";

const Home: NextPage = () => {
  const { data: userSession } = useSession()

  return (
    <>
      <NavBar user={userSession?.user as User} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <HomePage />
        </div>
      </main>
    </>
  );
};

export default Home;
