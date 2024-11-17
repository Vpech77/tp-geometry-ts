import AbstractGeometry from "./AbstractGeometry";
import Geometry from "./Geometry";
import GeometryVisitor from "./GeometryVisitor";

export default class GeometryCollection extends AbstractGeometry{
    private geometries : Array<Geometry>;

    constructor(geometries?: Array<Geometry>){
        super();
        this.geometries = geometries || [];
    }

    getGeometryN(n: number){
        return this.geometries[n];
    }

    getNumGeometries(): number{
        return this.geometries.length;
    }

    getType(): string {
        return "GeometryCollection";
    }
    isEmpty(): boolean {
        return this.geometries.length == 0;
    }
    translate(dx: number, dy: number): void {
        for(let g of this.geometries){
            g.translate(dx, dy);
        }
    }
    clone(): GeometryCollection {
        return new GeometryCollection(this.geometries.map((g) => g.clone()));
    }
    accept<T>(visitor: GeometryVisitor<T>): T {
        return visitor.visitGeometryCollection(this);
    }
}