import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import List from "./components/List";
import { createContext, useState } from "react";

export const SearchContext = createContext("");

function App() {

  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{query, setQuery}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<List />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchContext.Provider>
  );
}

export default App;
