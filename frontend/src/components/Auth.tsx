import { ChangeEvent,  useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupType } from "@aditya-1304/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth = ({type} : {type:"signup" | "signin"})=> {
  const navigate = useNavigate();
  const [postInputs,setPostInputs] = useState<SignupType>({
    name : "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs)
      const jwt = response.data.jwt;
      localStorage.setItem('token',jwt);
      navigate("/blogs");
    } catch (e) {
        // alert the user here that the request failed
    }
  }

  return <div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
      <div className="">
        <div className="px-10" > 
          <div className="text-4xl font-extrabold">
              Create an account
          </div>
          <div className="text-slate-400">
              {type === "signin" ? "Don't have an account?" : "Already have an account? "}
              <Link className="pl-2 underline" to={type === "signin" ? "/signin:": "/signup"}>
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
          </div>
        </div>
        <div className="pt-8">
          {type === "signup" ? <LablledInput label="Name" placeholder="Aditya Mandal..." onChange={(e)=> {
            setPostInputs({
              ...postInputs,
              name : e.target.value
            })
          }}/> : null}
          <LablledInput label="Email" placeholder="aditya13@gmail.com" onChange={(e)=> {
            setPostInputs({
              ...postInputs,
              email : e.target.value
            })
          }}/>
          <LablledInput label="Password" type={"password"} placeholder="12345678" onChange={(e)=> {
            setPostInputs({
              ...postInputs,
              password : e.target.value
            })
          }}/>
          <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
        </div>
      </div>
    </div>
  </div>
}
interface LablledInputType {
  label : string;
  placeholder : string;
  onChange : (e: ChangeEvent<HTMLInputElement>) => void;
  type? : string;
}

function LablledInput({label ,placeholder , onChange ,type} :LablledInputType ) {
  return  <div>
    <label className="block mb-2 text-sm font-semibold text-black pt-5 text-lg">{label}</label>
    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
}