class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export class DoublyLinkedCircularListTurn {
    constructor() {
        this.head = null;
        this.length = 0;
        this.current = null;
    }

    // Insert a new node at the end of the list
    add(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.current = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            const tail = this.head.prev;
            tail.next = newNode;
            newNode.prev = tail;
            newNode.next = this.head;
            this.head.prev = newNode;
        }
        this.length += 1;
    }

    // Remove the node at the specified index
    remove(func) {
        if (!this.head) return;
        let cur = this.head;
        for (let i = 0; i < this.length; i++) {

            if (func(cur.value)) {
                if (cur === this.head) {
                    this.head = cur.next;
                }
                if (cur === this.current) {
                    this.current = cur.next;
                }
                cur.prev.next = cur.next;
                cur.next.prev = cur.prev;
                this.length -= 1;
            }
            cur = cur.next;
        }
    }

    get() {
        return this.current.value;
    }

    getHead() {
        return this.head.value;
    }

    next() {
        if (this.current === null) { return null; }
        this.current = this.current.next;
    }

    peek() {
        if (this.current === null || this.current.next === null) {
            return null;
        }
        return this.current.next.value;
    }

    empty() {
        this.head = null;
        this.current = null;
        this.length = 0;
    }


}
