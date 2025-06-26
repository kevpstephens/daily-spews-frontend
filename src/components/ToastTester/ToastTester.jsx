import "./ToastTester.css";
import { toast } from "react-toastify";

export default function ToastTester() {
  return (
    <>
      <div className="toast-tester">
        <button
          onClick={() =>
            toast.warning("This is a warning toast! ⚠️", {
              position: "top-left",
              className: "toast-message",
              autoClose: 10000000,
            })
          }
        >
          Warning Toast
        </button>

        <button
          onClick={() =>
            toast.success("This is a success toast! ✅", {
              position: "top-center",
              className: "toast-message",
              autoClose: 10000000,
            })
          }
        >
          Success Toast
        </button>

        <button
          onClick={() =>
            toast.error("This is an error toast! ❌", {
              position: "top-right",
              className: "toast-message",
              autoClose: 10000000,
            })
          }
        >
          Error Toast
        </button>

        <button
          onClick={() =>
            toast.info("This is an info toast! ℹ️", {
              position: "bottom-left",
              className: "toast-message",
              autoClose: 10000000,
            })
          }
        >
          Info Toast
        </button>

        <button
          onClick={() =>
            toast("This is a default toast! 💬", {
              position: "bottom-center",
              className: "toast-message",
              autoClose: 10000000,
            })
          }
        >
          Default Toast
        </button>

        <button
          onClick={() =>
            toast(
              <div>
                <strong>Custom JSX Toast 🧪</strong>
                <p>This toast uses custom content and layout.</p>
              </div>,
              {
                position: "bottom-right",
                className: "toast-message",
                autoClose: 10000000,
              }
            )
          }
        >
          Generic Custom Toast
        </button>

        <button
          onClick={() =>
            toast(
              <div>
                <strong>❌ Failed to Login ❌</strong>
                <p>This toast uses custom content and layout.</p>
              </div>,
              {
                position: "bottom-right",
                className: "toast-message",
                autoClose: 10000000,
              }
            )
          }
        >
          Custom Toast
        </button>
      </div>
    </>
  );
}
