// Fisher-Yates!
export default function shuffle(array) {
    let m = array.length;
    let t: number;
    let i: number;

    while (m > 0) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}
