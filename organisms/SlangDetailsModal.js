import Button from "@/atoms/Button";
import Heading from "@/atoms/Heading";
import DialogBox from "@/components/DialogBox";
import IconWithContainer from "@/molecules/IconWithContainer";
import React from "react";

const SlangDetailsModal = ({
    closeModal,
    slangDetails,
    handleApprove, activeTab,
    ...property
}) => {
    return (
        <div className={`${property.className}`} {...property}>
            <DialogBox
                closeModal={closeModal}
                isDisable={true}
                zIndex="z-50"
                className="h-[90vh]"
                width={"min-w-[50vw] lg:max-w-[50vw]"}
            >
                <div className="flex flex-col items-start space-y-6 md:space-y-8 w-full relative ">
                    <div className="flex justify-between w-full">
                        <div>
                            <Heading type="h5" className="text-secondary-900">
                                Title
                            </Heading>
                            <Heading
                                type="h4"
                                className="text-white-800 font-semibold mt-0.5"
                            >
                                {slangDetails.title}
                            </Heading>
                        </div>
                        <IconWithContainer
                            clickHandler={(e) => {
                                closeModal();
                            }}
                            iconColor={"#767676"}
                            iconName={"close"}
                        />
                    </div>

                    <div className="">
                        <Heading type="h5" className="text-secondary-900">
                            Meaning/Description
                        </Heading>
                        <Heading
                            type="h5"
                            className="font-medium mt-0.5"
                        >
                            {slangDetails.description}
                        </Heading>
                    </div>
                    {activeTab === 'submission' &&
                        <div className="flex mt-5">
                            <Button
                                variant="contained"
                                size={"default"}
                                className="font-semibold"
                                onClick={(e) => { handleApprove(e, slangDetails._id) }}
                            >
                                Approve
                            </Button>
                        </div>
                    }
                </div>
            </DialogBox>
        </div>
    );
};

export default SlangDetailsModal;
