import { useState, useEffect } from "react";
import useAuth from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;
    console.log("axiosFetch", configObj);
    try {
      setLoading(true);

      // create a new AbortController instance for each request to avoid memory leaks
      const controller = new AbortController();
      setController(controller);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: controller.signal,
      });
      // console.log(res);
      setResponse(res.data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(controller);

    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export default useAxios;
