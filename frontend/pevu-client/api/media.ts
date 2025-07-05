import api from './axios';

export async function uploadAvatar(file: File): Promise<{ fileName: string; url: string }> {
  const formData = new FormData();
  formData.append('files', file);
  const res = await api.post('/media/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // Return first uploaded image
  return res.data[0];
}

export async function uploadProductImages(files: File[]): Promise<{ fileName: string; url: string }[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  const res = await api.post('/media/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function uploadProductVideo(file: File, uploadSource: string = "product"): Promise<{ fileName: string; url: string; videoType: string; duration: number }> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('uploadSource', uploadSource);
  const res = await api.post('/media/upload/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
} 