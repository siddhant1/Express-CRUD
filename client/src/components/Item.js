import React from "react";
export const Item = ({ item, deleteItem, editData }) => {
  return (
    <React.Fragment>
      <tr>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>
          <button
            onClick={() => deleteItem(item._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
          <button onClick={() => editData(item)} className="btn btn-info">
            EDIT
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
};
