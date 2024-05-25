import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: "cedulamedica.firebaseapp.com",
    projectId: "cedulamedica",
    storageBucket: "cedulamedica.appspot.com",
    messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: "G-G09SSZS8SG"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const authService = {
    async signInWithPopup() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async signOut() {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    },

    async getCurrentUser() {
        return auth.currentUser;
    },

    async getAuthToken() {
        const user = auth.currentUser;
        if (user) {
            const tokenResult = await user.getIdTokenResult();
            return tokenResult.token;
        } else {
            return null;
        }
    },
};

export  {authService, db};