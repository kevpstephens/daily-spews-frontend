export default function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
