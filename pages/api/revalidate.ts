import { revalidateTag } from 'next/cache';

export async function revalidateBlogs() {
  revalidateTag('blogs');
}
