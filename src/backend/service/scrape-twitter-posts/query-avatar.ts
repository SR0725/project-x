import { Tweet } from "@/models/tweet";

async function queryAvatar(): Promise<string> {
  const avatarElement = document.querySelector(
    'img[alt="Opens profile photo"]'
  );
  const avatarUrl = avatarElement?.getAttribute("src") || "";


  return avatarUrl;
}

export default queryAvatar;
