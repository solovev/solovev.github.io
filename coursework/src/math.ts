export function f(i: number): number {
    if (i == 1 || i == 0) return 1;
    var ret = 1;
    for (var j = 1; j <= i; ++j) {
        ret *= j;
    }
    return ret;
}

export function C(n: number, k: number): number {
    return this.f(n) / (this.f(k) * this.f(n - k));
}