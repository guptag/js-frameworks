import "./Search.css";
export default function Search(props) {
  return (
    <div className={props.className}>
      <input
        type="text"
        className="search-input"
        onChange={(e) => props.onChange(e.target.value)}
        value={props.searchToken}
      ></input>
    </div>
  );
}
