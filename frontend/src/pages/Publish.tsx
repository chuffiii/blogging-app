import axios from "axios";
import { AppBar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    async function postBlog() {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                title,
                content
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
        
        navigate(`/blog/${response.data.id}`)
        //console.log(response.data);
    }

    return (
        <div>
            <AppBar />

            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">

                    <input
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder="Title"
                    />

                    <TextEditor
                        onChange={e => setContent(e.target.value)}
                    />

                    <button
                        onClick={postBlog}
                        type="button"
                        className="mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
                    >
                        Publish blog
                    </button>

                </div>
            </div>
        </div>
    );
};

function TextEditor({
    onChange
}: {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}) {
    return (
        <div>
            <textarea
                onChange={onChange}
                rows={8}
                className="w-full mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                placeholder="Write your blog..."
            />
        </div>
    );
}