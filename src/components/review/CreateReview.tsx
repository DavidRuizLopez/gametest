import { api } from "gametest/utils/api";
import { useSession } from "next-auth/react";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { Autocomplete } from "@mui/material";
import { AuthShowcase } from "../navbar/Navbar";
import { useRouter } from "next/router";

interface optionsGames {
    label: string;
    id: string;
}

const CreateReview = () => {
    const router = useRouter();
    const createReviewMutaton = api.review.create.useMutation();
    const { data: listGames } = api.game.getAll.useQuery();

    const listGamesStrings = listGames?.map((game) => {
        return {
            label: game.name,
            id: game.id
        }
    })

    const [titleValue, setTitleValue] = useState<string>();
    const [descriptionValue, setDescriptionValue] = useState<string>();
    const [timeValue, setTimeValue] = useState<string>();
    const [game, setGame] = useState<optionsGames | null>();

    const user = useSession().data?.user;

    if (!user) return <AuthShowcase />;

    const createReview = async () => {
        await createReviewMutaton.mutateAsync({
            title: titleValue ?? '',
            time: parseInt(timeValue ?? ''),
            userId: user?.id,
            gameId: game?.id ?? '',
            body: descriptionValue ?? '',
            date: new Date()
        })
            .then((val) => alert(`La review ${val.title} ha sido creada`))
            .catch((err) => console.log(err))
            .finally(() => { return void router.push("/profile").catch((err) => console.log(err))})
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <h1 className="text-5xl font-extrabold tracking-tight py-6 my-10 text-[hsl(280,100%,70%)]"> 
                Crear nueva Review
            </h1>
            <div className="drop-shadow flex flex-col gap-10 w-10/12 shadow-[#2e026d] shadow-inner bg-white p-10 mb-10 rounded-xl items-center">
                <TextField className="w-8/12"
                    id="title" 
                    label="Título" 
                    required={true} 
                    variant="standard" 
                    value={titleValue} 
                    onChange={(val) => setTitleValue(val.target.value)} />
                <TextField className="w-8/12"
                    id="description" 
                    label="Descripción" 
                    multiline 
                    required={true} 
                    variant="outlined"
                    minRows={6} 
                    value={descriptionValue} 
                    onChange={(val) => setDescriptionValue(val.target.value)} />
                <TextField className="w-6/12"
                    id="time" 
                    label="Tiempo de juego" 
                    required={true} 
                    variant="standard" 
                    value={timeValue} 
                    type="number" 
                    onChange={(val) => setTimeValue(val.target.value)} />
                <Autocomplete
                    value={game}
                    onChange={(event, newValue: optionsGames | null) => {
                        setGame(newValue);
                    }}
                    id="controllable-states"
                    options={listGamesStrings ?? [{ label: '', id: '' }]}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: 570 }}
                    renderInput={(params) => <TextField {...params} label="Seleccione juego" />} />
                <button 
                    className="rounded-full bg-[#6a00ff] px-10 py-3 m-4 font-semibold text-white no-underline hover:bg-[#2e026d]/40 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110" 
                    onClick={() => void createReview().catch((err) => console.log(err))} >
                        Enviar
                </button>
            </div>
        </main>
    )
}

export default CreateReview;