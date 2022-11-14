/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector } from "react-redux";
import { postsApi, useGetPostsQuery } from "../api/postsApi";

export default function PostList({ setPostId }) {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) {
    return (
      <div>
        <span className="spinner-border"></span> Loading Posts...
      </div>
    );
  }

  if (error) {
    return (
      <section className="alert alert-danger">
        Error fetching posts: {error.error}
      </section>
    );
  }

  return (
    <section>
      <h2>Posts:</h2>
      <ul>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} setPostId={setPostId} />
        ))}
      </ul>
    </section>
  );
}

function PostItem({ post, setPostId }) {
  const { isSuccess } = useSelector(
    postsApi.endpoints.getPostsById.select(post.id)
  );
  return (
    <li>
      <a
        className={isSuccess ? "link-success" : ""}
        onClick={() => setPostId(post.id)}
        href="#"
      >
        {post.title}
      </a>
    </li>
  );
}
