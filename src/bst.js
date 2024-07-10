import Node from "./node.js";
import { Queue } from '@datastructures-js/queue';

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
        if (this.find(root, value)) {
            return;
        }

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
    }

    find(root, value) {
        if (root === null) {
            return false;
        } else if (root.data === value) {
            return true;
        } 

        return this.find(root.left, value) || this.find(root.right, value);
    }

    // Fix default callback implementation which is to return an array
    levelorder(root, callback = undefined) {
        let q = new Queue();
        let resultsArr = [];
        q.enqueue(root);
        while (q.size() !== 0) {
            // TODO: Get queue that pops first element not the last one
            let node = q.dequeue();
            
            if (callback === undefined) {
                resultsArr.push(node.data);
            } else {
                callback(node);
            }

            if (node.getLeft() !== null) {
                q.enqueue(node.getLeft());
            }
            
            if (node.getRight() !== null) {
                q.enqueue(node.getRight());
            }
        }     

        if (callback === undefined) {
            return resultsArr;
        }
    }

    inorder(root, callback = undefined) {
        if (root === null) return [];

        if (callback === undefined) {
            return [...this.inorder(root.getLeft()), root.data, ...this.inorder(root.getRight())];
        } else {
            this.inorder(root.getLeft(), callback);
            callback(root);
            this.inorder(root.getRight(), callback);
        }
    }

    preorder(root, callback = undefined) {
        if (root === null) return [];

        if (callback === undefined) {
            return [root.data, ...this.inorder(root.getLeft()), ...this.inorder(root.getRight())];
        } else {
            callback(root);
            this.inorder(root.getLeft(), callback);
            this.inorder(root.getRight(), callback);
        }
    }

    postorder(root, callback = undefined) {
        if (root === null) return [];

        if (callback === undefined) {
            return [...this.inorder(root.getLeft()), ...this.inorder(root.getRight()), root.data]; 
        } else {
            this.inorder(root.getLeft(), callback);
            this.inorder(root.getRight(), callback);
            callback(root);
        }
    }


    height(root) {
        if (root === null) return - 1;

        let heightLeft = this.height(root.getLeft());
        let heightRight = this.height(root.getRight());

        return 1 + Math.max(heightLeft, heightRight);
    }

    // Return depth of node including if it does not exist or it is the root node
    // We traverse from the root, but the root's left is always the same I mean the new root then
    depth(node, root) {
        // If you get to a root and it is -1 you did not find the node in this branch
        // the left or right branch rather should detect and return a number, the other branch will be avoided
        // ask what is your depth if you have the target node
        if (node === null || root === null) return -1;
    
        if (root.data === node.data) return 0;
    
        let leftDepth = this.depth(node, root.getLeft());

        if (leftDepth >= 0) {
            return 1 + leftDepth;
        }
        
        let rightDepth = this.depth(node, root.getRight());
    
        // Only one of them left or right will yield a value greater than or equal to 0 since the target node is only found in one path not both recursively
        if (rightDepth >= 0 ) {
            return 1 + rightDepth;
        }
    
        return -1;
    }

    isBalanced() {
        if (this.root === null) return true;
        let heightDiff = this.height(this.root.getLeft()) - this.height(this.root.getRight());

        if (Math.abs(heightDiff) > 1) {
            return false;
        }

        return true;
    }

    rebalance() {
        if (this.isBalanced()) return this.root;

        let arrayOfNodes = this.inorder(this.root);

        return this.buildTree(arrayOfNodes);
    }
}

export default BST;