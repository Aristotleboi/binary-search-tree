let exampleArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 16, 27, 89, 9, 17, 36, 28, 19]

function buildTree(array, start, end) {
    if(start>end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);
    return root
}

class Tree {
    constructor(array) {
        let sortedArray = arraySortAndRemove(array)
        this.root = buildTree(sortedArray, 0, sortedArray.length - 1)
    }
    insert(value, root) {
        if(value > root.data){
            if(root.right == null) {
                root.right = new Node(value);
            } else {
                console.log(root)
                this.insert(value, root.right);
            }
        } else if(value < root.data) {
            if(root.left == null) {
                root.left = new Node(value);
            } else {
                console.log(root)
                this.insert(value, root.left);
            }
        }
    }
    find(value, root) {
        if(value === root.data) {
            return root;
        } else if(value > root.data) {
            return this.find(value, root.right)
        } else if(value < root.data) {
            return this.find(value, root.left)
        } else {
            console.log("value is not in tree!")
        }
    }
    delete(value) {
        console.log(exampleTree.find(19, exampleTree.root))
    }
}

class Node {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null
    }
}

function sortArray(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array[0];

    let left = [];
    let right = [];

    for (let i = 1; i <array.length; i++) {
        array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }

    return sortArray(left).concat(pivot, sortArray(right))
}

function removeDuplicates(array) {
    let newArray = [...new Set(array)]
    return newArray;
}

function arraySortAndRemove(array) {
    return removeDuplicates(sortArray(array))
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

let exampleTree = new Tree(exampleArray)


console.log(arraySortAndRemove(exampleArray))



exampleTree.delete()
prettyPrint(exampleTree.root)
