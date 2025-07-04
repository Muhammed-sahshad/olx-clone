import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const registerUser = async (email: string, password: string, username: string): Promise<User> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
            username,
            email: user.email,
            createdAt: new Date(),
        });

        return user;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

