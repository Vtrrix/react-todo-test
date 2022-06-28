import { useState } from "react";
import "./index.css";
import List from "./components/ListItem";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { listItem } from "./modals/interfaces";

export default function App() {
  enum FILTERS {
    a = "all",
    ch = "checked",
    uc = "unchecked",
  }

  const [list, setList] = useLocalStorage("test", [
    { val: "test1", check: true, key: 0 },
    { val: "test2", check: false, key: 1 },
  ]);
  const [inputData, setInputData] = useState("");
  const [filter, setFilter] = useState("all");

  const addItem = () => {
    if (inputData) {
      setList([...list, { val: inputData, check: false, key: Math.random() }]);
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
    var updatedList = list.filter((ele: listItem) => ele.key !== id);
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
          {list.map((item: listItem) => {
            if (filter === "all") {
              return (
                <List
                  item={item}
                  id={item.key}
                  setList={setList}
                  list={list}
                  deleteItem={deleteItem}
                />
              );
            }

            if (filter === "checked") {
              return item.check ? (
                <List
                  item={item}
                  id={item.key}
                  setList={setList}
                  list={list}
                  deleteItem={deleteItem}
                />
              ) : (
                <></>
              );
            }
            if (filter === "unchecked") {
              return !item.check ? (
                <List
                  item={item}
                  id={item.key}
                  setList={setList}
                  list={list}
                  deleteItem={deleteItem}
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
