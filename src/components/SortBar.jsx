export default function SortBar() {
  return (
    <>
      <select className="sort-bar">
        Sort by
        <option value="">Sort by</option>
        <option value="">Newest</option>
        <option value="">Oldest</option>
        <option value="">Most liked</option>
        <option value="">Most comments</option>
      </select>
    </>
  );
}
