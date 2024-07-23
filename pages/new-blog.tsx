import { useState } from "react";
import { useRouter } from "next/router";
import Navigation from "@/components/navigation";

const NewBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      "https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/add-blog-post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      }
    );

    if (response.ok) {
      try {
        const revalidateResponse = await fetch(
          "https://isr-poc-time.vercel.app/api/revalidate?gY$8@b%5E3E*z!R7p#Kf&wQ1mX%5EH9tL!c4BvN5%25Yp*2J",
          {
            method: "POST",
          }
        );

        if (revalidateResponse.ok) {
          router.push("/blogs");
        } else {
          console.error("Failed to revalidate");
        }
      } catch (err) {
        console.error("Error revalidating", err);
      }
    } else {
      console.error("Failed to add blog post");
    }
  };

  return (
    <>
      <Navigation />
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Create a New Blog Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="content"
              className="font-semibold text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[200px]"
            />
          </div>
          <button
            type="submit"
            className="bg-primary-500 text-tertiary-800 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Add Blog Post
          </button>
        </form>
      </div>
    </>
  );
};

export default NewBlogPage;
