import { StyleSheet, css } from "aphrodite";
import { useState } from "react";

const styles = StyleSheet.create({
  mainContainer: {},

  viewTaskContainer: {
    display: "flex",
    alignItems: "center",
  },

  taskDescription: {
    display: "inline-block",
    width: "200px",
    padding: "10px",
    overflowWrap: "break-word",
  },

  editIcon: {
    fontSize: "0.75em",
    margin: "0 4px",
  },

  deleteIcon: {
    fontSize: "0.75em",
    margin: "0 4px",
  },

  editTaskContainer: {
    display: "flex",
    alignItems: "center",
  },

  editDescInput: {
    width: "200px",
  },

  confirmIcon: {
    fontSize: "0.75em",
    margin: "0 4px",
  },

  cancelIcon: {
    fontSize: "0.75em",
    margin: "0 4px",
  },
});

export default function TaskItem(props) {
  const [editMode, setEditMode] = useState(false);

  const [draftDescription, setDraftDescription] = useState(
    props.task.description
  );

  const updateDraft = (e) => setDraftDescription(e.target.value);

  const confirmDraft = () => {
    props.onUpdate(draftDescription);
    setEditMode(false);
  };

  const cancelDraft = () => {
    setDraftDescription(props.task.description);
    setEditMode(false);
  };

  const viewTask = (
    <span className={css(styles.viewTaskContainer)}>
      <span className={css(styles.taskDescription)}>
        {props.task.description}
      </span>
      <button
        className={css(styles.editIcon)}
        onClick={() => setEditMode(!editMode)}
      >
        <i className={"fas fa-pen"} title="edit"></i>
      </button>
      <button className={css(styles.deleteIcon)} onClick={props.onDelete}>
        <i className={"fas fa-trash"} title="delete"></i>
      </button>
    </span>
  );

  const editTask = (
    <span className={css(styles.editTaskContainer)}>
      <input
        autoFocus={true}
        className={css(styles.editDescInput)}
        type="text"
        value={draftDescription}
        onChange={updateDraft}
        onKeyDown={(e) => {
          if (e.keyCode === 13 /* enter */) {
            confirmDraft();
          }

          if (e.keyCode === 27 /* esc */) {
            cancelDraft();
          }
        }}
      />
      <button className={css(styles.confirmIcon)} onClick={confirmDraft}>
        <i className={"fas fa-check"} title="confirm"></i>
      </button>
      <button className={css(styles.cancelIcon)} onClick={cancelDraft}>
        <i className={"fas fa-window-close"} title="cancel"></i>{" "}
      </button>
    </span>
  );
  return <>{!editMode ? viewTask : editTask}</>;
}
