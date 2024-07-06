import BST from "./bst.js";

let tree = new BST();
let root = tree.root;
// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// tree.root = tree.buildTree(arr);
// tree.insert(tree.root, 1000);
// console.log(tree.prettyPrint(tree.root));

root = tree.insert(root, 50);
root = tree.insert(root, 30);
root = tree.insert(root, 20);
root = tree.insert(root, 40);
root = tree.insert(root, 70);
root = tree.insert(root, 60);
root = tree.insert(root, 80);

root = tree.delete(root, 20);
root = tree.delete(root, 70);
root = tree.delete(root, 50);

console.log(tree.prettyPrint(root));
console.log(tree.find(root, 80));



