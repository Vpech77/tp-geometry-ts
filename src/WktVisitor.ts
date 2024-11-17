import GeometryCollection from "./GeometryCollection";
import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";

export default class WktVisitor implements GeometryVisitor<string> {

    private buffer: string;

    constructor(){
        this.buffer = "";
    }

    visitPoint(point: Point): string {
        if (point.isEmpty()){
            return "POINT IS EMPTY";
        }
        return `POINT(${point.x().toFixed(1)} ${point.y().toFixed(1)})`;
    };

    visitLineString(line: LineString): string {
        if (line.isEmpty()){
            return "LINESTRING IS EMPTY";
        }
        else{
            let data = "LINESTRING(";
            for (var i=0;i<line.getNumPoints()-1; i++){
                data += line.getPointN(i).x().toFixed(1) + " " + line.getPointN(i).y().toFixed(1) +",";
            };
            data += line.getPointN(i).x().toFixed(1) + " " + line.getPointN(i).y().toFixed(1) +")";
            return data;
        }
    };

    visitGeometryCollection(g: GeometryCollection): string {
        if (g.isEmpty()){
            return "GEOMETRYCOLLECTION IS EMPTY";
        }
        else{
            let data = "GEOMETRYCOLLECTION(";
            for (var i=0;i<g.getNumGeometries()-1; i++){
                data += g.getGeometryN(i).accept(this) + ",";
            };
            data += g.getGeometryN(i).accept(this) +")";
            return data;
        }
    }
}