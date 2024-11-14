import Geometry from "./Geometry";
import Point from "./Point";

export default class LineString implements Geometry{
    private points: Array<Point>;

    constructor(points?: Array<Point>){
        this.points = points || [];
    }

    isEmpty(): boolean {
        return this.getNumPoints() == 0;
      }

    getType(): string {
        return "LineString";
    }

    getNumPoints(): number {
        return this.points.length;
    }

    getPointN(n: number): Point{
        return this.points[n];
    }

}