import Coordinate from "./Coordinate";

export default class Enveloppe {
    private bottomLeft: Coordinate;
    private topRight: Coordinate;

    constructor(bottomLeft?: Coordinate, topRight?: Coordinate){
        this.bottomLeft = bottomLeft || [Number.NaN, Number.NaN];
        this.topRight = topRight || [Number.NaN, Number.NaN];
    }

    isEmpty(): boolean {
        return  Number.isNaN(this.bottomLeft[0]) && Number.isNaN(this.bottomLeft[1])
                && Number.isNaN(this.topRight[0]) && Number.isNaN(this.topRight[1]);
    }
    getXmin(): number {
        return this.bottomLeft[0];
    }
    getYmin(): number {
        return this.bottomLeft[1];
    }
    getXmax(): number {
        return this.topRight[0];
    }
    getYmax(): number {
        return this.topRight[1];
    }

    toString(): string {
        return "bottomLeft : " + this.getXmin() + " " + this.getYmin() + 
                " | topRight : " + this.getXmax() + " " + this.getYmax();
    }
}