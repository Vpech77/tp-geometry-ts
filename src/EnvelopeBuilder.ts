import Coordinate from "./Coordinate";
import Enveloppe from "./Envelope";
import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";

export default class EnveloppeBuilder implements GeometryVisitor{
    private xMin: number;
    private yMin: number;
    private xMax: number;
    private yMax: number; 

    constructor(){
        this.xMin = Number.NaN;
        this.yMin = Number.NaN;
        this.xMax = Number.NaN;
        this.yMax = Number.NaN;
    }
    
    insert(coordinate: Coordinate): void {
        this.xMin = !(isNaN(this.xMin)) && this.xMin < coordinate[0] ? this.xMin : coordinate[0];
        this.yMin = !(isNaN(this.yMin)) && this.yMin < coordinate[1] ? this.yMin : coordinate[1];
        this.xMax = !(isNaN(this.xMax)) && this.xMax > coordinate[0] ? this.xMax : coordinate[0];
        this.yMax = !(isNaN(this.yMax)) && this.yMax > coordinate[1] ? this.yMax : coordinate[1];
    }

    build(): Enveloppe{
        const bottomLeft = [this.xMin, this.yMin];
        const topRight = [this.xMax, this.yMax];
        return new Enveloppe(bottomLeft, topRight);
    }

    visitPoint(point: Point): void {
        this.insert(point.getCoordinate());
    }

    visitLineString(line: LineString): void {
        for (let i=0; i<line.getNumPoints(); i++){
            this.insert(line.getPointN(i).getCoordinate());
        }
    }
}