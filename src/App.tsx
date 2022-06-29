import { useState } from "react";
import "./index.css";
import ListItem from "./components/ListItem";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ListItemType } from "./models/interfaces";

export default function App() {
  enum FILTERS {
    a = "all",
    ch = "checked",
    uc = "unchecked",
  }

  const [list, setList] = useLocalStorage("test", [
    { label: "test1", checked: true, id: 0 },
    { label: "test2", checked: false, id: 1 },
  ]);
  const [inputData, setInputData] = useState("");
  const [filter, setFilter] = useState("all");

  const addItem = () => {
    if (inputData) {
      setList([
        ...list,
        { label: inputData, checked: false, id: Math.random() },
      ]);
      setInputData("");
    }
  };

  const clearList = () => {
    setList([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const deleteItem = (id: number) => {
    var updatedList = list.filter((ele: ListItemType) => ele.id !== id);
    setList(updatedList);
  };

  const filterList = (type: FILTERS) => {
    setFilter(type);
  };

  return (
    <div className="App">
      <div className="input">
        <input
          className="add-item-input"
          type="text"
          value={inputData}
          onChange={handleInputChange}
        />
        <button className="item-button" onClick={addItem}>
          Add
        </button>
        <button className="item-button" onClick={clearList}>
          Clear
        </button>
      </div>
      <div className="filter">
        <button
          className="item-button"
          onClick={() => {
            filterList(FILTERS.a);
          }}
        >
          All
        </button>
        <button
          className="item-button"
          onClick={() => {
            filterList(FILTERS.ch);
          }}
        >
          Checked
        </button>
        <button
          className="item-button"
          onClick={() => {
            filterList(FILTERS.uc);
          }}
        >
          Unchecked
        </button>
      </div>
      <div className="list">
        <ul>
          {list.map((item: ListItemType) => {
            if (filter === "all") {
              return (
                <ListItem
                  item={item}
                  id={item.id}
                  setList={setList}
                  list={list}
                  onDeleteItem={deleteItem}
                />
              );
            }

            if (filter === "checked") {
              return item.checked ? (
                <ListItem
                  item={item}
                  id={item.id}
                  setList={setList}
                  list={list}
                  onDeleteItem={deleteItem}
                />
              ) : (
                <></>
              );
            }
            if (filter === "unchecked") {
              return !item.checked ? (
                <ListItem
                  item={item}
                  id={item.id}
                  setList={setList}
                  list={list}
                  onDeleteItem={deleteItem}
                />
              ) : (
                <></>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
