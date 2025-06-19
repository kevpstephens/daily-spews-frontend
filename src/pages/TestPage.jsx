//? URL: daily-spews.com/test

import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import ToastTester from "../components/ToastTester/ToastTester";

export default function TestPage() {
  return (
    <>
      <div className="test-page">
        <h1>Welcome to the Test Page!!!!! :DDDDD</h1>
        <ToastTester />
        <LoadingScreen />
      </div>
    </>
  );
}
