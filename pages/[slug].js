import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import Skeleton from '../components/Skeleton';
import Head from 'next/head';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Fetch blog paths for static generation
export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'blogs'));
  const paths = snapshot.docs.map(doc => ({
    params: { slug: doc.data().fields.slug }, 
  }));

  return {
    paths,
    fallback: true,
  };
};

// Fetch blog data for a given slug
export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const blogsCollection = collection(db, 'blogs');
  const querySnapshot = await getDocs(blogsCollection);
  let blog = null;

  querySnapshot.forEach((doc) => {
    if (doc.data().fields.slug === slug) {
      blog = { id: doc.id, ...doc.data().fields };
    }
  });

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: { blog },
    revalidate: 86400, // Revalidate every day
  };
};


// Render the blog details page
const BlogDetails = ({ blog }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blog) {
      setLoading(false);
    }
  }, [blog]);

  if (loading) return <Skeleton />;

  const { title, date, desc, content, nextBlogLink } = blog;

  return (
    <>
      <Head>
        <title>{title}</title>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js"
          integrity="sha512-YBk7HhgDZvBxmtOfUdvX0z8IH2d10Hp3aEygaMNhtF8fSOvBZ16D/1bXZTJV6ndk/L/DlXxYStP8jrF77v2MIg=="
          crossOrigin="anonymous"
        ></script>
      </Head>

      <main id="journal">
        <div className="spacer">
          <article className="single">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                  <div className="mar-top-lg">
                    <span className="time">{date}</span>
                    <h2 className="article-title">{title}</h2>
                    <p>{desc}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                  {documentToReactComponents(content)}
                </div>
              </div>
            </div>
            <div className="next-article">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-12">
                  <p>Next Article</p>
                  <h2>
                    <a href={nextBlogLink}>Next Blog</a>
                  </h2>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
};

export default BlogDetails;
