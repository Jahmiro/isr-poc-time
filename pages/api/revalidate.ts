import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function revalidateUsers() {
    revalidateTag('blog-posts')
    redirect('/')
  }