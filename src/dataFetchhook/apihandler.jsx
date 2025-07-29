// apiHandler.js
// A lightweight custom hook for declarative data fetching with Axios.
// Supports automatic fetch on mount and manual re-fetching via an exposed function.
// Prevents stale results by cancelling in‑flight requests on parameter change or unmount.
//
// Usage:
// const { data, error, loading, refetch } = useApi(
//   '/api/users',     // url
//   'GET',            // method
//   { Authorization: `Bearer ${token}` }, // headers (optional)
//   null              // body / payload (optional)
// );
//
// <button onClick={refetch}>Reload</button>
//
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

/**
 * Custom React hook for Axios data fetching.
 * @param {string}  url             – The resource URL.
 * @param {string}  [method='GET']  – HTTP method (GET, POST, PUT, etc.).
 * @param {object}  [headers={}]    – Request headers.
 * @param {object}  [body=null]     – Request payload for non‑GET methods.
 * @returns {{data: any, error: any, loading: boolean, refetch: Function}}
 */
export default function useApi(url, method = "GET", headers = {}, body = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Keep track of the latest request so we can cancel or ignore older ones.
  const abortControllerRef = useRef(null);

  // Core fetch operation – memoised to avoid stale closures.
  const fetchData = useCallback(
    async (override = {}) => {
      const {
        url: oUrl = url,
        method: oMethod = method,
        headers: oHeaders = headers,
        body: oBody = body,
      } = override;

      // Cancel any in‑flight request before starting a new one.
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url: oUrl,
          method: oMethod,
          headers: oHeaders,
          data: oBody,
          signal: controller.signal,
        });
        setData(response.data);
      } catch (err) {
        // Ignore abort errors; surface everything else.
        if (!axios.isCancel(err)) setError(err);
      } finally {
        setLoading(false);
      }
    },
    [url, method, headers, body]
  );

  // Automatic fetch on mount & whenever url/method/headers/body change.
  useEffect(() => {
    fetchData();

    // Cleanup on unmount.
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}
