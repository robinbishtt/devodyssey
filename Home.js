import React, { useEffect, useState } from "react";
import axios from "../api/api";
import PostCard from "../components/PostCard";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => { axios.get("/posts/trending").then(res => setTrending(res.data)); }, []);

  const handleSearch = async e => {
    setSearch(e.target.value);
    const res = await axios.get(`/posts/search?q=${e.target.value}`);
    setResults(res.data);
  };

  return (
    <div>
      <input type="text" value={search} onChange={handleSearch} placeholder="Search posts..." />
      <h2>Trending Posts</h2>
      {trending.map(p => <PostCard key={p._id} post={p} />)}
      {search && results.map(p => <PostCard key={p._id} post={p} />)}
    </div>
  );
};

export default Home;
        
