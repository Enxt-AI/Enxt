import { createClient } from './client'

export async function uploadImage(file: File, bucket: string = 'images') {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = fileName

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (error) {
    if ((error as any).message?.includes('bucket not found') || (error as any).statusCode === '404') {
      throw new Error("Supabase Storage bucket 'images' not found. Please create it in your Supabase dashboard and set it to public.")
    }
    throw error
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return publicUrl
}

export async function deleteImage(url: string, bucket: string = 'images') {
  const supabase = createClient()
  
  // Extract path from public URL
  // Example URL: https://[ref].supabase.co/storage/v1/object/public/images/filename.png
  const urlParts = url.split('/')
  const fileName = urlParts[urlParts.length - 1]

  const { error } = await supabase.storage
    .from(bucket)
    .remove([fileName])

  if (error) {
    console.error('Error deleting image:', error)
  }
}
