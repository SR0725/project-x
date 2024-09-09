import Background from "@/components/background";
import CodeCreatePanel from "@/components/code/create-panel";
import Header from "@/components/header";
import Slogan from "@/components/slogan";
import getGoogleUserInfoSSR from "@/utils/get-google-user-info-ssr";
import SlideShow from "@/components/image-transition-container";

export default async function Page() {
  const userInfo = await getGoogleUserInfoSSR();

  return (
    <div className="relative h-fit min-h-screen bg-gradient-to-r from-white to-gray-200 dark:from-black dark:to-gray-800">
      <Background />
      <Header />
      <div className="mx-auto flex h-fit w-fit flex-col items-start justify-center overflow-hidden px-4 pt-[20vh] md:items-center md:pt-[30vh]">
        <Slogan />
        <CodeCreatePanel userInfo={userInfo} />
      </div>
      <div className="relative h-fit w-full max-w-[100vw]">
        <SlideShow />
      </div>
    </div>
  );
}
