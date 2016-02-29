class ResourcePool<T> {
    iterator: number;
    items: Array<T>;

    constructor() {
        this.iterator = 0;
        this.items = [];
    }

    public Get(): T {
        if (this.iterator < 0)
            return null;

        var o: T = this.items[this.iterator];
        this.items[this.iterator--] = null;
        return o;
    }

    public Release(o: T) {
        if (this.iterator < this.items.length)
            this.items[this.iterator] = o;
        else
            this.items.push(o);
        this.iterator++;
    }
}
