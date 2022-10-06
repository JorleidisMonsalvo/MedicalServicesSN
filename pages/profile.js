import { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import PostCard from "../components/PostCard";
import Link from "next/link";

const Profile = () => {
  const { authUser, posts, getPosts } = useStateContext();

  useEffect(() => {
    const getData = async () => {
      await getPosts();
    };
    getData();
  }, [posts]);

  let id = authUser.user !== undefined ? authUser.user.uid : authUser.uid;
  let arr = posts.filter((e) => e.userId === id);
  
  return (
    <>
      {arr.length === 0 && (
        <div className="no-posts-container">
          <span>You have not publish any post yet</span>
        </div>
      )}
      {arr.length > 0 && (
        <div className="posts-main-container">
          <Link href={"/addPost"}>
            <button>Add a new post</button>
          </Link>
          <div className="posts-container">
            {arr.map((post, i) => (
              <PostCard post={post} key={i}/>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
