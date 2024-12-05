import AddPost from "./components/AddPost";
import PostsList from "./components/PostsList";
import { getAllPosts } from "@/api";
// import UpdatePost from "./components/UpdatePost";
export default async function Home() {
  const posts = await getAllPosts();
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="my-5 flex flex-row  justify-center gap-72">
        <h1 className="text-2xl font-bold">Next Js task</h1>
        <AddPost />
      </div>
      <PostsList posts={posts} />
    </main>
  );
}
