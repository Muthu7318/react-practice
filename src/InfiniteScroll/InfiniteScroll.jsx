import React, { useEffect, useState, useRef, useCallback } from "react";

const PAGE_SIZE = 10;

const InfiniteScrollList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);

  // Fetch data from API
  const fetchItems = async (page) => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`
    );
    const data = await res.json();

    setItems((prev) => [...prev, ...data]);
    if (data.length < PAGE_SIZE) {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  // IntersectionObserver callback
  const lastItemRef = useCallback(
    (node) => {
      debugger;

      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        console.log("entry:", entries[0]);
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Infinite Scroll Example</h2>
      <ul>
        {items.map((item, index) => (
          <li
            key={item.id}
            ref={index === items.length - 1 ? lastItemRef : null}
            style={{
              padding: "1rem",
              border: "1px solid #ddd",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <strong>{item.id}. </strong> {item.title}
          </li>
        ))}
      </ul>

      {loading && <p>Loading more...</p>}
      {!hasMore && <p>No more data to load.</p>}
    </div>
  );
};

export default InfiniteScrollList;
