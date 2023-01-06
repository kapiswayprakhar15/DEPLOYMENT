import "./write.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useCookies } from "react-cookie";

export default function Write() {
  const editor = useRef(null);
  const [cookies, setCookie] = useCookies(["token"]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [blog, setBlog] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("blog", blog);
    formData.append("author", author);
    const res = await axios.post("/posts", formData, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    console.log(res);
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            id="fileInput"
            type="file"
            placeholder="username"
            style={{ display: "none" }}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="username"
            
            required
          />
          <input
            type="file"
            name="myImage"
            accept="image/*"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
         
          <JoditEditor
            ref={editor}
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e)}
          />
          <textarea
            className="writeInput writeText"
            type="textarea"
            id="subject"
            placeholder="Blog"
            onChange={(e) => setBlog(e.target.value)}
            maxlength="200"
            rows="5"
          ></textarea>
        </div>

        <button
          type="submit"
          id="submit"
          name="submit"
          className="btn btn-primary  writeSubmit "
        >
          Add Post
        </button>
      </form>
    </div>
  );
}
