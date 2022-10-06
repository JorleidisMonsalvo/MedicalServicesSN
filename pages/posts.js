import { useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import PostCard from "../components/PostCard";
import Link from "next/link";
const Posts = () => {
  const { getPosts, posts } = useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      await getPosts();
    };
    fetchData();
  }, []);

  return (
    <div className="posts-main-container">
      <Link href={'/addPost'}><button>Add a new post</button></Link>
    <div className="posts-container">
      {posts.map((post) => (
        <PostCard post={post} key={post.id}/>
      ))}
    </div>
    </div>
  );
};

export default Posts;
