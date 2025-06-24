import "./SortBar.css";
import { useSearchParams } from "react-router-dom";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Most liked", value: "votes" },
  { label: "Most comments", value: "comment_count" },
];

const ORDER_OPTIONS = [
  { label: "Descending", value: "desc" },
  { label: "Ascending", value: "asc" },
];

export default function SortBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value === "newest") {
      newParams.set("sort_by", "created_at");
      newParams.set("order", "desc");
    } else if (value === "oldest") {
      newParams.set("sort_by", "created_at");
      newParams.set("order", "asc");
    } else if (value === "votes" || value === "comment_count") {
      newParams.set("sort_by", value);
      newParams.set("order", "desc");
    } else {
      newParams.delete("sort_by");
      newParams.delete("order");
    }

    setSearchParams(newParams);
  };

  const handleOrderChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", e.target.value);
    setSearchParams(newParams);
  };

  const getSelectedSortValue = () => {
    if (sort_by === "created_at" && order === "desc") return "newest";
    if (sort_by === "created_at" && order === "asc") return "oldest";
    return sort_by || "";
  };

  return (
    <>
      <div className="sort-bar-container">
        <select
          className="sort-bar"
          id="sort-bar-sort-by-bar"
          onChange={handleSortChange}
          value={getSelectedSortValue()}
        >
          <option value="">--Sort by--</option>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          className="sort-bar"
          id="sort-bar-topic-bar"
          onChange={handleOrderChange}
          value={order || ""}
        >
          <option value="">--Order--</option>
          {ORDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
