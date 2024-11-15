import GeometryCollection from "./GeometryCollection";
import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";

export default class LogGeometryVisitor implements GeometryVisitor {
    constructor(
        private log = console.log
    ){
    }
    
    visitGeometryCollection(g: GeometryCollection) {
        if (g.isEmpty()){
            this.log("Je suis une geometryCollection vide");
        }
        else{
            this.log(`Je suis une geometryCollection avec ${g.getNumGeometries()}`);
        }
    }

    visitPoint(point: Point): void {
        if (point.isEmpty()){
            this.log("Je suis un point vide");
        }
        else{
            this.log(`Je suis un point avec x=${point.x().toFixed(1)} et y=${point.y().toFixed(1)}`);
        }
    }

    visitLineString(line: LineString): void {
        if (line.isEmpty()){
            this.log("Je suis une polyligne vide");
        }
        else{
            this.log(`Je suis une polyligne définie par ${line.getNumPoints()} point(s)`);
        }
    }

}