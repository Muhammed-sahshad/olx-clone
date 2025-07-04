import { Timestamp } from 'firebase/firestore';

export const displayDate = (createdAt: Timestamp | string) => {
    if (createdAt instanceof Timestamp) {
        return createdAt.toDate().toLocaleDateString();
    } else if (typeof createdAt === "string") {
        const parsedDate = new Date(createdAt);
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate.toLocaleDateString();
        }
    }
    return "Invalid Date";
};