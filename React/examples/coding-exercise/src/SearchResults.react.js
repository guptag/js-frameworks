import _ from "lodash";

function ResultGroup(props) {
  //props.groupName //props.groupResults //props.onSelected
  return (
    <section className="search-results-group-container">
      <h3>{props.groupName}</h3>
      <ul>
        {props.groupResults.map((result, index) => {
          return (
            <li
              className={
                props.isHighlightName === result.name ? "highlight" : ""
              }
              key={index}
              onClick={() => props.onSelected(result.name)}
            >
              {result.name}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function SearchResults(props) {
  const groupedResults = _.groupBy(props.results, (result) => result.type);

  const highlightNameInTopResult =
    props.results.length > 0 &&
    props.highlightResult?.name === props.results[0].name
      ? props.results[0].name
      : null;

  const highlightNameInGroup =
    !highlightNameInTopResult && props.highlightResult != null
      ? props.highlightResult.name
      : null;

  console.log("123", highlightNameInGroup, props.highlightResult?.name);
  return (
    <div className={props.className}>
      {props.results.length > 0 && (
        <ResultGroup
          groupName="Top Hit"
          groupResults={[props.results[0]]}
          onSelected={props.onSelected}
          isHighlightName={highlightNameInTopResult}
        />
      )}
      {Object.keys(groupedResults).map((groupName) => {
        return (
          <ResultGroup
            key={groupName}
            groupName={groupName}
            groupResults={groupedResults[groupName]}
            onSelected={props.onSelected}
            isHighlightName={highlightNameInGroup}
          />
        );
      })}
    </div>
  );
}
