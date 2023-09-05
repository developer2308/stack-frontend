import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import List from "./components/List";
import { createContext, useState } from "react";
import Detail from "./components/Detail";
import Error from "./components/Error";

export const SearchContext = createContext("");

function App() {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<List />} />
            <Route path="/questions/:id/:title?" element={<Detail />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchContext.Provider>
  );
}

export default App;
