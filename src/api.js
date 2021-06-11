import { notify } from './utils.js';

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
        notify('Please enter an email!', 'danger')
        return;
    }

    if (password.length < 6) {
        notify('Password should be at least 6 characters long!', 'danger')
        return;
    }

    if (password !== repeatPassword) {
        notify('Password missmatch!', 'danger')
        return;
    }

    auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            notify('Successful registration!', 'success')
            console.log(user);
        })
        .catch((error) => {
            notify(error.message, 'danger')

        })
}

const login = (email, password) => {
    if (!email.length) {
        notify('Please enter an email!', 'danger')
        return;
    }

    if (!password.length) {
        notify('Please enter a password!', 'danger')
        return;
    }
    auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            notify('Successful login!', 'success')
        })
        .catch((error) => {
            notify(error.message, 'danger')
        })
}

const logout = () => {
    auth
        .signOut()
        .then(() => {
            notify('Successful logout!', 'success')
        })
        .catch((error) => {
            notify(error.message, 'danger')
        })
}

export { auth, register, login, logout }