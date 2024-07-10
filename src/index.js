import BST from "./bst.js";

let tree = new BST();
// let root = tree.root;
// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// tree.root = tree.buildTree(arr);
// tree.insert(tree.root, 1000);
// console.log(tree.prettyPrint(tree.root));

tree.root = tree.insert(tree.root, 50);
tree.root = tree.insert(tree.root, 30);
tree.root = tree.insert(tree.root, 20);
tree.root = tree.insert(tree.root, 40);
tree.root = tree.insert(tree.root, 70);
tree.root = tree.insert(tree.root, 60);
tree.root = tree.insert(tree.root, 80);

// tree.root = tree.delete(tree.root, 20);
// tree.root = tree.delete(tree.root, 70);
// tree.root = tree.delete(tree.root, 50);

console.log(tree.root);
console.log(tree.prettyPrint(tree.root));
console.log(tree.find(tree.root, 80));

console.log(tree.levelorder(tree.root));
console.log(tree.preorder(tree.root));
console.log(tree.postorder(tree.root));
console.log(tree.inorder(tree.root));

console.log(tree.height(tree.root));
console.log(tree.depth(null, tree.root));
