import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Dog = {
  message: string;
};

const fetchDog = async (): Promise<Dog> => {
  const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
  return data;
};

export default function ReactQueryData() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dog"],
    queryFn: fetchDog,
  });

  return (
    <div className="container" style={{ marginTop: 40 }}>
      <h4>React Query Fetch</h4>

      <button className="btn" onClick={() => refetch()}>
        Get Dog
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading dog</p>}

      {data && (
        <img src={data.message} style={{ maxWidth: "100%", borderRadius: 20 }} />
      )}
    </div>
  );
}