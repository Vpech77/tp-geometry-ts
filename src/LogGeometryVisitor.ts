import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";

export default class LogGeometryVisitor implements GeometryVisitor {
    visitPoint(point: Point): void {
        if (point.isEmpty){
            console.log("Je suis un point vide");
        }
        console.log('Je suis un point avec x=${point.x()} et y=${point.y()}');

    }
    visitLineString(line: LineString): void {
        if (line.isEmpty){
            console.log("Je suis une polyligne vide");
        }
        else{
            console.log('Je suis une polyligne définie par ${line.getNumPoints()} point(s)');
        }
    }

}