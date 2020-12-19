import Layout from '../src/components/Layout';
import Post from '../src/components/Post';
import categories from '../src/mock/categories.json';

const Index = ({ posts }) => (
  <Layout>
    <div className="post-list">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=1`);
  const posts = await res.json();
  posts.map(post => {
    return (post.category = categories[Math.floor(Math.random() * categories.length)]);
  });
  return { posts };
};

export const config = { amp: true };

export default Index;
