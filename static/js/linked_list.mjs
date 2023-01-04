
function Node(value, before, after) {
    return {
        "value": value,
        "before": before,
        "after": after,
    };
}

// Class representing circular doubly linked list
export class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
        this.length = 0;
    }

    isEmpty() {
        return this.length === 0;
    }

    add(value) {
        let node = Node(value, null, null);
        if (this.head === null && this.tail === null) {
            this.head = node;
            this.tail = node;
            this.current = node;
            // Make circular
            node.after = node;
            node.before = node;
            this.length += 1;
        }
        else {
            this.tail.after = node;
            node.before = this.tail;
            node.after = this.head; // keep circular
            this.tail = node;
            this.length += 1;
        }
    }

    get() {
        return this.current === null ? null : this.current.value;
    }

    getHead() {
        return this.head === null ? null : this.head.value;
    }

    getTail() {
        return this === null ? null : this.tail.value;;
    }

    peek() {
        if (this.current === null) { return null; }
        return this.current.after.value;
    }

    next() {
        if (this.current === null) {
            return null;
        }
        let next_node = this.current.after;
        this.current = next_node;
    }

    // Deletes all elements
    empty() {
        this.head = null;
        this.tail = null;
        this.current = null;
        this.length = 0;
    }

    // func is boolean function
    remove(func) {
        // Size 0 or 1 array
        if (this.length === 0) {
            return;
        }
        else if (this.length === 1 && func(this.get())) {
            this.empty();
            return;
        }

        let cur = this.head;
        for (let i = 0; i < this.length; i++) {
            if (cur === null) {
                return;
            }
            if (func(cur.value)) {
                // Removing current node -> advance current pointer
                if (cur === this.current) {
                    this.next();
                }
                // Special case of removing head
                if (cur === this.head) {
                    this.head = this.head.after;
                    this.head.before = this.tail;
                    this.tail.after = this.head;
                } // Special case of removing tail
                else if (cur === this.tail) {
                    this.tail = this.tail.before;
                    this.tail.after = this.head;
                    this.head.before = this.tail;
                }
                else {
                    cur.before.after = cur.after;
                    cur.after.before = cur.before;
                }
                this.length -= 1;
            }
            cur = cur.after;
        }
    }

}
