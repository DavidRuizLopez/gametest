import { api } from "gametest/utils/api";
import { useSession } from "next-auth/react";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { Rating } from "@mui/material";
import { AuthShowcase } from "../navbar/Navbar";
import { useRouter } from "next/router";
import type { Review } from "@prisma/client";

const EditReview = ({review}: {review: Review}) => {
    const router = useRouter();
    const createReviewMutaton = api.review.update.useMutation();

    const [titleValue, setTitleValue] = useState<string>(review.title);
    const [descriptionValue, setDescriptionValue] = useState<string>(review.body);
    const [timeValue, setTimeValue] = useState<string>(review.time ? review.time?.toString() : '');
    const [scoreValue, setScoreValue] = useState<number | null | undefined>(review.score ? review.score / 2 : 0);

    const user = useSession().data?.user;

    if (!user) return <AuthShowcase />;

    const createReview = async () => {
        await createReviewMutaton.mutateAsync({
            id: review.id,
            title: titleValue ?? '',
            time: parseInt(timeValue ?? ''),
            body: descriptionValue ?? '',
            score: scoreValue ? scoreValue * 2 : undefined
        })
            .then((val) => alert(`La review ${val.title} ha sido actualizada`))
            .catch((err) => console.log(err))
            .finally(() => { return void router.push("/profile").catch((err) => console.log(err)) })
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
                <Rating
                    name="Puntuacion"
                    value={scoreValue}
                    onChange={(event, newValue) => {
                        setScoreValue(newValue);
                    }}
                    precision={0.5}
                />
                <button
                    className="rounded-full bg-[#6a00ff] px-10 py-3 m-4 font-semibold text-white no-underline hover:bg-[#2e026d]/40 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    onClick={() => void createReview().catch((err) => console.log(err))} >
                    Enviar
                </button>
            </div>
        </main>
    )
}

export default EditReview;