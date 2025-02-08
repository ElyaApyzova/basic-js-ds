const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);
    if (this._root === null) {
      this._root = newNode;
    } else {
      this.insertNode(this._root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this.searchNode(this._root, data) !== null;
  }

  find(data) {
    return this.searchNode(this._root, data);
  }

  searchNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.searchNode(node.left, data);
    } else if (data > node.data) {
      return this.searchNode(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this._root = this.removeNode(this._root, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null; // Node not found
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      // Node to be deleted found

      // Case 1: Node has no children
      if (node.left === null && node.right === null) {
        return null;
      }

      // Case 2: Node has only one child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Case 3: Node has two children
      // Find the minimum node in the right subtree
      const minNode = this.findMinNode(node.right);
      node.data = minNode.data; // Replace the node's data with the minimum node's data
      node.right = this.removeNode(node.right, minNode.data); // Remove the minimum node
      return node;
    }
  }

  findMinNode(node) {
    if (node === null) {
      return null; // Handle null case
    }
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  min() {
    if (this._root === null) {
      return null;
    }
    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (this._root === null) {
      return null;
    }
    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};