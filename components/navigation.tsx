// components/Navigation.tsx

import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center bg-neutral-100 text-tertiary-800 font-bold p-4">
      <div className="flex space-x-10 mx-auto">
        <Link href="/">Home</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/new-blog">Create New Blog Post</Link> {/* Nieuwe link toegevoegd */}
      </div>
    </nav>
  );
};

export default Navigation;
