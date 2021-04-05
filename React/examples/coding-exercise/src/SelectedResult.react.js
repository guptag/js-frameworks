export default function SelectedResult(props) {
  //props.result
  if (props.result == null) {
    return null;
  }
  // {props.result.name}
  return (
    <div className={props.className}>
      <div className="selected-icon-flex">
        <div className="selected-icon-container">
          <img src={props.result.image} alt={props.result.name} />
          <h2>{props.result.name}</h2>
        </div>
        <div className="selected-meta-container">
          <div>
            <label>Kind</label>
            <label>{props.result.type}</label>
          </div>
          <div>
            <label>Created</label>
            <label>{props.result.created}</label>
          </div>
          <div>
            <label>Modified</label>
            <label>{props.result.modified}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
