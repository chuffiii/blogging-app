import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading,blogs} = useBlogs();
    if (loading) {
        return <div>
            <AppBar />
            <div className="pt-5 flex justify-center">
            <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            </div>
        </div>
        </div>
    }
    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div>
                    {blogs.map(posts=><BlogCard
                        key={posts.id}
                        id={posts.id}
                        authorName={posts.author.name || "Anonymous"}
                        publishedDate={posts.createdAt}
                        title={posts.title}
                        content={posts.content}
                    />)}
                    
                </div>
            </div>
        </div>
    )
}