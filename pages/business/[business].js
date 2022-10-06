import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import Link from "next/link";
import PostCard from "../../components/PostCard";
const BusinessPosts = () => {
  const router = useRouter();
  const { business } = router.query;
  const { posts, getPosts } = useStateContext();
  useEffect(() => {
    const fetchData = async () => {
      await getPosts();
    };
    fetchData();
  }, []);

  let arr = posts.filter((e) => {
    return e.business == business;
  });

  return (
    <div className="posts-main-container">
      <Link href={"/addPost"}>
        <button>Add a new post</button>
      </Link>
      <div className="posts-container">
        {arr.map((post) => (
          <PostCard post={post} key={post.id}/>
        ))}
      </div>
    </div>
  );
};

export default BusinessPosts;
