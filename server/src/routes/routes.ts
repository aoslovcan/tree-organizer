import express, { Application, Request, Response } from 'express';
import TreeNode from '../models/TreeViews';
import { v4 as uuidv4 } from 'uuid';

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

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  // First, find the node by its ID
  TreeNode.findById(id)
    .then(async (nodeToDelete) => {
      if (!nodeToDelete) {
        return res.status(404).json({ message: 'Node not found' });
      }

      // Recursively delete child nodes
      const deleteChildren = async (node: any): Promise<void> => {
        if (node.children && node.children.length > 0) {
          // Use Promise.all to delete all children concurrently
          await Promise.all(
            node.children.map(async (child: any) => {
              const childNode = await TreeNode.findById(child._id);
              if (childNode) {
                // Recursive call to delete the children of the current child
                await deleteChildren(childNode);
                // Delete the child node itself
                await childNode.deleteOne();
              }
            })
          );
        }
      };

      // Delete the children first
      await deleteChildren(nodeToDelete);

      // Finally, delete the main node
      await nodeToDelete.deleteOne();

      // After deleting the node and its children, respond to the client
      return res.status(200).json({ message: 'Node and its children deleted successfully' });
    })
    .catch((error) => {
      // Handle errors here
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

      console.log('Parent', parentNode);

      // Create a new child node
      const newChild = new TreeNode({
        id: uuidv4(),
        name: childName
        //children: [] // Start with no children
      });

      console.log(newChild);

      // Add the new child node to the parent's children array
      parentNode?.children.push(newChild); // Store the new child's ID in the parent's children field

      // Save the new child node to the database
      await newChild.save();

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

export default router;
