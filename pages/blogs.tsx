import Navigation from "@/components/navigation";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

type Blog = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  blogs: Blog[];
};

const BlogsPage = ({ blogs }: Props) => {
  const [localBlogs, setLocalBlogs] = useState<Blog[]>(blogs);

  useEffect(() => {
    const cachedBlogs = localStorage.getItem('blogs');
    if (cachedBlogs) {
      setLocalBlogs(JSON.parse(cachedBlogs));
    } else {
      localStorage.setItem('blogs', JSON.stringify(blogs));
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch('https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/blog-posts');
        if (res.ok) {
          const data = await res.json();
          const newBlogs: Blog[] = data.blog_posts || [];
          setLocalBlogs(newBlogs);
          localStorage.setItem('blogs', JSON.stringify(newBlogs));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }, 5000); 

    return () => clearInterval(interval);
  }, [blogs]);

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
            {localBlogs.length > 0 ? (
              localBlogs.map((blog) => (
                <Link href={`/blogs/${blog.id}`} key={blog.id}>
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
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=300');

  try {
    const res = await fetch('https://cryptic-bastion-20850-17d5b5f8ec19.herokuapp.com/blog-posts');
    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    const data = await res.json();
    const blogs: Blog[] = data.blog_posts || [];

    return {
      props: {
        blogs,
      },
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    const cachedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    return {
      props: {
        blogs: cachedBlogs,
      },
    };
  }
};

export default BlogsPage;
