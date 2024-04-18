import HomeTemplate from "@/templates/HomeTemplate";
import React from "react";

const Home = async () => {
  return (
    <div className="bg-black h-[100svh] text-white-900 lg:px-36 px-4 flex justify-center w-full overflow-auto">
      <HomeTemplate />
    </div>
  );
};

export default Home;
