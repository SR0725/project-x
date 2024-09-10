import { createOpenAI } from "@/backend/utils/openai";
import axios from "axios";

export async function generateImage(prompt: string) {
  const openai = createOpenAI();
  const image = await openai.images.generate({
    prompt,
    model: "dall-e-3",
    n: 1,
    size: "1792x1024",
  });
  const imageUrl = image.data[0].url;
  if (!imageUrl) {
    return undefined;
  }

  // 下載圖片
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  
  // 將圖片轉換為 base64
  const base64Image = Buffer.from(response.data, 'binary').toString('base64');
  
  // 返回帶有 MIME 類型的 base64 字符串
  return `data:image/png;base64,${base64Image}`;
}
