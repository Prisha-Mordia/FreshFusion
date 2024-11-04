type Restaurant = {
    name: string;
    distance: number;
    organic: number;
    packaging: number;
    leftovers: number;
    sus_index?: number;
};

function sort_by_sus(arr: Restaurant[]): [number, Restaurant[]][] {
    const d: { [key: number]: Restaurant[] } = {};

    arr.forEach((restaurant) => {
        const s = compute_sus(restaurant);
        restaurant.sus_index = s;
        if (d[s]) {
            d[s].push(restaurant);
        } else {
            d[s] = [restaurant];
        }
    });

    const l = Object.entries(d).map(([key, value]) => [parseInt(key), value]);
    l.sort((a, b) => b[0] - a[0]);
    const n = Math.floor(l.length / 4) * 4;
    return l.slice(0, n);
}

function compute_sus(restaurant: Restaurant): number {
    let s = 0;
    s += Math.max(5, (100 - 10 * restaurant.distance)) * 0.4;
    s += restaurant.organic;
    s += restaurant.packaging;
    s += restaurant.leftovers;
    return Math.floor(s);
}
