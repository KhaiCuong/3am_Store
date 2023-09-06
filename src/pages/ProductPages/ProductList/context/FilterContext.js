import { useState, createContext } from "react";

const FilterContext = createContext();
// eslint-disable-next-line
function FilterProvider({ children }) {
  const [sort, setSort] = useState("");
  const [fKey, setFKey] = useState("");

  const valueProvide = {
    sort,
    setSort,
    fKey,
    setFKey,
  };
  return <FilterContext.Provider value={valueProvide}>{children}</FilterContext.Provider>;
}

export { FilterContext, FilterProvider };
