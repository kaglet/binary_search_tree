class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    setLeft(node) {
        this.left = node;
    }

    setRight(node) {
        this.right = node;
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.right;
    }
}

export default Node;