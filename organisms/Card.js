import Heading from "@/atoms/Heading";
import Text from "@/atoms/Text";
import IconWithContainer from "@/molecules/IconWithContainer";
import React, { useEffect, useState } from "react";

const Card = ({
  slang,
  handleDeleteSlang,
  handleBookmark,
  handleEditSlang,
  handleLikeSlang,
}) => {
  return (
    <div className="rounded-lg border border-customGray-900 py-4 px-5 w-full min-h-[11rem] max-h-[11rem]">
      <div className="flex justify-between items-center">
        <Heading type="h5">{slang.title}</Heading>
        <IconWithContainer
          clickHandler={(e) => {
            handleBookmark(e, slang._id);
          }}
          iconColor={slang.isBookmarked ? "#767676" : "#404040"}
          iconName={slang.isBookmarked ? "bookmark" : "bookmark-outline"}
        />
      </div>
      <div className={`overflow-hidden three-line-clamp mt-2`}>
        <Text variant="bodySmall" className={"text-customGray-700"}>
          {slang.description}
        </Text>
      </div>
      <div className="icons flex items-center justify-between mt-5 ">
        <div className="flex items-center space-x-1">
          <IconWithContainer
            clickHandler={(e) => {
              handleLikeSlang(e, slang._id);
            }}
            iconColor={slang.isLiked ? "#767676" : "#404040"}
            iconName={slang.isLiked ? "heart" : "heart-outline"}
          />
          <Text variant="caption" className={"text-customGray-700"}>
            {slang.likes}
          </Text>
        </div>

        <div className="flex items-center gap-x-2">
          <IconWithContainer
            clickHandler={(e) => {
              handleDeleteSlang(e, slang._id);
            }}
            iconColor={"#b33939"}
            iconName={"trash"}
          />
          <IconWithContainer
            clickHandler={(e) => {
              handleEditSlang(e, slang._id);
            }}
            iconColor={"#767676"}
            containerHeight={"h-4"}
            containerWidth={"w-4"}
            iconName={"pencil"}
          />
          <IconWithContainer isClickable={false} iconName={"check-badge"} />
          <IconWithContainer isClickable={false} iconName={"clock"} />
        </div>
      </div>
    </div>
  );
};

export default Card;
