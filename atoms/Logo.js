import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Logo = ({ width, height, ...property }) => {
  const router = useRouter();
  const handleLogo = () => {
    router.push("/");
  };
  return (
    <div
      onClick={handleLogo}
      className={`${width || "lg:w-[15rem] w-[10rem]"} ${
        height || "h-[4.625rem]"
      } relative cursor-pointer ${property.className}`}
    >
      <Image src={"/Logo.svg"} alt="" layout="fill" />
    </div>
  );
};

export default Logo;
