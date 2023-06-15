import { TextField } from "@mui/material";
import type { User } from "@prisma/client";
import { api } from "gametest/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";

const EditProfile = ({ user }: { user: User }) => {
    const router = useRouter()

    const [userName, setUserName] = useState<string>(user?.name ?? '')
    const [userDescription, setUserDescription] = useState<string>(user?.description ?? '')

    const userUpdateMutation = api.user.update.useMutation();

    const updateUser = () => {
        userUpdateMutation.mutateAsync({
            id: user.id,
            name: userName,
            description: userDescription
        })
            .then(() => alert(`el perfil del usuario ${userName} ha sido modificado`))
            .catch((err) => console.log(err))
            .finally(() => void router.push("/profile"))

    }

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <h1 className="text-5xl font-extrabold tracking-tight py-6 my-10 text-[hsl(280,100%,70%)]">
                    Editar Perfil de {user?.name}
                </h1>
                <div className="drop-shadow flex flex-col gap-10 w-10/12 shadow-[#2e026d] shadow-inner bg-white p-10 mb-10 rounded-xl items-center">
                    <TextField className="w-8/12"
                        id="title"
                        label="Nombre de usuario"
                        required={true}
                        variant="standard"
                        value={userName}
                        onChange={(val) => setUserName(val.target.value)} />
                    <TextField className="w-8/12"
                        id="description"
                        label="Descripción"
                        multiline
                        required={true}
                        variant="outlined"
                        minRows={6}
                        value={userDescription}
                        onChange={(val) => setUserDescription(val.target.value)} />
                    <button
                        className="rounded-full bg-[#6a00ff] px-10 py-3 m-4 font-semibold text-white no-underline hover:bg-[#2e026d]/40 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => void updateUser()} >
                        Enviar
                    </button>
                </div>
            </main>
        </>
    )
}

export default EditProfile;