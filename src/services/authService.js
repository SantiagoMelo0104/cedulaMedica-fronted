
import auth from "./firebase.js";

const authService = {
    async signInWithEmailAndPassword(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return userCredential.user;
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
    }
};

export default authService;