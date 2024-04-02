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
import { getAllSlangs, getSingleSlang } from "@/apis/slangs.api";
import AddSlangCard from "@/organisms/AddSlangCard";
import Loader from "@/organisms/Loader";
import SlangDetailsModal from "@/organisms/SlangDetailsModal";

const HomeTemplate = () => {
  const [slangs, setSlangs] = useState([]);
  const [addSlangModal, setAddSlangModal] = useState(false);
  const [slangDetails, setSlangDetails] = useState({
    slangDetails: null,
    isVisible: false,
  });
  const [loader, setLoader] = useState(true);
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
    const slangsAfteDelete = slangs.filter((item) => id !== item._id);
    setSlangs(slangsAfteDelete);
    const res = await fetch(`http://localhost:3000/api/slangs/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast("Failed to delete slang");
    } else {
      toast("Slang Deleted");
    }
  };

  const handleBookmark = (e, id) => {
    e.stopPropagation();
    console.log("bookmark", id);
  };

  const handleEditSlang = (e, id) => {
    e.stopPropagation();
    setIsEdit({ id: id, editable: true });
    const foundSlang = slangs.find((item) => item._id === id);
    setValue("title", foundSlang.title);
    setValue("description", foundSlang.description);
    setAddSlangModal(true);
  };

  const handleLikeSlang = (e, id) => {
    e.stopPropagation();
    console.log("like", id);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    let currentAllSlangs = [...slangs];
    if (isEdit.editable) {
      const updatedSlang = slangs.map((slang) => ({
        ...slang,
        title: slang._id === isEdit.id ? data.title : slang.title,
        description:
          slang._id === isEdit.id ? data.description : slang.description,
      }));
      setSlangs(updatedSlang);
      const res = await fetch(`/api/slangs/${isEdit.id}`, {
        method: "PUT",
        body: JSON.stringify({ data }),
      });
      if (!res.ok) {
        //error handling
        setSlangs(currentAllSlangs);
        toast("Failed to update slang");
      } else {
        toast("Slang Updated");
      }
    } else {
      setSlangs((prev) => {
        return [...prev, data];
      });
      const res = await fetch("/api/slangs", {
        method: "POST",
        body: JSON.stringify({ data }),
      });
      if (!res.ok) {
        // error handling
        setSlangs(currentAllSlangs);
        toast("Failed to create slang");
      } else {
        const resData = (await res.json())?.data;
        setSlangs((prev) => {
          return [...currentAllSlangs, resData];
        });
        toast("Slang Created");
      }
    }
    reset();
    setAddSlangModal(false);
  };

  const tabs = [
    { id: 1, title: "Everything", value: "everything" },
    { id: 2, title: "Trending", value: "trending" },
  ];
  if (user) {
    if (user.role === "user") {
      tabs.push(
        { id: 3, title: "My Creativity", value: "my-creativity" },
        { id: 4, title: "Saved", value: "saved" }
      );
    }

    if (user.role === "admin") {
      tabs.push(
        { id: 3, title: "My Creativity", value: "my-creativity" },
        { id: 4, title: "Saved", value: "saved" },
        { id: 5, title: "Submission", value: "submission" }
      );
    }
  }

  const handleActiveTabChange = async (activeTab) => {
    switch (activeTab) {
      case "everything":
        setLoader(true);
        const { allSlangs } = await getAllSlangs({ isApproved: "true" });
        setSlangs(allSlangs);
        setLoader(false);
        break;

      case "trending":
        console.log("trending");
        break;

      case "my-creativity":
        setLoader(true);
        const mySlangs = await getAllSlangs({
          mySlangs: true
        });
        setSlangs(mySlangs.allSlangs);
        setLoader(false);
        break;

      case "saved":
        console.log("saved");
        break;

      case "submission":
        setLoader(true);
        const allPendingSlangs = await getAllSlangs({
          isApproved: "false",
        });
        setSlangs(allPendingSlangs.allSlangs);
        setLoader(false);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    handleActiveTabChange(activeTab);
  }, [activeTab]);

  const tabHandler = (value) => {
    setActiveTab(value);
  };

  const handleOpenCard = async (e, id) => {
    const { foundSlang } = await getSingleSlang(id);
    setSlangDetails({ slangDetails: foundSlang, isVisible: true });
  };

  const handleCloseSlangDetailsModal = () => {
    setSlangDetails({ slangDetails: null, isVisible: false });
  };

  return (
    <div>
      <Navbar />
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        tabHandler={tabHandler}
        className="mb-10"
      />
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
          slangDetails={slangDetails.slangDetails}
          closeModal={handleCloseSlangDetailsModal}
        />
      )}
      {loader ? (
        <Loader />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
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
      )}
    </div>
  );
};

export default HomeTemplate;
