import React, { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../assets/firebase";
const Input = () => {
  const [textData, setTextData] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "UserList", auth.currentUser.uid), {
      todolist: arrayUnion(textData),
    });
    setTextData("");
  };
  return (
    <div>
      <form>
        <div className="mt-9 flex flex-col gap-3 bg-gradient-to-r from-blue-200 to-blue-500 rounded-lg px-1 py-4 sm:flex-row">
          <input
            onChange={(e) => setTextData(e.target.value)}
            value={textData}
            type="text"
            placeholder="Enter your chores"
            className="text-center mx-7 rounded-full p-2 text-black"
          />
          <input
            onClick={(e) => handleSubmit(e)}
            type="submit"
            value="Add"
            className="bg-blue-700 m-auto px-5 py-2  rounded-full text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default Input;
