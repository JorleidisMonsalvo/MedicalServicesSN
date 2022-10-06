import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import { FaFileAlt } from "react-icons/fa";
const PostDetail = () => {
  const router = useRouter();
  const { post } = router.query;
  const { posts, getPosts } = useStateContext();
  const [postInfo, setPostInfo] = useState({});
  const [img, setImg] = useState(null);
  let imgUrl = ''
  useEffect(() => {
    let index = posts.findIndex((e) => e.id == post);
    setPostInfo(posts[index]);
    let temp = posts[index];
    let filesArr = temp?.files;
    let imgIndex = filesArr?.findIndex(
      (file) => file.url.includes("jpg") || file.url.includes("png")
    );
    if (imgIndex > 0){ 
      imgUrl = filesArr[imgIndex]
      setImg(imgUrl.url)};
  }, [posts]);

  return (
    <div className="post-container">
      <span>{postInfo.name}</span>
      <p>{postInfo.description}</p>
      {imgUrl && <img src={imgUrl} />}
      <p>Files:</p>
      {
        postInfo?.files?.map((file, i)=>(
          <a key={i} href={file} download target='_blank'><FaFileAlt/> file {i+1}</a>
        ))
      }
    </div>
  );
};

export default PostDetail;
