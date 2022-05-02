const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

const L = "left", R = "right";

class BinarySearchTree {
    constructor() {
        this._root = null;
    }

    root() {
        return this._root;
    }

    add(x) {
        let n = new Node(x);
        if (this._root === null) { this._root = n; }
        else {
            let current = this._root;
            while (!n.parent) {
                if (x < current.data) {
                    if (current.left === null) {
                        current.left = n;
                        n.parent = current;
                        n.backlink = L;
                    }
                    else { current = current.left; }
                } else {
                    if (current.right === null) {
                        current.right = n;
                        n.parent = current;
                        n.backlink = R;
                    }
                    else { current = current.right; }
                }
            }
        }
    }

    find(x) {
        let current = this._root;
        while (current !== null) {
            if (current.data == x) { return current; }
            current = (x < current.data) ? current.left : current.right;
        }
        return current;
    }

    has(x) { return this.find(x) !== null; }

    _getLimit(direction, current=this._root) {
        if (current === null) { return null; }
        while (current[direction] !== null) { current = current[direction]; }
        return current;
    }

    remove(x) {
        let n = this.find(x);
        if (n === null) { return; }
        if (n.left === null || n.right === null) {
            // At most one subtree
            let target = n.left === null ? n.right : n.left;
            if (n.parent) { n.parent[n.backlink] = target; }
            else { this._root = target; }
            if (target) {
                target.parent = n.parent;
                target.backlink = n.backlink;
            }
        } else {
            // Two subtrees
            let l = n.left, r = n.right, rl = n.right.left;
            if (n.parent) { n.parent[n.backlink] = r; }
            else { this._root = r; }
            r.parent = n.parent;
            r.backlink = n.backlink;
            if (rl) {
                let lMax = this._getLimit(R, l);
                lMax.right = rl;
                rl.parent = lMax;
                rl.backlink = R;
            }
            r.left = l;
            l.parent = r;
        }
    }

    min() { return this._getLimit(L)?.data; }

    max() { return this._getLimit(R)?.data; }
}

module.exports = {
  BinarySearchTree
};
