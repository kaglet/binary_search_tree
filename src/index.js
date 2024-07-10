import BST from "./bst.js";

let tree = new BST();

function createArray(size) {
    let arr = [];
    let i = 0;
    while (i < size) {
        arr[i] = Math.floor(Math.random() * 100);
        i++;
    }

    return arr;
}

// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let arr = createArray(2);
tree.root = tree.buildTree(arr, 0, arr.length);

tree.prettyPrint(tree.root)
console.log(tree.isBalanced());

console.log(tree.levelorder(tree.root));
console.log(tree.preorder(tree.root));
console.log(tree.inorder(tree.root));
console.log(tree.postorder(tree.root));
