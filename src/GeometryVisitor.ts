import GeometryCollection from "./GeometryCollection";
import LineString from "./LineString";
import Point from "./Point";

export default interface GeometryVisitor<T> {
    visitPoint(point: Point): T;
    visitLineString(line: LineString): T;
    visitGeometryCollection(g: GeometryCollection): T;
}