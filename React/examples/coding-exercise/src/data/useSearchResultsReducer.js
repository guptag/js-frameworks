import { useReducer } from "react";

function saveState(state) {
  // localStorage.setItem("spotlight", JSON.stringify(state));
  return state;
}
function reducer(state, action) {
  switch (action.type) {
    case "LOAD_FROM_LOCAL":
      if (action.state == null) {
        return state;
      }
      state = {
        ...state,
      };

      console.log("locak", state);
      return state;

    case "LOAD_ALL_RESULTS":
      state = {
        ...state,
        allResults: [...action.results],
        filteredResults: [],
        searchQuery: "",
        selectedResult: null,
      };
      return saveState(state);

    case "APPLY_FILTER":
      if (!action.searchQuery) {
        return {
          ...state,
          filteredResults: [],
          searchQuery: "",
          selectedResult: null,
        };
      }

      const filteredResults = state.allResults.filter(
        (item) => (item.name || "").indexOf(action.searchQuery) >= 0
      );

      return saveState({
        ...state,
        filteredResults: filteredResults,
        searchQuery: action.searchQuery,
        selectedResult: filteredResults[0],
      });

    case "SET_SELECTED":
      return saveState({
        ...state,
        selectedResult:
          state.filteredResults.filter(
            (result) => result.name === action.selectedName
          )[0] || null,
      });

    default:
      return state;
  }
}

export default function useSearchResultsReducer() {
  const [state, dispatch] = useReducer(reducer, {
    allResults: [],
    filteredResults: [],
    searchQuery: "",
    selectedResult: null,
  });

  return { data: state, dispatch };
}
