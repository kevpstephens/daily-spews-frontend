import { useSearchParams } from "react-router-dom";

export default function SortBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  function handleSortChange(event) {
    const sortByValue = event.target.value;

    if (sortByValue === "newest") {
      searchParams.set("sort_by", "created_at");
      searchParams.set("order", "desc");
    } else if (sortByValue === "oldest") {
      searchParams.set("sort_by", "created_at");
      searchParams.set("order", "asc");
    } else if (sortByValue === "votes") {
      searchParams.set("sort_by", "votes");
      searchParams.set("order", "desc");
    } else if (sortByValue === "comment_count") {
      searchParams.set("sort_by", "comment_count");
      searchParams.set("order", "desc");
    } else {
      searchParams.set("sort_by", "");
      searchParams.set("order", "");
    }
    setSearchParams(searchParams);
  }

  function handleOrderChange(event) {
    searchParams.set("order", event.target.value);
    setSearchParams(searchParams);
  }

  function sortByValue() {
    if (sort_by === "created_at" && order === "desc") return "newest";
    if (sort_by === "created_at" && order === "asc") return "oldest";
    return sort_by || "";
  }

  return (
    <>
      <div className="sort-bar-container">
        <select
          className="sort-bar"
          id="sort-bar-sort-by-bar"
          onChange={handleSortChange}
          value={sortByValue()}
        >
          <option value="">--Sort by--</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="votes">Most liked</option>
          <option value="comment_count">Most comments</option>
        </select>

        <select
          className="sort-bar"
          id="sort-bar-topic-bar"
          onChange={handleOrderChange}
          value={order || ""}
        >
          <option value="">--Order--</option>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </>
  );
}
