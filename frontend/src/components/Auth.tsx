import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { SignupType } from "@chuffiii/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupType>({
        name: "",
        password: "",
        email: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt)
            localStorage.setItem("user", JSON.stringify({name:response.data.name}))
            navigate("/blogs")
        }
        catch (e) {
            console.log(e);
            alert("Error while signing up");
        }

    }

    return (
        <div className="flex justify-center flex-col h-screen ">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold">
                            Create an account
                        </div>
                        <div className="font-light text-slate-500 pl-5 mb-5">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-2">
                        {type === "signup" ? <LabelledInput label="Username" placeholder="Enter your username" onchange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} /> : null}
                        <LabelledInput label="Email" placeholder="m@example.com" onchange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }} />
                        <LabelledInput label="Password" type={"password"} placeholder="xyz....." onchange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }} />
                        <button onClick={sendRequest} type="button" className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-4 py-2.5">
                            {type === "signup" ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onchange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabelledInput({ label, placeholder, onchange, type }: LabelledInputType) {
    return <div className="mb-4">
        <label className="block mb-2 text-sm text-black font-semibold"> {label} </label>
        <input onChange={onchange} type={type || "text"} id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} required />
    </div>
}