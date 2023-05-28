/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "gametest/utils/api";
import { useSession } from "next-auth/react";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { Autocomplete, Button } from "@mui/material";
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
            .finally(() => router.push("/reviews").catch((err) => console.log(err)))
    }

    return (
        <>
            <TextField id="title" label="Title" required={true} variant="standard" value={titleValue} onChange={(val) => setTitleValue(val.target.value)} />
            <TextField 
            id="description" 
            label="Description" 
            multiline 
            required={true} 
            variant="standard" 
            value={descriptionValue} 
            onChange={(val) => setDescriptionValue(val.target.value)} />
            <TextField id="time" label="Time" required={true} variant="standard" value={timeValue} type="number" onChange={(val) => setTimeValue(val.target.value)} />
            <Autocomplete
                value={game}
                onChange={(event: any, newValue: optionsGames | null) => {
                    setGame(newValue);
                }}
                id="controllable-states"
                options={listGamesStrings ?? [{ label: '', id: '' }]}
                getOptionLabel={(option) => option.label}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Games" />}
            />
            <button className="bg-slate-950" onClick={() => createReview()} >hola cara cola</button>
        </>
    )
}

export default CreateReview;