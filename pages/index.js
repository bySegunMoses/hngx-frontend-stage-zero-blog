// pages/index.js
import { db } from '../firebase/config';
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import BlogCard from "../components/BlogCard";

export async function getStaticProps() {
  const blogsCollection = collection(db, 'blogs');
  const blogsSnapshot = await getDocs(blogsCollection);
  const blogsList = blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return {
    props: {
      blogs: blogsList,
    },
    revalidate: 1,
  };
}

const Blog = ({ blogs }) => {
  return (
    <>
      <Head>
        <title>Blog | Segun Moses</title>
      </Head>

      <main id="journal">
        <div className="spacer">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                <div className="page-intro mar-top-lg">
                  <h1 className="page-title">Segun Blog</h1>
                  <p>Shring my ideas, finding in simple, minimal & elegant way..</p>
                </div>
              </div>
            </div>
            <div className="articles-list mar-top-lg">
              <div className="grids">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;
