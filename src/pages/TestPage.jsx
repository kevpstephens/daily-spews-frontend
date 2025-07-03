/** ============================================================
 *! TestPage.jsx
 *? URL: daily-spews.com/test

 * Test page for development purposes. 
 *============================================================ */

// import ErrorMessageCard from "../components/ErrorMessageCard/ErrorMessageCard.";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import ToastTester from "../components/ToastTester/ToastTester";

export default function TestPage() {
  return (
    <>
      <div className="test-page">
        {/* <SortAndTopicBar /> */}
        {/* <h1>Welcome to the Test Page!!!!! :DDDDD</h1> */}
        <ToastTester />
        <LoadingScreen />
        {/* <ErrorBoundary /> */}
      </div>
    </>
  );
}

// ? Below is the test for the Error Boundary.
// import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

// function BuggyComponent() {
//   // Intentionally throw an error
//   throw new Error("oops, i crashed! :s");
// }

// export default function App() {
//   return (
//     <ErrorBoundary>
//       <BuggyComponent />
//     </ErrorBoundary>
//   );
// }
