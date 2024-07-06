import Node from "./node.js";

class BST {
    constructor() {
        this.root = null;
        this.array = null;
    }

     recursivelyBuild(array, start, end) {
        if (start > end) {
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let root = new Node(array[mid]);

        root.setLeft(this.recursivelyBuild(array, start, mid - 1));
        root.setRight(this.recursivelyBuild(array, mid + 1, end));

        return root;
    }

     buildTree(array) {
        let processedArr = array.sort((a, b) => a - b).filter((item, i, array) => {
            return item !== array[i - 1];
        });

        return this.recursivelyBuild(processedArr, 0, processedArr.length);
    }

     prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.getRight() !== null) {
          this.prettyPrint(node.getRight(), `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.getLeft() !== null) {
          this.prettyPrint(node.getLeft(), `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

     insert(root, value) {
        if (root === null) {
            return new Node(value);
        }

        // Will either set the left or right child with a new node somewhere along the line
        if (value < root.data) {
            // Set property (same thing happens under hood whether implicitly or explicitly)
            // So do not let use of a function confuse you in the recursion over an explicit assignment
            root.setLeft(this.insert(root.getLeft(), value));
        } else {
            root.setRight(this.insert(root.getRight(), value));
        }

        // Return same node possibly with an altered reference in one of its children
        return root;    
    }

     delete(root, value) {
        if (root === null) {
            return new Node(value);
        }

        if (value < root.data) {
            root.setLeft(this.delete(root.getLeft(), value));
            return root;
        } else if(value > root.data) {
            root.setRight(this.delete(root.getRight(), value));
            return root;
        }

        if (root.getRight() === null && root.getLeft() === null) {
            return null;
        }

        // If only one is null between left and right return the opposite up to the parent
        if (root.getRight() === null) {
            return root.getLeft();
        }

        if (root.getLeft() === null) {
            return root.getRight();
        }

        // If both left and right are not null (2 children)
        // Get node with next smallest value
        let succParent = root;
        let succ = root.getRight();
        while (succ.getLeft() !== null) {
            succParent = succ;
            succ = succ.getLeft();
        }

        // Copy the successor node's data to the original root
        root.data = succ.data;

        if (succParent.getLeft() === succ) {
            succParent.setLeft(succ.getRight());
        } else {
            succParent.setRight(succ.getRight());
        }

        return root;
            
        // If value vs root.data found this root is the node to be deleted, therefore consider different cases for deletion
        // If you are deleting a node it depends what you are returning in it's place for the parent node setting its left and right children in the recursion
        /* You can return either null not to be confused with the other null base case for when you return null which the left and right child of the parent was already set to.
        This is due to the root being null so when returned into the parent it was always null originally anyways. */
        /* If the root to delete has one child that is also easy. Simply return its child for its parent to pick up when the recursion is over and it is setting it's right or left child
        as the path the recursion follows. */
        /* If the root to delete has two children begin doing the following: 
           1. Move to it's right subtree. 
           2. Move to it's leftmost node in it's right subtree.
           2. then recursively delete that element. 
        */
    }
}

export default BST;