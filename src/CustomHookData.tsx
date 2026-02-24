import useFetch from "./useFetch";

type Show = {
  name: string;
  summary: string;
  image?: { medium: string };
};

export default function CustomHookData() {
  const { data, loading, error } = useFetch<Show>("https://api.tvmaze.com/shows/1");

  return (
    <div className="container" style={{ marginTop: 40 }}>
      <h4>Custom Hook Data Fetch</h4>

      {loading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}

      {data && (
        <div>
          <h5>{data.name}</h5>

          <div
            dangerouslySetInnerHTML={{
              __html: data.summary,
            }}
          />

          {data.image?.medium && (
            <img
              src={data.image.medium}
              alt={data.name}
              style={{ maxWidth: "100%", borderRadius: 20 }}
            />
          )}
        </div>
      )}
    </div>
  );
}