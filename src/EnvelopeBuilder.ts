import Coordinate from "./Coordinate";
import Enveloppe from "./Envelope";

export default class EnveloppeBuilder {
    private xMin: number;
    private yMin: number;
    private xMax: number;
    private yMax: number; 

    constructor(){
        this.xMin = Number.POSITIVE_INFINITY;
        this.yMin = Number.POSITIVE_INFINITY;
        this.xMax = Number.NEGATIVE_INFINITY;
        this.yMax = Number.NEGATIVE_INFINITY;
    }
    
    insert(coordinate: Coordinate): void {
        this.xMin = this.xMin < coordinate[0] ? this.xMin : coordinate[0];
        this.yMin = this.yMin < coordinate[1] ? this.yMin : coordinate[1];
        this.xMax = this.xMax > coordinate[0] ? this.xMax : coordinate[0];
        this.yMax = this.yMax > coordinate[1] ? this.yMax : coordinate[1];
    }

    build(): Enveloppe{
        const bottomLeft = [this.xMin, this.yMin];
        const topRight = [this.xMax, this.yMax];
        return new Enveloppe(bottomLeft, topRight);
    } 
}