import { useEffect, useState } from "react";
import axios from "axios";

type Cat = { url: string };

export default function AxiosData() {
  const [data, setData] = useState<Cat | null>(null);

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/images/search")
      .then((res) => setData(res.data[0]))
      .catch(() => console.log("Error"));
  }, []);

  return (
    <div className="container" style={{ marginTop: 40 }}>
      <h4>Axios Data Fetch</h4>
      {data ? (
        <img src={data.url} alt="cat" style={{ maxWidth: "100%", borderRadius: 20 }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}