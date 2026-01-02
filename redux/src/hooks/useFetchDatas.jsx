import { useEffect, useState } from "react";

export const useFetchDatas = (url) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProduct(data.products);
      } catch (e) {
        console.log("Something error", e);
      }
    };

    fetchUrl();
  }, [url]);

  return { product };
};
