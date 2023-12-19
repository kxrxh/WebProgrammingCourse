interface PointRow {
    x: number;
    y: number;
    r: number;
    hit: boolean;
    time: number; // or Date if timeStampToDate returns a Date object
}

export type GraphData = PointRow[]