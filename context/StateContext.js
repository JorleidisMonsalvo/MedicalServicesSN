import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, storage } from "../firebaseInit";
import { useRouter } from "next/dist/client/router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  addDoc,
  getDoc
} from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Context = createContext();

export const StateContext = ({ children }) => {
  const { push, pathname } = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [businessCollection, setBusinessCollection] = useState([]);
  const [posts, setPosts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [urlF, setUrlF] = useState("");
  const [business, setBusiness] = useState('')
  const [postByB, setPostByB] = useState({
    Pharmacy: [],
    Laboratory: [],
    "Medical Service": [],
  });
  const userLogged = () => {
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        let userLogged = user === null ? false : true;
        if (userLogged) {
          const docRef = doc(db, "users", user.uid);
          getDoc(docRef).then((res) => {
            let data = res.data()
            setBusiness(data.business)
            });
          
          setIsLogged(userLogged)
          console.log('business',business)
          setAuthUser({...user, business: business});
          if (pathname === "/login" || pathname === "/register" || "/logout") {
            push("/");
          }
        }
      });

      getPosts().then(() => console.log("Post query"));
    }, []);
  };

  const logOut = async () => {
    try {
      signOut(auth);
      setIsLogged(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBusinessCollection = async () => {
    try {
      const q = query(collection(db, "postType"));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let data = doc.data();
          let item = businessCollection.find((e) => e === data.name);
          if (!item) setBusinessCollection([...businessCollection, data.name]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    let res = [];
    try {
      const q2 = query(collection(db, "posts"));

      getDocs(q2).then((subQuerySnapshot) => {
        subQuerySnapshot.forEach((subDoc) => {
          let data = subDoc.data();
          let post = posts.find((e) => e.id === subDoc.id);
          if (!post) {
            res.push({ ...data, id: subDoc.id });
            setPosts([...posts, { ...data, id: subDoc.id }]);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
    return res;
  };

  const getPostsByBusiness = (businessType) => {
    const q2 = query(
      collection(db, "posts"),
      where("business", "==", businessType)
    );
    let updateArr = postByB;
    let businessArr = updateArr[businessType];
    getDocs(q2).then((subQuerySnapshot) => {
      subQuerySnapshot.forEach((subDoc) => {
        console.log(subDoc.id, " => ", subDoc.data());
        let data = subDoc.data();

        setPostByB(updateArr);
        let post = businessArr.find((e) => e.userId === data.userId);
        if (!post) {
          businessArr.push(data);
          updateArr[businessType] = businessArr;
          setPostByB(updateArr);
        }
      });
    });
  };

  const addNewDoc = async (collectionName, userID, data) => {
    await setDoc(doc(db, collectionName, userID), data);
  };

  const addNewPost = async (data) => {
    console.log("data", data);
    await addDoc(collection(db, "posts"), data);
    push("/posts");
  };

  const signUp = async (userInfo) => {
    try {
      let { user } = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      await addNewDoc("users", user.uid, {
        business: userInfo.business,
        name: userInfo.name,
        posts: [],
      });
      console.log(user);
      push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (credentials) => {
    try {
      let user = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      setIsLogged(true);
      setAuthUser(user);
      push("/");
    } catch (error) {
      setIsLogged(false);
      console.log(error);
    }
  };

  const uploadFiles = (file) => {
    let urlFile = "";
    if (!file) return;
    console.log("entre a files");
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("urkdkjhfgbhdj", url);
          urlFile = url;
          setUrlF(url);
          console.log("urlFileee", urlFile);
        });
      }
    );
    console.log("urlFile", urlF);
    return urlF;
  };

  return (
    <Context.Provider
      value={{
        isLogged,
        setIsLogged,
        userLogged,
        logOut,
        authUser,
        setAuthUser,
        signUp,
        login,
        getBusinessCollection,
        businessCollection,
        getPosts,
        posts,
        getPostsByBusiness,
        postByB,
        uploadFiles,
        progress,
        addNewPost,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
