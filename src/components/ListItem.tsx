import { useState, ChangeEvent } from "react";
import { ListItemType } from "../models/interfaces";

interface ListItemProps {
  id: number;
  setList: (list: ListItemType[]) => {};
  list: ListItemType[];
  onDeleteItem: (id: number) => void;
  item: ListItemType;
}

export default function ListItem({
  id,
  setList,
  list,
  onDeleteItem,
  item,
}: ListItemProps) {
  const [editInput, setEditInput] = useState("");
  const [editVisible, setEditVisible] = useState(false);

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditInput(e.target.value);
  };

  const updateCheck = () => {
    var updatedList: ListItemType[] = [];
    list.map((ele) => {
      if (ele.id === id) {
        updatedList.push({
          label: ele.label,
          checked: !ele.checked,
          id: ele.id,
        });
      } else {
        updatedList.push(ele);
      }
    });
    setList(updatedList);
  };
  // move to App.tsx

  const openEdit = () => {
    setEditVisible(true);
  };
  const closeEdit = () => {
    setEditVisible(false);
  };
  const updateText = () => {
    var updatedList: ListItemType[] = [];
    list.map((ele) => {
      if (ele.id === id) {
        updatedList.push({
          label: editInput,
          checked: ele.checked,
          id: ele.id,
        });
      } else {
        updatedList.push(ele);
      }
    });
    setList(updatedList);
    setEditInput("");
    closeEdit();
  };
  //change

  return (
    <li className="listItem">
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
        <>
          {editVisible ? <></> : <button onClick={openEdit}>Edit</button>}
          <button
            onClick={() => {
              onDeleteItem(id);
            }}
          >
            Delete
          </button>
          <label>{item.label}</label>

          <input type="checkbox" checked={item.checked} onClick={updateCheck} />
        </>
      )}
    </li>
  );
}

// use local storage for task list and create hooks to add remove etc
//add filter for all / completed / not completed
