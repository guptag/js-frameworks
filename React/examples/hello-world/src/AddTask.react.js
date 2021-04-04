import { StyleSheet, css } from "aphrodite";
import { useState } from "react";

const styles = StyleSheet.create({
  mainContainer: {},

  addTaskContainer: {
    display: "flex",
    alignItems: "center",
    margin: "0 0 0 20px",
  },

  addInput: {
    width: "200px",
  },

  addIcon: {
    fontSize: "0.75em",
    margin: "0 4px",
  },
});

export default function AddTask(props) {
  const [description, setDescription] = useState("");

  const addNew = (desc) => {
    props.onAddNew(desc);
    setDescription("");
  };
  return (
    <span className={css(styles.addTaskContainer)}>
      <input
        autoFocus={true}
        value={description}
        className={css(styles.addInput)}
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13 /* enter */) {
            addNew(description);
          }
        }}
      />
      <button
        className={css(styles.addIcon)}
        onClick={() => {
          addNew(description);
        }}
      >
        <i className={"fas fa-plus"} title="Add"></i>
      </button>
    </span>
  );
}
