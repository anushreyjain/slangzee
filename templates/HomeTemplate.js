"use client";

import Navbar from "@/molecules/Navbar";
import Tabs from "@/molecules/Tabs";
import Card from "@/organisms/Card";
import SlangForm from "@/organisms/SlangForm";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Button from "@/atoms/Button";
import Toaster from "@/components/Toaster";
import { toast } from "react-toastify";

const HomeTemplate = ({ allSlangs }) => {
  const [slangs, setSlangs] = useState(allSlangs);
  const [addSlangModal, setAddSlangModal] = useState(false);
  const [isEdit, setIsEdit] = useState({ id: null, editable: false });

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
      isBookmarked: false,
      isLiked: false,
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
    console.log("bookmark", id);
  };

  const handleEditSlang = (e, id) => {
    setIsEdit({ id: id, editable: true });
    const foundSlang = slangs.find((item) => item._id === id);
    setValue("title", foundSlang.title);
    setValue("description", foundSlang.description);
    setAddSlangModal(true);
  };

  const handleLikeSlang = (e, id) => {
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
        console.log("not res", res);
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

  return (
    <div>
      <Navbar />
      <Tabs />
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
      <div className="w-full grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-10">
        {slangs?.map((slang, index) => (
          <Card
            handleDeleteSlang={handleDeleteSlang}
            handleBookmark={handleBookmark}
            handleEditSlang={handleEditSlang}
            handleLikeSlang={handleLikeSlang}
            key={index}
            slang={slang}
          />
        ))}
      </div>

      <Button onClick={hanldeOpenAddSlagModal}>Add slang</Button>
    </div>
  );
};

export default HomeTemplate;
