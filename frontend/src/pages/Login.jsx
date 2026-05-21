import { useState } from "react";
import api from "../api/axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            alert("Logged in!");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="flex justify-center min-h-screen items-center ">
            <div className="flex justify-center rounded-lg h-[30rem] w-[30rem] flex-col bg-green-900">
                <div className="p-5">
                    <h1 className="text-center font-bold text-xl">Login</h1>

                </div>
                <div className="flex flex-col  items-center">


                    <div>
                        <p className="text-start font-bold p-1 ">E-mail</p>
                        <input className="bg-white text-balck p-3 rounded-lg w-[17rem]" placeholder="email" onChange={e => setEmail(e.target.value)} />

                    </div>
                    <div>
                        <p className="pt-5 font-bold p-1 ">Password</p>
                        <input className="bg-white text-balck p-3  rounded-lg w-[17rem]" placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />

                    </div>



                    <button className="mt-5 rounded-lg  bg-green-400 hover:bg-green-500 h-[3rem] w-[17rem] mb-5" onClick={handleLogin}>Login</button>
                    <span className="text-center font-bold">
                        Create
                        <a className="text-blue-600 font-bold  hover:underline" href=""> new acount </a>
                    </span>
                </div>
            </div>
        </div>
    );
}