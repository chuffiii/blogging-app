import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = () => {
    const user = JSON.parse(localStorage.getItem("user")||"{}");
    return <div className="border-b flex justify-between px-10 py-2">
        <div className="flex flex-col justify-center font-bold text-2xl">
            <Link to="/blogs">Blogging App</Link>
        </div>
        <div className="flex items-center gap-4">
            <Link to={"/publish"}>
                <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 focus:outline-none">
                    New
                </button>
            </Link>
            <Link to={"/"}>
                <button type="button"
                    onClick={() => localStorage.removeItem("token")}
                    className="text-white bg-green-600 hover:bg-red-600 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 focus:outline-none">
                    Log out
                </button>
            </Link>
            <div className="hidden lg:block">
                <Avatar name={user.name || "User"} size="big" />
            </div>
        </div>

    </div>
}