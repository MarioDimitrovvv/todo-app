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
    console.log('hee');
    if(!email.length) {
        // add message!
        return;
    }

    if(password.length < 6) {
        // add message
        return;
    }

    if(password !== repeatPassword) {
        // add message
        return;
    }
    console.log('here');
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

auth.onAuthStateChanged((user) => {
    if(user) {
        console.log(user);
    } else {
        console.log('there is no user');
    }
})

export {register}