// pages/add-blog.js
import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import styles from "../styles/AddBlog.module.css";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [slug, setSlug] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [content, setContent] = useState("");
  const [nextBlogLink, setNextBlogLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        fields: {
          title,
          desc,
          date,
          slug,
          thumbnail: {
            fields: {
              file: {
                url: thumbnailUrl,
                details: {
                  image: {
                    width: 800, // Assuming width of the image
                    height: 600, // Assuming height of the image
                  },
                },
              },
            },
          },
          content: {
            nodeType: "document",
            data: {},
            content: JSON.parse(content),
          },
          nextBlogLink: JSON.parse(nextBlogLink),
        },
      });

      alert("Blog added successfully");
      setTitle("");
      setDesc("");
      setDate("");
      setSlug("");
      setThumbnailUrl("");
      setContent("");
      setNextBlogLink("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Blog</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Description:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className={styles.textarea}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Slug:</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Thumbnail URL:</label>
          <input
            type="text"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Content (as JSON):</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className={styles.textarea}
            placeholder='[{"nodeType": "paragraph", "content": [{"nodeType": "text", "value": "Your content here", "marks": [], "data": {}}]}]'
          ></textarea>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Next Blog Link (as JSON):</label>
          <input
            type="text"
            value={nextBlogLink}
            onChange={(e) => setNextBlogLink(e.target.value)}
            required
            className={styles.input}
            placeholder='{"nodeType": "text", "value": "Next blog link"}'
          />
        </div>
        <button type="submit" className={styles.button}>Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
