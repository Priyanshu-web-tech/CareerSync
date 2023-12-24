import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { MdModeEditOutline } from "react-icons/md";
import { motion } from 'framer-motion';


import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const theme = useSelector((state) => state.theme);
  const defaultAvatarURL =
    "https://static.thenounproject.com/png/363640-200.png";

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      Swal.fire({
        text: "User Updated Successfully",
        confirmButtonColor: "teal",
        background: `${theme.darkMode ? "#1e293b" : ""}`,
        color: `${theme.darkMode ? "white" : ""}`,
      });
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      Swal.fire({
        text: "Error in updating User",
        confirmButtonColor: "red",
        background: `${theme.darkMode ? "#1e293b" : ""}`,
        color: `${theme.darkMode ? "white" : ""}`,
      });
    }
  };

  const handleDeleteUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "teal",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: `${theme.darkMode ? "#1e293b" : ""}`,
      color: `${theme.darkMode ? "white" : ""}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(deleteUserStart());
          const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            Swal.fire({
              icon: "error",
              title: "Error",
              text: data.message,
              background: `${theme.darkMode ? "#1e293b" : ""}`,
              color: `${theme.darkMode ? "white" : ""}`,
            });
            return;
          }
          dispatch(deleteUserSuccess(data));
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User deleted successfully!",
            background: `${theme.darkMode ? "#1e293b" : ""}`,
            color: `${theme.darkMode ? "white" : ""}`,
          });
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error in deleting user",
            background: `${theme.darkMode ? "#1e293b" : ""}`,
            color: `${theme.darkMode ? "white" : ""}`,
          });
        }
      }
    });
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  return (
    <motion.div
    initial={{y: 50 }}
    animate={{ y: 0 }}
    exit={{y: -50 }}
    transition={{ duration: 0.5 }}
      className={`flex items-center justify-center min-h-screen  ${
        theme.darkMode ? "dark:bg-slate-700 text-white" : "bg-neutral-200"
      }`}
    >
      <motion.div
       initial={{scale: 0.5 }}
       animate={{ scale: 1 }}
       transition={{ duration: 0.5 }}
      className="p-8 max-w-md w-full">
        <motion.h1
        initial={{y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-semibold text-center mb-4">Profile</motion.h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          {/* Profile image */}
          <div className="relative">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar || defaultAvatarURL}
              alt="profile"
              className="rounded-full h-24 w-24 object-cover cursor-pointer"
            />
            <label className="absolute bottom-0 right-0 rounded-full bg-teal-700  px-2 py-1 cursor-pointer">
              <MdModeEditOutline />
            </label>
          </div>

          {/* File upload status message */}
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-slate-500">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-teal-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-teal-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>

          {/* Input fields  */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              type="text"
              placeholder="name"
              defaultValue={currentUser.name}
              id="name"
              className="border p-3  text-black rounded-lg w-full"
              onChange={handleChange}
            />

            <label htmlFor="username" className="text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              defaultValue={currentUser.username}
              id="username"
              className="border p-3 text-black rounded-lg w-full"
              onChange={handleChange}
            />

            <label htmlFor="email" className="text-sm font-semibold">
              E-mail
            </label>

            <input
              type="email"
              placeholder="email"
              id="email"
              defaultValue={currentUser.email}
              className="border p-3  text-black   rounded-lg w-full"
              onChange={handleChange}
            />

            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              id="password"
              className="border p-3  text-black  rounded-lg w-full"
            />

            <label htmlFor="resume" className="text-sm font-semibold">
              Resume Link
            </label>
            <input
              type="text"
              placeholder="resume link"
              defaultValue={currentUser.resume}
              id="resume"
              className="border p-3   text-black  rounded-lg w-full"
              onChange={handleChange}
            />
          </div>

         
        </form>

        {/* Sign out and Delete account button  */}
        <div className="flex flex-col gap-3 mt-3">
          <button
            onClick={handleDeleteUser}
            className="bg-slate-500 text-white rounded-lg py-3 uppercase hover:opacity-95"
          >
            Delete Account
          </button>
          <button
            onClick={handleSignOut}
            className="bg-slate-500 text-white rounded-lg py-3 uppercase hover:opacity-95"
          >
            Sign Out
          </button>
        </div>

        {/* Display error messages */}
        <p className="text-slate-500 mt-5">{error ? error : ""}</p>
      </motion.div>
    </motion.div>
  );
}
