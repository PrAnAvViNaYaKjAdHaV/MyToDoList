import { useState } from "react";
import "./App.css";
import { AiOutlineGoogle } from "react-icons/ai";
import List from "./components/List.components";
import Input from "./components/Input.components";
import { singIn, auth, SingOutUser } from "./assets/firebase";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const [logo, setLogo] = useState(false);
  const helperGoogle = () => {
    if (auth.currentUser) {
      SingOutUser();
      console.log("singOut");
    } else {
      singIn();
      console.log("singIn");
    }
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLogo(true);
    } else {
      setLogo(false);
    }
  });
  return (
    <div className=" h-screen bg-white">
      <main className="p-2 max-w-md m-auto">
        <nav className="p-4 flex justify-between items-baseline">
          <h1 className=" text-black text-4xl font-semibold">
            Todo <span className="text-blue-500">List</span>
          </h1>
          <ul className="flex">
            <li
              onClick={() => {
                helperGoogle();
              }}
            >
              <AiOutlineGoogle
                size={30}
                style={{
                  color: logo ? "rgb(59 130 246)" : "gray",
                }}
              />
            </li>
          </ul>
        </nav>
        <List />
        <Input />
      </main>
    </div>
  );
}

export default App;
