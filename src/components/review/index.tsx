import { type Review } from '@prisma/client';
import type { User, Vote } from '@prisma/client';


export type ReviewView = (Review & {
	createdBy: User;
	votes: Vote[];
})

const ReviewComponent = (review: Review) => {

	return <div className="rounded border bg-slate-50 hover:shadow-md">
		<h1>Yujuuuuuuu {review.title}</h1>
		
	</div>
	
};

export default ReviewComponent;