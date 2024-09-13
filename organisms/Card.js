import Heading from "@/atoms/Heading";
import Text from "@/atoms/Text";
import IconWithContainer from "@/molecules/IconWithContainer";
import React from "react";

const Card = ({
  slang,
  handleDeleteSlang,
  handleBookmark,
  handleEditSlang,
  handleLikeSlang,
  user,
  activeTab,
  handleOpenCard,
}) => {
  return (
    <div
      onClick={(e, id) => {
        handleOpenCard(e, slang._id);
      }}
      className="rounded-lg border lg:hover:scale-105 
    transition-all duration-300 cursor-pointer hover:border-secondary-900 border-customGray-900 py-4 px-5 w-full min-h-[11rem] max-h-[11rem]"
    >
      <div className="flex justify-between items-center gap-x-2">
        <Heading type="h5" className="w-full truncate">
          {slang.title}
        </Heading>
        {user && slang.isApproved && (
          <IconWithContainer
            clickHandler={(e) => {
              handleBookmark(e, slang._id);
            }}
            iconColor={slang.isBookmarked ? "#767676" : "#404040"}
            iconName={
              slang.isBookmarked.includes(user._id)
                ? "bookmark"
                : "bookmark-outline"
            }
          />
        )}
      </div>
      <div
        className={`overflow-hidden three-line-clamp mt-2 min-h-16 max-h-16 `}
      >
        <Text variant="bodySmall" className={"text-customGray-700"}>
          {slang.description}
        </Text>
      </div>
      <div className="icons flex items-center justify-between mt-5 ">
        <div className="flex items-center space-x-1">
          {user && slang.isApproved && (
            <IconWithContainer
              clickHandler={(e) => {
                handleLikeSlang(e, slang._id);
              }}
              iconColor={slang.isLiked ? "#767676" : "#404040"}
              iconName={
                slang.isLiked.includes(user._id) ? "heart" : "heart-outline"
              }
            />
          )}
          {slang.isApproved && (
            <Text variant="caption" className={"text-customGray-700"}>
              {slang.isLiked.length} {!user && "Likes"}
            </Text>
          )}
        </div>

        <div className="flex items-center gap-x-2">
          {user?.role === "admin" && (
            <>
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
                containerHeight={"h-5"}
                containerWidth={"w-5"}
                iconName={"pencil"}
              />
            </>
          )}
          {activeTab === "my-creativity" && (
            <div>
              {slang.isApproved ? (
                <IconWithContainer
                  isClickable={false}
                  iconName={"check-badge"}
                />
              ) : (
                <IconWithContainer isClickable={false} iconName={"clock"} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
