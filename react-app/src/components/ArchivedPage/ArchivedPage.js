import "./ArchivedPage.css";
import React, { useEffect } from "react";
import { getArchivedNotes } from "../../store/note";
import { useDispatch, useSelector, connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";

function ArchivedPage(props) {
  const dispatch = useDispatch();
  const { archived, user, update} = props;

  useEffect(() => {
    if (user) {
      dispatch(getArchivedNotes());
    }
  }, [update]);

  if (!archived) {
    return null
  }

  return (
    <div>
      <div className="archived-container">
        <h1>Archived:</h1>
        {archived.length &&
          archived.map((note) => {
            if (
              note.archived === true &&
              note.pinned === false &&
              user.id === note.user_id
            ) {
              return (
                <div
                  className="note-div"
                  style={{ backgroundColor: `${note.color}` }}
                >
                  <div className="note-content">{note.content}</div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    archived: state.note.archived,
    user: state.session.user,
    update: state.note.update,
  };
};

export default connect(mapStateToProps, null)(ArchivedPage);
