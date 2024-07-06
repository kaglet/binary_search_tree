import BST from "./bst.js";

let tree = new BST();
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

tree.root = tree.buildTree(arr);
console.log(tree.prettyPrint(tree.root));
