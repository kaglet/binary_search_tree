import Node from "./node.js";

class BST {
    constructor() {
        this.root = null;
        this.array = null;
    }

    buildTree(array) {
        let processedArr = array.sort((a, b) => a - b).filter((item, i, array) => {
            return item !== array[i - 1];
        });

        console.log(processedArr);
    }
}

export default BST;