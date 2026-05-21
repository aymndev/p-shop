import { Link } from "react-router-dom";

export default function Navbar() {
    return (

        <div className="flex flex-col ">
            <nav  className=" flex flex-row items-center gap-5 justify-between bg-green-900 h-[5rem] " >

                <h3 className="ml-[5rem] font-bold" >My Shop </h3>

                <div className="flex gap-9 m-6 font-bold text-white   ">

                    <Link to="/" >Products</Link>
                    <Link to="/orders" >Orders</Link>
                    <Link to="/login" >Login</Link>
                  

                </div>

            </nav>

        </div>

    );
}

