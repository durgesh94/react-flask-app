import React, { useEffect, useState } from "react";
import './dashboard.css'
import { Card } from "../../components/card";
import { getAllBlogs } from "../../api/blog";

export const Dashboard = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllBlogs()
            .then((data) => setPosts(data))
            .catch(() => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", padding: 4, flexWrap: "wrap", alignItem: "start" }}>
                {error && <div>{error.message}</div>}
                {loading && <div>Loading....!</div>}
                {posts && posts.map((post, idx) => {
                    return <Card key={post.title + idx} title={post.title} content={post.content} />
                })}
            </div>
        </div>
    )
}