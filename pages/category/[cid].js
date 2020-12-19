import Layout from '../../src/components/Layout';
import Post from '../../src/components/Post';
import categories from '../../src/mock/categories.json';

const Category = ({ category, posts }) => (
  <Layout>
    <h1>{category.title}</h1>
    {posts.length ? (
      <div className="post-list">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    ) : (
      <p>There are no posts in this category</p>
    )}
  </Layout>
);

Category.getInitialProps = async ({ query }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=1`);
  let posts = await res.json();

  posts.map(post => {
    return (post.category = categories[Math.floor(Math.random() * categories.length)]);
  });
  
  let category = categories.find(cat => cat.id === query.cid);
  posts = posts.filter(post => post.category.id === category.id);
  
  return { category, posts };
};

export const config = { amp: true };

export default Category;
