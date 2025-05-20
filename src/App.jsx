import { dummyUser } from "./data/dummyUser";
import "./styles/App.css";
import PageHeader from "./components/PageHeader";

export default function App() {
  return (
    <>
      <h3>*Home Page*</h3>
      <header>
        <PageHeader />
      </header>
    </>
  );
}
