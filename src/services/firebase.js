import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCrQJBjLEpp2Tijrfu2Fwd4DAT0fckSjYQ",
    authDomain: "cedulamedica.firebaseapp.com",
    projectId: "cedulamedica",
    storageBucket: "cedulamedica.appspot.com",
    messagingSenderId: "160905848661",
    appId: "1:160905848661:web:1fcb42ba54bf092df6b1dc",
    measurementId: "G-G09SSZS8SG"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
};

export default authService;