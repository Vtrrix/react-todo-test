export interface listItem {
  val: string;
  check: boolean;
  key: number;
}
export interface listItemProps {
  id: number;
  setList: (list: listItem[]) => {};
  list: listItem[];
  deleteItem: (id: number) => void;
  item: listItem;
}
