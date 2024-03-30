import HomeTemplate from "@/templates/HomeTemplate";
import React from "react";

const getAllSlangs = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/slangs", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};

const Home = async () => {
  const { allSlangs } = await getAllSlangs();
  return (
    <div className="bg-black h-screen text-white-900 px-36">
      <HomeTemplate allSlangs={allSlangs} />
    </div>
  );
};

export default Home;
