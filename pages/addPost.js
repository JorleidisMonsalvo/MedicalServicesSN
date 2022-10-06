import { useState } from "react";
import { useStateContext } from "../context/StateContext";
import { FaRegTimesCircle } from "react-icons/fa";
import Link from "next/link";
function AddPost() {
  const { uploadFiles, progress, authUser, addNewPost } = useStateContext();
  const [postInfo, setPostInfo] = useState({
    name: "",
    description: "",
    files: [],
    business: authUser?.user !== undefined ? authUser.user.business : authUser?.business,
    userId: authUser?.user !== undefined ? authUser.user.uid : authUser?.uid,
  });
  console.log(postInfo.business)
  const handleChange = (e) => {
    if (e.target.name === "files") {
      let tempFiles = postInfo.files;
      let files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        tempFiles.push({ file: files.item(i), url: "", name: files.item(i).name});
      }
      console.log(tempFiles[0].file.name);
      setPostInfo({ ...postInfo, files: tempFiles });
    } else {
      setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    let postInfoCopy = postInfo;
    let updateArr = postInfoCopy.files;
    let onlyUrls = updateArr.map((file) => {
      let url = uploadFiles(file.file);
      console.log("url", url);
      return {url: url, name: file.name};
    });
    postInfoCopy.files = onlyUrls;
    addNewPost(postInfoCopy);
  };

  const deleteFileSelected = (name) => {
    let updatedArr = postInfo.files;
    let updateArr = updatedArr.filter((e) => e.name !== name);
    setPostInfo({ ...postInfo, files: updateArr });
  };
  return (
    <div className="add-post-container">
      <h1>Add a new Post</h1>
      <label className="post-form-item">
        <span>Post name:</span>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Insert the post name"
          onChange={handleChange}
        />
      </label>
      <label className="post-form-item">
        <span>Description:</span>
        <textarea
          type="text"
          id="description"
          name="description"
          placeholder="Insert a description"
          onChange={handleChange}
        />
      </label>
      {postInfo.files.length > 0 && (
        <div>
          <label className="post-form-item">
            Selected files:
            {postInfo?.files?.map((file, i) => (
              <div className="post-form-files-list" key={i}>
                <span>{file?.name}</span>{" "}
                <FaRegTimesCircle
                  onClick={() => deleteFileSelected(file.name)}
                />
              </div>
            ))}
          </label>
        </div>
      )}
      <label className="post-form-item">
        Select all the files related to your post (images, videos, audio,...):
        <input
          type="file"
          name="files"
          multiple
          onChange={handleChange}
        ></input>
      </label>
      <span>This is the progress %{progress}</span>
      <Link href={'/posts'}>
        <button className="post-form-button" onClick={handleSubmit}>
          Upload Post!
        </button>
      </Link>
    </div>
  );
}

export default AddPost;
