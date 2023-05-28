import { User } from "@prisma/client";
import { api } from "gametest/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const NavBar = ({user} : {user: User | undefined}) => {

  const { data: userSession, status} = useSession()

    if(!user){
        return(
            <>
             <div className="flex flex-row items-center justify-between bg-gradient-to-b from-[#ffffff] to-[#8e6dbb]">
                <Logo />
                <AuthShowcase />
             </div>
            </>
        )
    }else {
        return(
            <>
             <div className="flex flex-row items-center justify-between bg-gradient-to-b from-[#ffffff] to-[#8e6dbb]">
                <Logo />
                <div className="flex flex-row items-center justify-end">
                    <WelcomeUser user={userSession?.user as User} />
                    <PageName />
                </div>
                <AuthShowcase />
             </div>
            </>
        )
    }
}

const Logo = ({}) => {
    return(
        <>
         <div className="flex flex-row items-center justify-star gap-4 m-4">
            <Image src={"/IMG_0040.PNG"} alt="logo-gametest" height={60} width={60}/>
            <h1 className="text-[#2e026d] font-extrabold">| GAMETEST</h1>

         </div>
        </>
    )

}

const PageName = ({}) => {
    const router = useRouter();
    const goToLink = (goTo: string) => {
        return router.push(goTo).catch((err) => console.log(err))
    }
    return(
        <>
         <div className="flex flex-row items-center justify-center gap-4 m-4">
            <h1 onClick={() => goToLink("/")} className="text-[#2e026d] font-extrabold hover:cursor-pointer">| HOME </h1>
            <h1 onClick={() => goToLink("/reviews/create")} className="text-[#2e026d] font-extrabold hover:cursor-pointer">| NUEVA RESEÑA </h1>
            <h1 onClick={() => goToLink('/profile')} className="text-[#2e026d] font-extrabold hover:cursor-pointer">| MI PERFIL </h1>
         </div>
        </>
    )

}

const WelcomeUser = ({user} : {user: User | undefined}) => {
    return(
        <>
         <div className="flex flex-row items-center justify-end gap-4 m-4">
            <span className="text-[#2e026d] font-extrabold underline">{user?.name}</span>
         </div>
        </>
    )

}

export const AuthShowcase: React.FC = ({}) => {
    const { data: sessionData } = useSession();
  
    return (
        <button
          className="rounded-full bg-[#6a00ff] px-10 py-3 m-4 font-semibold text-white no-underline transition hover:bg-[#2e026d]/40 "
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
    );
  };


  export default NavBar;