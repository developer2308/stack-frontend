import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import List from "./components/List";
import Detail from "./components/Detail";
import Error from "./components/Error";
import Sites from "./components/Sites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          <Route path="/search" element={<List />} />
          <Route path="/questions/:id/:title?" element={<Detail />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
