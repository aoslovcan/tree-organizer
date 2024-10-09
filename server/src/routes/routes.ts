import express, { Request, Response } from 'express';
import TreeNode from '../models/TreeViews';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId, Types } from 'mongoose';

const router = express.Router();
// Get all tree nodes
router.get('/', async (req: Request, res: Response) => {
  try {
    const treeData = await TreeNode.find();
    res.json(treeData);
  } catch (error: unknown) {
    // Type check for error
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

// Add initial tree data
router.post('/seed', async (req: Request, res: Response) => {
  const treeData = [
    {
      id: uuidv4(),
      name: 'Root',
      children: [
        {
          id: uuidv4(),
          name: 'Child 1',
          children: [
            { id: uuidv4(), name: 'Grandchild 1', children: [] },
            { id: uuidv4(), name: 'Grandchild 2', children: [] }
          ]
        },
        {
          id: uuidv4(),
          name: 'Child 2',
          children: []
        },
        {
          id: uuidv4(),
          name: 'Child 3',
          children: [{ id: uuidv4(), name: 'Grandchild 3', children: [] }]
        }
      ]
    },
    {
      id: uuidv4(),
      name: 'Root 2',
      children: [
        {
          id: uuidv4(),
          name: 'Child 1',
          children: [
            { id: uuidv4(), name: 'Grandchild 1', children: [] },
            { id: uuidv4(), name: 'Grandchild 2', children: [] }
          ]
        },
        {
          id: uuidv4(),
          name: 'Child 2',
          children: []
        },
        {
          id: uuidv4(),
          name: 'Child 3',
          children: [{ id: uuidv4(), name: 'Grandchild 3', children: [] }]
        }
      ]
    }
  ];
  try {
    await TreeNode.deleteMany(); // Clear existing data
    await TreeNode.insertMany(treeData); // Insert new data
    res.status(201).json({ message: 'Tree data seeded successfully' });
  } catch (error: unknown) {
    // Type check for error
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

function filterTreeData(data: any[], idToDelete: string): any[] {
  return data
    .map((node) => {
      const id = node.id | node._id;
      // If the current node matches the id to delete, return null to exclude it
      if (id.toString() == idToDelete) {
        return null;
      }

      // If the node has children, recursively filter the children
      if (node.children && node.children.length > 0) {
        const filteredChildren = filterTreeData(node.children, idToDelete);
        // Only keep the node if it has children left after filtering
        return {
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : undefined
        };
      }

      // If the node doesn't match and has no children, return the node
      return node;
    })
    .filter((node) => node !== null); // Remove any null entries (i.e., deleted nodes)
}

// Recursive function to filter out nodes by their ID
function normalizeTreeData(nodes: any[]): any[] {
  return nodes.map((node) => {
    console.log(node);

    const id = node.id | node._id;

    // Check if `node.id` is valid, and only then attempt to use `toHexString()`
    if (id) {
      if (Types.ObjectId.isValid(id)) {
        node.id = new Types.ObjectId(id); // Convert valid id to ObjectId
      } else {
        throw new Error(`Validation error: Invalid id format for node with name ${node.name}`);
      }
      delete node.id; // Remove `id` field after assigning _id
    }

    // If `_id` is not set, ensure it is present
    if (!node._id) {
      throw new Error(`Validation error: Node is missing '_id' for node with name ${node.name}`);
    }

    // Validate if node has a name
    if (!node.name) {
      throw new Error(`Validation error: Node with _id ${node._id} does not have a name.`);
    }

    // Recursively handle children
    if (node.children && node.children.length > 0) {
      node.children = normalizeTreeData(node.children);
    }

    return node;
  });
}
router.delete('/:parentId/:id', (req, res, next) => {
  const { id, parentId } = req.params;

  TreeNode.findById(parentId)
    .then(async (parentNode) => {
      if (!parentNode) {
        return res.status(404).json({ message: 'Parent node not found' });
      }

      const childIndex = parentNode.children.findIndex((child) => {
        // Ensure child._id is of type ObjectId or cast to string
        return (child._id as Types.ObjectId).toString() === id;
      });

      if (childIndex === -1) {
        return res.status(404).json({ message: 'Child node not found under this parent' });
      }

      parentNode.children.splice(childIndex, 1);

      await TreeNode.findByIdAndUpdate(parentId, { children: parentNode.children });
      // Step 5: Delete the child node itself from the database
      await TreeNode.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Child node deleted successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    });
});

router.patch('/move-child/:sourceRootId/:childId/:targetRootId', async (req, res) => {
  const { sourceRootId, childId, targetRootId } = req.params;
  TreeNode.findById(sourceRootId)
    .then(async (sourceRoot) => {
      if (!sourceRoot) {
        return res.status(404).json({ message: 'Source root not found' });
      }

      const childIndex = sourceRoot.children.findIndex((child) => {
        // Ensure child._id is of type ObjectId or cast to string
        return (child._id as Types.ObjectId).toString() === childId;
      });

      if (childIndex === -1) {
        return res.status(404).json({ message: 'Child node not found under this parent' });
      }

      const [childNode] = sourceRoot.children.splice(childIndex, 1);

      const targetRoot = await TreeNode.findById(targetRootId);

      if (!targetRoot) {
        return res.status(404).json({ message: 'Target root not found' });
      }

      targetRoot.children.push(childNode);
      await sourceRoot.save();
      await targetRoot.save();
      return res.status(200).json({
        message: 'Child node moved successfully',
        sourceRoot,
        targetRoot
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    });
});

router.post('/:parentId/children', (req, res, next) => {
  const { parentId } = req.params; // Extract parentId from route parameters
  const { childName } = req.body; // Extract childName from the request body

  // Find the parent node by its ID
  TreeNode.findById(parentId)
    .then(async (parentNode) => {
      if (!parentNode) {
        return res.status(404).json({ message: 'Parent node not found' });
      }

      // Create a new child node
      const newChild = new TreeNode({
        id: uuidv4(),
        name: childName
        //children: [] // Start with no children
      });

      // Add the new child node to the parent's children array
      parentNode?.children.push(newChild); // Store the new child's ID in the parent's children field

      // Save the updated parent node with the new child reference
      await parentNode.save();

      // Respond with success message
      return res.status(201).json({
        message: 'Child node added successfully',
        newChild: newChild,
        parentNode: parentNode
      });
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
      res.status(500).json({
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    });
});
router.post('/root', async (req, res) => {
  const { childName } = req.body; // Extract new name from the request body

  // Create a new object to be added
  TreeNode.find()
    .then(async (data) => {
      const newChild = new TreeNode({
        id: uuidv4(),
        name: childName
        //children: [] // Start with no children
      });

      data.push(newChild);

      await TreeNode.deleteMany(); // Clear existing data
      await TreeNode.insertMany(data);

      return res.status(201).json({
        message: 'Root node added successfully',
        newChild: newChild
      });
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
      res.status(500).json({
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    });
});

export default router;
