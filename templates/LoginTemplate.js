"use client";

import Button from "@/atoms/Button";
import Heading from "@/atoms/Heading";
import Logo from "@/atoms/Logo";
import Text from "@/atoms/Text";
import React from "react";

const LoginTemplate = ({}) => {
  const handleLoginWithGoogle = () => {
    
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="py-10 px-10 lg:px-20 border border-customGray-900 rounded-md text-center flex flex-col items-center">
        <Logo className="mb-10" />
        <Heading type="h3" className="">
          Welcome Back!
        </Heading>
        <Text variant="body" className={"mt-2 text-customGray-700"}>
          Kindly login with your google <br /> account to continue
        </Text>
        <Button
          iconUrl={"google"}
          iconSize="22"
          iconColor={"#D6D6D6"}
          iconView
          variant="contained"
          size={"default"}
          iconPosition="Left"
          className="mt-8 font-semibold"
          onClick={handleLoginWithGoogle}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginTemplate;
