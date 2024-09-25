
import { useState } from "react";
import SearchBar from "./SearchBar";
import FilterMenu from "./FilterMenu";
import CountriesList from "./CountriesList";
import { useTheme } from "../hooks/useTheme";


const Home = () => {

    const [query, setQuery] = useState('');
    const [isDark] = useTheme();

    return (
        <main className={`${isDark ? 'dark' : ''}`}>
        <div className="search-filter-container">
          <SearchBar setQuery={setQuery} />
          <FilterMenu setQuery={setQuery} />
        </div>
          <CountriesList query={query} />
      </main>
    )
}

export default Home;