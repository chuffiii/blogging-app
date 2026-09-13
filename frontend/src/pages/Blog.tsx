import { AppBar } from "../components/AppBar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    if (loading || !blog ) {
        return <div>
            <AppBar />
            <div className="pt-5 flex justify-center">
            <div>
            <BlogSkeleton />
            <BlogSkeleton />
            </div>
        </div>
        </div>
    }
    return (
        <div>
            <div>
                <FullBlog blog={blog} />
            </div>

        </div>
    )
}