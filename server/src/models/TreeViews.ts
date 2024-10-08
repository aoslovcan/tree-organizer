import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for a tree node
interface ITreeNode extends Document {
  name: string;
  children: ITreeNode[];
}

// Define the TreeNode schema
const TreeNodeSchema: Schema = new Schema({
  name: { type: String, required: true },
  children: [
    {
      name: { type: String, required: true },
      children: { type: Array, default: [] } // Allow nesting more objects
    }
  ]
});

// Create the model
const TreeNode = mongoose.model<ITreeNode>('TreeNode', TreeNodeSchema);
export default TreeNode;
