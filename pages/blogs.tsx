// pages/blogs.tsx

import fs from 'fs';
import path from 'path';
import Navigation from "@/components/navigation";
import { GetStaticProps } from "next";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  blogs: Blog[];
};

const BlogsPage = ({ blogs }: Props) => {
  return (
    <>
      <Navigation />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-tertiary-800 sm:text-4xl">
              Blog
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.id}`}>
                <article className="flex max-w-xl flex-col items-start justify-between border rounded-lg overflow-hidden">
                  <div className="group relative p-6">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-tertiary-800 group-hover:text-gray-600">
                      {blog.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-tertiary-700">
                      {blog.content}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  let blogs: Blog[] = [];
  const fallbackFilePath = path.join(process.cwd(), 'public', 'blogs-fallback.json');

  try {
    const res = await fetch(`https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/blog-posts`);
    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    const data = await res.json();
    blogs = data.blog_posts;

    // Save the fetched blogs to the fallback file
    fs.writeFileSync(fallbackFilePath, JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    if (fs.existsSync(fallbackFilePath)) {
      // Read blogs from the fallback file
      const fallbackData = fs.readFileSync(fallbackFilePath, 'utf-8');
      blogs = JSON.parse(fallbackData);
    }
  }

  return {
    props: {
      blogs,
    },
    revalidate: 10,
  };
};

export default BlogsPage;
