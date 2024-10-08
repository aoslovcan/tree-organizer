export interface TreeNodeType {
  id: string;
  name: string;
  children: TreeNodeType[]; // Array of child node ids
}
