import React from "react";
import LinkButton from "../atoms/LinkButton";
import Logo from "@/atoms/Logo";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

const Navbar = ({ ...property }) => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const handleLoginButton = () =>
    user ? router.push("/api/auth/logout") : router.push("/api/auth/login");
  return (
    <div className="pt-1 lg:pt-5 flex items-center justify-between border-b border-customGray-900">
      <Logo />
      <div>
        {user && (
          <div className="flex items-center gap-x-2">
            <div className="w-7 h-7 lg:w-12 lg:h-12 border border-customGray-700 rounded-full flex justify-center items-center">
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-full overflow-hidden bg-red-300 relative">
                <Image src={user.picture} alt={user.name} layout="fill" />
              </div>
            </div>
            <div className="">
              <h2 className="text-customGray-700 text-sm">Hello,{user.given_name}</h2>
              <p
                onClick={handleLoginButton}
                className="underline cursor-pointer text-customGray-700 hover:text-white-800
               w-fit transition-all duration-200 text-xs lg:text-sm"
              >
                Logout
              </p>
            </div>
          </div>
        )}
        {!user && (
          <LinkButton
            onClickHandler={handleLoginButton}
            className="uppercase"
            label={"Login"}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
