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
    findParent(value, root, parent) {
        let parentNode = root
            if(value > parentNode.data) {
                return findParent(value, parentNode.right, parentNode)
            } else if(value < parentNode.data) {
                return findParent(value, parentNode.left, parentNode)
            } else {
                console.log(parent)
                return parent
            }

    }
    delete(value) {
        //method functions werent working so recreated functions. look into why methods did not work
        //fucntion to find parent 
        const findParent = (value, root, parent) => {
            let parentNode = root
            if(value > parentNode.data) {
                return findParent(value, parentNode.right, parentNode)
            } else if(value < parentNode.data) {
                return findParent(value, parentNode.left, parentNode)
            } else {
                return parent
            }
        }
        //function to find value
        const find = (value, root) => {
            if(value === root.data) {
                return root;
            } else if(value > root.data) {
                return find(value, root.right)
            } else if(value < root.data) {
                return find(value, root.left)
            } else {
                console.log("value is not in tree!")
            }
        }
        let parentNode = findParent(value, this.root)
        let node = find(value, this.root)

        //if value is a leaf
        if(node.left == null && node.right == null) {
            if(value > parentNode.data) {
                parentNode.right = null;
            } else if(value <parentNode.data) {
                parentNode.left = null
            }
        }
        // if node to delete has one child
        if (
            node.left == null && node.right != null
            ||
            node.left != null && node.right == null
        ) {
            //checking if node to delete is right or left in parent node
            if(value > parentNode.data) {
                if(node.left == null) parentNode.right = node.right;
                if(node.right == null) parentNode.right = node.left;
            }
            if (value < parentNode.data) {
                if(node.left == null) parentNode.left = node.right;
                if(node.right == null) parentNode.left = node.left
            }
        }
        
        //if node to be deleted has 2 children
        if (node.right != null && node.left != null) {
            //nextNode is going to keep track of the smallest (most left) node
            let nextNode = node.right
            while(nextNode.left != null) {
                nextNode = nextNode.left
            }
            // check if successor (nextNode) is directly connected
            if(nextNode.data == node.right.data) {
                //in this case just promote next node to nodes original position
                nextNode.left = node.left;
                if(parentNode.right.data == value) parentNode.right = nextNode;
                else if(parentNode.left.data == value) parentNode.left = nextNode
                return
            }
            //if node is the root node
            else if (node == this.root) {
                let nextNodeParent = findParent(nextNode.data, this.root)
                nextNodeParent.left = nextNode.right;
                nextNode.right = node.right;
                nextNode.left = node.left;
                this.root = nextNode
                return
            }
            //if successor is not directly connected 
            else {
                let nextNodeParent = findParent(nextNode.data, this.root)
                nextNodeParent.left = nextNode.right;
                nextNode.right = node.right;
                nextNode.left = node.left;
                if(parentNode.right.data == value) parentNode.right = nextNode;
                else if(parentNode.left.data == value) parentNode.left = nextNode
                return
            }
            console.log(parentNode)
            console.log(nextNode)
            console.log(nextNodeParent)
            
        }
    }
    
    levelOrder(func) {
        let newstring = ''
        let queue = [];
        queue.push(this.root);
        while (queue.length != 0) {
            let current = queue.shift()
            if(current.left != null) queue.push(current.left);
            if(current.right != null) queue.push(current.right);
            newstring += current.data + ', '
        }
        console.log(newstring)
    }

    inorder() {
        let inorderArray = []
        const inorderSearch = (node) => {
            if( node == null) return;
            inorderSearch(node.left)
            inorderArray.push(node.data)
            inorderSearch(node.right)
        }
        inorderSearch(this.root)
        console.log(inorderArray)
    }

    preorder() {
        let preorderArray = []
        const preorderSearch = (node) => {
            if (node == null) return
            preorderArray.push(node.data)
            preorderSearch(node.left)
            preorderSearch(node.right)
        }
        preorderSearch(this.root)
        console.log(preorderArray)
    }

    postorder() {
        let postorderArray = []
        const postorderSearch = (node) => {
            if (node == null) return
            postorderSearch(node.left)
            postorderSearch(node.right)
            postorderArray.push(node.data)
        }
        postorderSearch(this.root)
        console.log(postorderArray)
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



prettyPrint(exampleTree.root)
exampleTree.postorder()


