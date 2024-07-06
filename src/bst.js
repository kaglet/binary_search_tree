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
}

export default BST;