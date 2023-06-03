import type { User } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const NavBar = ({user} : {user: User | undefined}) => {

  const { data: userSession } = useSession()

    if(!user){
        return(
            <>
             <div className="flex flex-row items-center justify-between bg-gradient-to-b from-[#ffffff] to-[#8e6dbb]">
                <Logo />
                <PageName />
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
            <h1 onClick={() => void goToLink("/").catch((err) => console.log(err))} className="text-[#2e026d] font-extrabold hover:cursor-pointer transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">| HOME </h1>
            <h1 onClick={() => void goToLink("/reviews/create").catch((err) => console.log(err))} className="text-[#2e026d] font-extrabold hover:cursor-pointer transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">| NUEVA RESEÑA </h1>
            <h1 onClick={() => void goToLink('/profile').catch((err) => console.log(err))} className="text-[#2e026d] font-extrabold hover:cursor-pointer transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">| MI PERFIL </h1>
            <h1 onClick={() => void goToLink('/reviews').catch((err) => console.log(err))} className="text-[#2e026d] font-extrabold hover:cursor-pointer transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">| TODAS LAS RESEÑAS </h1>
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
          className="rounded-full bg-[#6a00ff] px-10 py-3 m-4 font-semibold text-white no-underline hover:bg-[#2e026d]/40 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
    );
  };


  export default NavBar;