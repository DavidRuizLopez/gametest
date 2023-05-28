import CreateReview from "gametest/components/review/CreateReview";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Page() {
    return <CreateReview />
}

export default Page;