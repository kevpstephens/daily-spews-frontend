import "./ToastTester.css";
import { toast } from "react-toastify";

export default function ToastTester() {
  return (
    <>
      <div className="toast-tester">
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

        <button
          onClick={() =>
            toast.success(
              "💜 Hello dear friend, do not be alarmed, this is a test toast!!!!!!!",
              {
                position: "top-right",
                className: "toast-message",
              }
            )
          }
        >
          Show Test Toast
        </button>
      </div>
    </>
  );
}
