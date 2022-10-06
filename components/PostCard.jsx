import {useState, useEffect} from "react";
import Link from "next/link";

const PostCard = ({ post: {name, files, id, description} }) => {
  const [img, setImg] = useState(null)
  useEffect(() => {
    let imgIndex = files.findIndex((file)=> file.url.includes('jpg') ||file.url.includes('png'))
    if(imgIndex>0) setImg(files[imgIndex].url)
  }, [])
  
  return (
    <div className="post-card">
      <span>{name}</span>
      {img && <img src={img} />}
      <p>{description}</p>
      <Link href={`/post/${id}`}>
        <button onClick="">View more</button>
      </Link>
    </div>
  );
};

export default PostCard;
