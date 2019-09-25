const Node = require('./node');

class LinkedList {
    
    constructor() {
        this.clear();
    }

    append(data) {
        const addedNode = new Node(data);

        if(!this._head) {
            this._head = this._tail = addedNode;
            return this;
        }

        if(!this._tail.prev) {
            addedNode.prev = this._head;
            this._tail = this._head.next = addedNode;
        } else {
            this._tail.next = addedNode;
            addedNode.prev = this._tail;
            this._tail = addedNode;
        }

        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    _getNode(index) {
        let currentIndex = 0;
        let selectedNode = null;

        do {
            if(currentIndex === 0){
                selectedNode = this._head;
            } else {
                selectedNode = selectedNode.next;
            }

            currentIndex++;
        } while(currentIndex <= index && selectedNode)

        return selectedNode;
    }

    at(index) {
        return this._getNode(index).data;
    }

    insertAt(index, data) {
        const selectedNode = this._getNode(index);

        if(!selectedNode) {
            this.append(data);
            return this;
        }

        const insertedNode = new Node(data, selectedNode.prev, selectedNode);

        //head
        if(!selectedNode.prev) {
            this._head = selectedNode.prev = insertedNode;
        } else {
            insertedNode.prev.next = insertedNode;
            insertedNode.next.prev = insertedNode;
        }
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this._head = this._tail = null;

        return this;
    }

    deleteAt(index) {
        const deletedNode = this._getNode(index);

        if(!deletedNode.prev && !deletedNode.next) {
            this._head = null;
            this._tail = null;
            return this;
        }

        if(!deletedNode.prev) {
            this._head = deletedNode.next;
            this._head.prev = null;
            return this;
        }

        if(!deletedNode.next) {
            this._tail = deletedNode.prev;
            this._tail.next = null;
            return this;
        }

        deletedNode.prev.next = deletedNode.next;
        deletedNode.next.prev = deletedNode.prev;

        return this;
    }

    reverse() {
        let currentNode = this._head;
        if(!currentNode) {
            return this;
        }

        let nextNode = currentNode;

        do {
            nextNode = nextNode.next;

            const prev = currentNode.next;
            currentNode.next = currentNode.prev;
            currentNode.prev = prev;

            currentNode = nextNode;
        } while(currentNode != null)

        const tempHead = this._head;
        this._head = this._tail;
        this._tail = tempHead;

        return this;
    }

    indexOf(data) {
        let index = 0;
        let currentNode = this._head;

        while(currentNode){
            if(currentNode.data === data){
                return index;
            }

            index++;

            currentNode = currentNode.next;
        }

        return -1;
    }

    get length() {
        let _length = 0;

        if(!this._tail){
            return _length;
        }

        let currentNode = this._head;

        do {
            _length++;
            currentNode = currentNode.next;
        } while (currentNode);

        return _length;
    }
}

module.exports = LinkedList;
