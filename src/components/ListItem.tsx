import { useState } from "react";
import { listItem } from "../modals/interfaces";
import { listItemProps } from "../modals/interfaces";

export default function List({
  id,
  setList,
  list,
  deleteItem,
  item,
}: listItemProps) {
  const [editInput, setEditInput] = useState("");
  const [editVisible, setEditVisible] = useState(false);

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInput(e.target.value);
  };

  const updateCheck = () => {
    var updatedList: listItem[] = [];
    list.map((ele) => {
      if (ele.key === id) {
        updatedList.push({
          val: ele.val,
          check: !ele.check,
          key: ele.key,
        });
      } else {
        updatedList.push(ele);
      }
    });
    setList(updatedList);
  };

  const openEdit = () => {
    setEditVisible(true);
  };
  const closeEdit = () => {
    setEditVisible(false);
  };
  const updateText = () => {
    var updatedList: listItem[] = [];
    list.map((ele) => {
      if (ele.key === id) {
        updatedList.push({
          val: editInput,
          check: ele.check,
          key: ele.key,
        });
      } else {
        updatedList.push(ele);
      }
    });
    setList(updatedList);
    setEditInput("");
    closeEdit();
  };
  return (
    <div>
      <li className="listItem">
        {editVisible ? <></> : <button onClick={openEdit}>Edit</button>}
        <button
          onClick={() => {
            deleteItem(id);
          }}
        >
          Delete
        </button>
        <label>{item.val}</label>

        <input type="checkbox" checked={item.check} onClick={updateCheck} />
      </li>

      {editVisible ? (
        <div className="editTask">
          <input
            className="add-item-input"
            type="text"
            value={editInput}
            onChange={handleEditInputChange}
          />
          <button onClick={updateText}>Update</button>

          <button onClick={closeEdit}>Cancel</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

// use local storage for task list and create hooks to add remove etc
//add filter for all / completed / not completed
