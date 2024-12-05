import { IPosts } from "./types/Posts";
import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com";

export const getAllPosts = async (): Promise<IPosts[]> => {
  const response = await axios.get(`${baseUrl}/posts`);
  return response.data; // No need to assign a separate variable
};

export const AddPost = async (newPost: IPosts): Promise<IPosts> => {
  const response = await axios.post<IPosts>(`${baseUrl}/posts`, newPost);
  console.log("created Post:", response.data); // Log the added post
  return response.data;
};

export const editPost = async (newPost: IPosts): Promise<IPosts> => {
  const response = await axios.put<IPosts>(
    `${baseUrl}/posts/${newPost.id}`,
    newPost
  );
  console.log("Updated Post:", response.data); // Log the updated post
  return response.data;
};
export const deletePost = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${baseUrl}/posts/${id}`);
    console.log(`Post with ID ${id} deleted`);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};
