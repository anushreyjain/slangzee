"use client";

import Navbar from "@/molecules/Navbar";
import Tabs from "@/molecules/Tabs";
import Card from "@/organisms/Card";
import SlangForm from "@/organisms/SlangForm";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Toaster from "@/components/Toaster";
import { toast } from "react-toastify";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  approveSlangAPI,
  bookmarkedSlangAPI,
  deleteSlangAPI,
  getAllSlangs,
  getSingleSlang,
  likeSlangAPI,
} from "@/apis/slangs.api";
import AddSlangCard from "@/organisms/AddSlangCard";
import Loader from "@/organisms/Loader";
import SlangDetailsModal from "@/organisms/SlangDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addSlang,
  approveSlang,
  bookmarkSlang,
  deleteSlang,
  likeSlang,
  setLoader,
  setSlangs,
  updateSlang,
} from "@/redux/slices/slangSlice";
import Text from "@/atoms/Text";
import { useRouter } from "next/navigation";
import IcomoonIcon from "@/components/IcomoonIcon";

const HomeTemplate = () => {
  const slangs = useSelector((state) => state.slangs);
  const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const router = useRouter();
  const [addSlangModal, setAddSlangModal] = useState(false);
  const [slangDetails, setSlangDetails] = useState({
    slangDetails: null,
    isVisible: false,
  });
  const [isEdit, setIsEdit] = useState({ id: null, editable: false });
  const { user, error, isLoading } = useUser();

  const [activeTab, setActiveTab] = useState("everything");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      likes: 0,
      isBookmarked: [],
      isLiked: [],
      isApproved: false,
    },
  });

  const hanldeOpenAddSlagModal = () => {
    setAddSlangModal(true);
  };

  const handleCloseSlagModal = () => {
    setAddSlangModal(false);
    setIsEdit({ id: null, editable: false });
    reset();
  };

  const handleDeleteSlang = async (e, id) => {
    e.stopPropagation();
    try {
      dispatch(deleteSlang(id));
      const res = await deleteSlangAPI(id);
    } catch (error) {
      console.error("Failed to delete a slang", error);
      toast(error.message);
    }
  };

  const handleBookmark = async (e, id) => {
    e.stopPropagation();
    try {
      dispatch(bookmarkSlang({ id, userId: user._id }));
      const res = await bookmarkedSlangAPI(id);
    } catch (error) {
      console.error("Failed to like a slang", error);
    }
  };

  const handleEditSlang = (e, id) => {
    e.stopPropagation();
    setIsEdit({ id: id, editable: true });
    const foundSlang = slangs.find((item) => item._id === id);
    setValue("title", foundSlang.title);
    setValue("description", foundSlang.description);
    setAddSlangModal(true);
  };

  const handleLikeSlang = async (e, id) => {
    e.stopPropagation();
    try {
      dispatch(likeSlang({ id, userId: user._id }));
      const res = await likeSlangAPI(id);
    } catch (error) {
      console.error("Failed to like a slang", error);
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();

    if (isEdit.editable) {
      const res = await fetch(`/api/slangs/${isEdit.id}`, {
        method: "PUT",
        body: JSON.stringify({ data }),
      });

      if (!res.ok) {
        //error handling
        toast("Failed to update slang");
      } else {
        dispatch(
          updateSlang({
            id: isEdit.id,
            title: data.title,
            description: data.description,
          })
        );
        toast("Slang Updated");
      }
    } else {
      const res = await fetch("/api/slangs", {
        method: "POST",
        body: JSON.stringify({ data }),
      });

      if (!res.ok) {
        // error handling
        toast("Failed to create slang");
      } else {
        const resData = (await res.json())?.data;
        dispatch(addSlang(resData));
        toast("Slang Created");
      }
    }
    reset();
    setAddSlangModal(false);
  };

  const tabs = [
    { id: 1, title: "Everything", value: "everything", icon: "house" },
    { id: 2, title: "Trending", value: "trending", icon: "fire" },
    {
      id: 3,
      title: "My Creativity",
      value: "my-creativity",
      icon: "brush",
    },
    { id: 4, title: "Saved", value: "saved", icon: "bookmark" },
  ];

  if (user) {
    // if (user.role === "user") {
    //   tabs.push(
    //     {
    //       id: 3,
    //       title: "My Creativity",
    //       value: "my-creativity",
    //       icon: "brush",
    //     },
    //     { id: 4, title: "Saved", value: "saved", icon: "bookmark" }
    //   );
    // }

    if (user.role === "admin") {
      tabs.push({
        id: 5,
        title: "Submission",
        value: "submission",
        icon: "save",
      });
    }
  }

  const handleActiveTabChange = async (activeTab) => {
    switch (activeTab) {
      case "everything":
        dispatch(setLoader(true));
        try {
          const { allSlangs } = await getAllSlangs({ isApproved: "true" });
          dispatch(setSlangs(allSlangs));
        } catch (error) {
          console.error("Error fetching all slangs:", error);
        } finally {
          dispatch(setLoader(false));
        }
        break;

      case "trending":
        dispatch(setLoader(true));
        try {
          const sortedSlangs = await getAllSlangs({
            isApproved: "true",
            sortLikes: true,
          });
          dispatch(setSlangs(sortedSlangs.allSlangs));
        } catch (error) {
          console.error("Error fetching all slangs:", error);
        } finally {
          dispatch(setLoader(false));
        }
        break;

      case "my-creativity":
        dispatch(setLoader(true));
        try {
          const mySlangs = await getAllSlangs({ mySlangs: true });
          dispatch(setSlangs(mySlangs.allSlangs));
        } catch (error) {
          console.error("Error fetching user's slangs:", error);
        } finally {
          dispatch(setLoader(false));
        }
        break;

      case "saved":
        dispatch(setLoader(true));
        try {
          const savedSlangs = await getAllSlangs({ saved: true });
          dispatch(setSlangs(savedSlangs.allSlangs));
        } catch (error) {
          console.error("Error fetching saved slangs:", error);
        } finally {
          dispatch(setLoader(false));
        }
        break;

      case "submission":
        dispatch(setLoader(true));
        try {
          const allPendingSlangs = await getAllSlangs({ isApproved: "false" });
          dispatch(setSlangs(allPendingSlangs.allSlangs));
        } catch (error) {
          console.error("Error fetching pending slangs:", error);
        } finally {
          dispatch(setLoader(false));
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    handleActiveTabChange(activeTab);
  }, [activeTab]);

  const tabHandler = (value) => {
    if (!user && (value === "my-creativity" || value === "saved")) {
      router.push("/api/auth/login");
      return;
    }
    setActiveTab(value);
  };

  const handleFloatingAddSlang = () => {
    if (!user) {
      router.push("/api/auth/login");
      return;
    }

    hanldeOpenAddSlagModal();
  };

  const handleOpenCard = async (e, id) => {
    const { foundSlang } = await getSingleSlang(id);
    setSlangDetails({ slangDetails: foundSlang, isVisible: true });
  };

  const handleCloseSlangDetailsModal = () => {
    setSlangDetails({ slangDetails: null, isVisible: false });
  };

  const handleApproveSlang = async (e, id) => {
    e.stopPropagation();
    try {
      dispatch(approveSlang({ id }));
      const res = await approveSlangAPI(id);
    } catch (error) {
      console.error("Failed to approve a slang", error);
    }
  };

  return (
    <div className="lg:max-w-[112.5rem] w-full">
      <Navbar />
      <div className="">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          tabHandler={tabHandler}
          className="mb-8"
        />
      </div>
      <Toaster />
      {addSlangModal && (
        <SlangForm
          isEdit={isEdit}
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          closeModal={handleCloseSlagModal}
        />
      )}

      {slangDetails.isVisible && (
        <SlangDetailsModal
          handleApprove={handleApproveSlang}
          slangDetails={slangDetails.slangDetails}
          activeTab={activeTab}
          closeModal={handleCloseSlangDetailsModal}
        />
      )}
      {loader ? (
        <Loader />
      ) : (
        <div className="h-[calc(100svh-13rem)] relative scrollbar lg:h-[calc(100svh-18rem)] overflow-y-auto lg:px-10">
          {activeTab === "everything" && (
            <Text
              variant="bodySmall"
              className={"text-secondary-900 tracking-wide mb-5"}
            >
            Slangs approved and posted by everyone will be listed here.
            </Text>
          )}
          {activeTab === "my-creativity" && (
            <Text
              variant="bodySmall"
              className={"text-secondary-900 tracking-wide mb-5"}
            >
              Slangs created by you will be listed here.
            </Text>
          )}

          {activeTab === "saved" && (
            <Text
              variant="bodySmall"
              className={"text-secondary-900 tracking-wide mb-5"}
            >
              Slangs saved by you will be listed here.
            </Text>
          )}

          {activeTab === "trending" && (
            <Text
              variant="bodySmall"
              className={"text-secondary-900 tracking-wide mb-5"}
            >
              Slangs will be sorted based on number of likes.
            </Text>
          )}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:gap-10 gap-5">
            {activeTab === "my-creativity" && (
              <AddSlangCard handleAddSlang={hanldeOpenAddSlagModal} />
            )}
            {slangs?.map((slang, index) => (
              <Card
                handleDeleteSlang={handleDeleteSlang}
                handleBookmark={handleBookmark}
                handleOpenCard={handleOpenCard}
                handleEditSlang={handleEditSlang}
                handleLikeSlang={handleLikeSlang}
                user={user}
                activeTab={activeTab}
                key={index}
                slang={slang}
              />
            ))}
          </div>

          <div
            onClick={handleFloatingAddSlang}
            className="rounded-lg px-4 right-5 lg:right-20
           fixed bottom-3 lg:bottom-10 cursor-pointer hover:scale-95 transition-all py-3 border border-secondary-900"
          >
            <IcomoonIcon icon={"plus"} size={20} color={"#f79d65"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeTemplate;
