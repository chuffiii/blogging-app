import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config";
import { useSearchParams } from "react-router-dom";

export interface Blog {
    content: string,
    title: string,
    id: string,
    createdAt: string,
    author: {
        name: string
    }
}

export const useBlogs = () => {

    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
                page,
                limit
            }
        })
            .then(response => {
                setBlogs(response.data);
                setLoading(false);
            })


    }, [page,limit])

    return {
        loading,
        blogs,
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(response => {
                setBlog(response.data);
                setLoading(false);
            })

    }, [id])

    return {
        loading,
        blog
    }
}
