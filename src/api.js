// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwdFyceFjZibyR8DvUZRnpsCNU4s5A0Mg",
    authDomain: "to-do-app-965ac.firebaseapp.com",
    projectId: "to-do-app-965ac",
    storageBucket: "to-do-app-965ac.appspot.com",
    messagingSenderId: "527593974371",
    appId: "1:527593974371:web:ee8db3a1dd180cbb416656"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const register = (email, password, repeatPassword) => {
    if (!email.length) {
        // add message!
        return;
    }

    if (password.length < 6) {
        // add message
        return;
    }

    if (password !== repeatPassword) {
        // add message
        return;
    }

    auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            // add message
            console.log(user);
        })
        .catch((error) => {
            // add message
        })
}

const login = (email, password) => {
    if (!email.length) {
        // add message!
        return;
    }

    if (!password.length) {
        // add message
        return;
    }
    auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            // add message
            console.log(user);
        })
        .catch((error) => {
            // add message
        })
}

const logout = () => {
    auth
        .signOut()
        .then(() => {
            // notify()
        })
        .catch(() => {
            // notify()
        })
}

export { auth, register, login, logout }