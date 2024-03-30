import Text from "@/atoms/Text";
import DialogBox from "@/components/DialogBox";
import IconWithContainer from "@/molecules/IconWithContainer";
import InputBox from "@/molecules/InputBox";
import TextareaInput from "@/molecules/TextareaInput";
import React from "react";

const SlangForm = ({
  height,
  closeModal,
  register,
  onSubmit,
  errors,
  handleSubmit,
  isEdit,
  ...property
}) => {
  return (
    <div className={`${property.className}`} {...property}>
      <DialogBox
        height={height}
        closeModal={closeModal}
        isDisable={true}
        zIndex="z-50"
        width={"min-w-[50vw]"}
      >
        <div className="flex flex-col items-start space-y-6 md:space-y-8 w-full">
          <div className="flex justify-between w-full items-center">
            {isEdit.editable ? (
              <Text
                className="text-2xl md:text-3xl text-customGray-700"
                variant=""
              >
                Edit a slang
              </Text>
            ) : (
              <Text
                className="text-2xl md:text-3xl text-customGray-700"
                variant=""
              >
                Add a slang
              </Text>
            )}

            <IconWithContainer
              clickHandler={closeModal}
              iconColor={"#767676"}
              containerHeight={"h-8"}
              containerWidth={"w-8"}
              iconName={"close"}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-start space-y-6"
          >
            <InputBox
              label="Title"
              id="title"
              errors={errors?.title?.message}
              name="title"
              type="text"
              placeholder="Enter slang title"
              {...register("title", {
                required: "Please enter slang title of min 5 letters..",
              })}
            />

            <TextareaInput
              label="Meaning/Description"
              id="description"
              name="description"
              placeholder="Enter slang description"
              {...register("description", {
                required: "Please enter slang description of min 10 letters..",
              })}
            />
            <input
              type="submit"
              value={isEdit.editable ? "Update" : "Submit"}
              className="active:scale-90 rounded bg-customGray-900 text-white-800 
              cursor-pointer hover:drop-shadow-xl py-2 px-3 md:py-3 md:px-6 transition-all 
              duration-200 "
            />
          </form>
        </div>
      </DialogBox>
    </div>
  );
};

export default SlangForm;
