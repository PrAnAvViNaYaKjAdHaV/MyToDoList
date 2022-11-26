import { list } from "postcss";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { auth, db } from "../assets/firebase";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
const List = () => {
  const [data, setData] = useState([]);
  if (auth.currentUser === null) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const GetItemsFromList = async () => {
          try {
            const querySnapshot = onSnapshot(
              doc(db, "UserList", user.uid),
              (doc) => {
                const Data = { ...doc.data() };
                setData(Data.todolist);
              }
            );
          } catch (error) {
            console.log(error);
          }
        };
        GetItemsFromList();
      } else {
        setData(["login plzz"]);
      }
    });
  }

  const handleDelte = async (letter) => {
    await updateDoc(doc(db, "UserList", auth.currentUser.uid), {
      todolist: arrayRemove(letter),
    });
  };
  return (
    <div className=" flex justify-center items-center flex-col mt-9 p-5 bg-gradient-to-r from-blue-200 to-blue-500 rounded-lg">
      {(data.length === 0 ? ["Enter your chores"] : data).map((letter, i) => (
        <div key={i} className="flex items-baseline w-full">
          <p className="w-full text-center p-4 text-black hover:border-4 border-indigo-500/100 rounded-md bg-white m-1 ">
            {letter}
          </p>
          <span className=" ml-2">
            <ImCross
              style={{ color: "white" }}
              onClick={() => handleDelte(letter)}
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default List;
