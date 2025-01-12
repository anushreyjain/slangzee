import React, { useState } from "react";
import LinkButton from "../atoms/LinkButton";
import Logo from "@/atoms/Logo";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = ({ ...property }) => {
  const { user, error, isLoading: authLoading } = useUser();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const handleLoginButton = async () => {
    setIsTransitioning(true);
    if (user) {
      // Use window.location for logout to ensure proper redirect handling
      window.location.href = "/api/auth/logout";
    } else {
      // Use window.location for login as well
      window.location.href = "/api/auth/login";
    }
  };

  const handleApiCall = async () => {
    setIsApiLoading(true); // Set loading state for API call
    try {
      const response = await axios.get("http://localhost:3001/slangs");
      console.log("data", response.data);
      setApiResponse(response.data); // Set the response data to state
    } catch (error) {
      console.error("Error fetching data from API:", error);
    } finally {
      setIsApiLoading(false); // Reset loading state after the API call completes
    }
  };

  const isLoading = authLoading || isTransitioning;

  return (
    <div className="pt-1 lg:pt-5 flex items-center justify-between border-b border-customGray-900">
      <Logo />
      <button
        onClick={handleApiCall}
        className="bg-customGray-800 text-white py-2 px-4 rounded hover:bg-customGray-700"
        disabled={isApiLoading}
      >
        {isApiLoading ? "Loading..." : "Get Slangs"}
      </button>
      <div className="flex gap-8">
        <a
          className="hidden md:block"
          href="https://github.com/anushreyjain/slangzee"
          target="_blank"
        >
          <LinkButton
            onClickHandler={() => {}}
            className="uppercase"
            label="Github"
          />
        </a>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-customGray-700">
              {user ? "Logging out..." : "Loading"}
            </span>
          </div>
        ) : user ? (
          <div className="flex items-center gap-x-2">
            <div className="w-7 h-7 lg:w-12 lg:h-12 border border-customGray-700 rounded-full flex justify-center items-center">
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-full overflow-hidden bg-red-300 relative">
                <Image src={user.picture} alt={user.name} layout="fill" />
              </div>
            </div>
            <div className="">
              <h2 className="text-customGray-700 text-sm">
                Hello, {user.given_name}
              </h2>
              <p
                onClick={handleLoginButton}
                className="underline cursor-pointer text-customGray-700 hover:text-white-800
                w-fit transition-all duration-200 text-xs lg:text-sm"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <LinkButton
            onClickHandler={handleLoginButton}
            className="uppercase"
            label="Login"
            disabled={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
