import { toast } from "react-toastify";

export default function ToastTester() {
  return (
    <>
      <button
        onClick={() =>
          toast.success(
            "💜 Hello dear friend, do not be alarmed, this is a test toast!!!!!!!"
          )
        }
      >
        Show Test Toast
      </button>

      <button
        onClick={() =>
          toast.warning("This is a custom toast Notification!", {
            position: "top-left",
            className: "toast-message",
          })
        }
      >
        2nd Test Toast
      </button>
    </>
  );
}
