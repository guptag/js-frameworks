import Search from "./Search.react";
import SearchResults from "./SearchResults.react";
import SelectedResult from "./SelectedResult.react";
import "./SpotlightComponent.css";
import { useEffect } from "react";
import useSearchResultsReducer from "./data/useSearchResultsReducer";
import SearchService from "./data/SearchService";

export default function SpotlightComponent() {
  const { data, dispatch } = useSearchResultsReducer();

  const onSearchChange = (searchQuery) => {
    dispatch({
      type: "APPLY_FILTER",
      searchQuery: searchQuery,
    });
  };

  const searchQuery = data.searchQuery;
  const filteredResults = data.filteredResults;

  const onSelected = (name) => {
    dispatch({
      type: "SET_SELECTED",
      selectedName: name,
    });
  };

  useEffect(() => {
    dispatch({
      type: "LOAD_FROM_LOCAL", //todo: move to constants
      state: JSON.parse(localStorage.getItem("spotlight")),
    });
    async function fetchData() {
      var allResults = await SearchService.fetchData();
      dispatch({
        type: "LOAD_ALL_RESULTS", //todo: move to constants
        results: allResults,
      });
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="spotlight-container">
      <Search
        className="spotlight-search"
        onChange={onSearchChange}
        searchToken={searchQuery}
      />
      <div className="spotlight-main">
        <SearchResults
          className="spotlight-results"
          results={filteredResults}
          onSelected={onSelected}
          highlightResult={data.selectedResult}
        />
        <SelectedResult
          className="spotlight-search"
          result={data.selectedResult}
        />
      </div>
    </div>
  );
}
