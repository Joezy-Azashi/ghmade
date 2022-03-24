// import { MyContext } from "../../contextStore/sampleindex";
import { useContext } from "react";

export default function LoadData() {
  // const { data, loading, more, load } = useContext(MyContext);
  const loading = false;
  const more = false;
  const data = [];
  return (
    <div className="App">
      {data.map((row) => (
        <p key={row}>{row}</p>
      ))}

      {loading && <p>Loading...</p>}

      {!loading && more && <LoadMore />}
    </div>
  );

  function LoadMore() {
    // const { load } = useContext(MyContext);

    return (
      <p className="container">
        <button
          type="button"
          className="btn btn-primary rounded-pill"
          // onClick={load}
        >
          Load More
        </button>
      </p>
    );
  }
}
