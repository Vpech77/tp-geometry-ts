import GeometryCollection from "./GeometryCollection";
import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";

function dist(A: Point, B: Point) : number {
    return ((B.x()-A.x())**2+(B.y()-A.y())**2)**(1/2);
}

export default class LengthVisitor implements GeometryVisitor<number> {

    visitPoint(point: Point): number {
        return 0.0;
    }

    visitLineString(line: LineString): number {
        return line.isEmpty() ? 0 : dist(line.getPointN(0), line.getPointN(1));
    }

    visitGeometryCollection(g: GeometryCollection): number {
        if (g.isEmpty()){
            return 0.0;
        }

        const env = g.getEnvelope();
        const A = new Point([env.getXmax(), env.getYmax()]);
        const B = new Point([env.getXmin(), env.getYmin()]);
        return dist(A, B);

    }
}