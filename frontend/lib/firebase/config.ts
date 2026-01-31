import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAxteT-rvoxWaMLX84M-dvIvZsfBK5i92g",
    authDomain: "kraper-25267.firebaseapp.com",
    projectId: "kraper-25267",
    storageBucket: "kraper-25267.firebasestorage.app",
    messagingSenderId: "597736480666",
    appId: "1:597736480666:web:be2ac08da97717cdda6423",
    measurementId: "G-3FB7K5WMYK"
};

// Initialize Firebase only once
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

let analytics;
// Analytics only works in browser environment
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, analytics };
