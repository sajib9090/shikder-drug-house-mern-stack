import { createContext, useEffect } from "react";
import { app } from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // create user with email and password
  const createNewUserWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  const updateUserProfilePhoto = (photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      photoURL: photo,
    });
  };

  // sign in with email and password
  const signInWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign in/up with gmail

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // logout
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  // on auth state changed
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
      //jwt
      if (loggedInUser?.email) {
        fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: loggedInUser?.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("access-token", data.token);
            setLoading(false);
          });
      } else {
        setLoading(false);
        localStorage.removeItem("access-token");
      }
    });
    return () => {
      return unSubscribe();
    };
  }, []);

  //auth info
  const authInfo = {
    user,
    loading,
    setLoading,
    createNewUserWithEmail,
    updateUserProfile,
    updateUserProfilePhoto,
    logOut,
    googleSignIn,
    signInWithEmail,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
