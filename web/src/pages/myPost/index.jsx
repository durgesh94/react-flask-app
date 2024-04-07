import React, { useEffect, useState } from "react";
import { Card } from "../../components/card";
import { getPostByUser } from "../../api/blog";
import { useAuth } from "../../providers/authProvider";

export const MyPost = () => {

    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPostByUser(user?._id)
            .then((data) => setPosts(data))
            .catch(() => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", padding: 4, flexWrap: "wrap", alignItem: "start" }}>
                {error && <div>{error.message}</div>}
                {loading && <div>Loading....!</div>}
                {posts.length === 0 && <div>No Post</div>}
                {posts && posts.map((post, idx) => {
                    return <Card key={post.title + idx} title={post.title} content={post.content} />
                })}
            </div>
        </div>
    )
}