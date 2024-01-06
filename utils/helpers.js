import { GoogleAuthProvider, signInWithRedirect, GithubAuthProvider } from "firebase/auth"
import { auth } from "./Firebase.config.js"

const googleProvider = new GoogleAuthProvider()
const githubprovider = new GithubAuthProvider();

export const signinwithgoogle = async () => {
    await signInWithRedirect(auth, googleProvider).then(userCred => {
        window.location.reload()

    })
}

export const signinwithgithub = async () => {
    await signInWithRedirect(auth, githubprovider).then(userCred => {
        window.location.reload()

    })
}

