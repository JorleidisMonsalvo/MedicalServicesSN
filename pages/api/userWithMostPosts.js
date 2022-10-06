import { db } from "../../firebaseInit";
import { getDocs, query, collection } from "firebase/firestore/lite";

export default function handler(req, res) {
    let userPosts = []
    try {
        const q = query(collection(db, "posts"));
    
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let data = doc.data();
            let user = userPosts.findIndex((e) => e.userId === data.userId);
            console.log(user)
            if (user<0) {
                console.log('entre aqui')
                userPosts.push({ userId: data.userId, posts:[{...data, id:doc.id}] });
            } else {
                let posts = userPosts[user].posts
                posts.push({...data, id:doc.id})
                userPosts[user].posts = posts
                console.log('entree aqui')
            }
          });
          console.log('inside the get docs', userPosts)
          let userMostPost = userPosts.reduce((acumulator, current)=>
          acumulator.posts.length > current.posts.length ? acumulator : current, {userId:'', posts: []}
          )
          res.status(200).json(userMostPost);
        });
      
      } catch (error) {
        console.log(error);
      }

      
  }

/* const userWithMostPosts = async () => {
  let res = [];
  try {
    const q = query(collection(db, "posts"));

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        let user = res.findIndex((e) => e.userId === data.userId);
        if (!user) {
          res.push({ userId: data.userId, posts:[{...data, id:doc.id}] });
        } else {
            let posts = res[user].posts
            posts.push({...data, id:doc.id})
            res[user].posts = posts
        }
      });
    });
    console.log(res)

  } catch (error) {
    console.log(error);
  }
  return res;
};

export default userWithMostPosts */