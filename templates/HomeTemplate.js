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
import { bookmarkedSlangAPI, getAllSlangs, getSingleSlang, likeSlangAPI } from "@/apis/slangs.api";
import AddSlangCard from "@/organisms/AddSlangCard";
import Loader from "@/organisms/Loader";
import SlangDetailsModal from "@/organisms/SlangDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import {
    addSlang,
    bookmarkSlang,
    deleteSlang,
    likeSlang,
    setLoader,
    setSlangs,
    updateSlang,
} from "@/redux/slices/slangSlice";

const HomeTemplate = () => {
    const slangs = useSelector((state) => state.slangs);
    const loader = useSelector((state) => state.loader);
    const dispatch = useDispatch();
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
            const res = await fetch(`http://localhost:3000/api/slangs/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                toast("Failed to delete slang");
            } else {
                dispatch(deleteSlang(id)); // Dispatch the deleteSlang action with the deleted slang ID
                toast("Slang Deleted");
            }
        } catch (error) {
            console.error("Error deleting slang:", error);
            toast("Failed to delete slang");
        }
    };

    const handleBookmark = async (e, id) => {
        e.stopPropagation();
        try {
            dispatch(bookmarkSlang({ id, userId: user._id }));
            const res = await bookmarkedSlangAPI(id);
            if (!res.ok) {
                console.error("Failed to like a slang", res.error);
            }
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
            if (!res.ok) {
                console.error("Failed to like a slang", res.error);
            }
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
                    const sortedSlangs = await getAllSlangs({ isApproved: "true", sortLikes: true });
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
