import AbstractGeometry from "./AbstractGeometry";
import Coordinate from "./Coordinate";
import GeometryVisitor from "./GeometryVisitor";

export default class Point extends AbstractGeometry{
  private coordinate: Coordinate;

  constructor(coordinate?: Coordinate) {
    super();
    this.coordinate = coordinate || [Number.NaN, Number.NaN];
  }

  accept<T>(visitor: GeometryVisitor<T>): T {
      return visitor.visitPoint(this);
  }

  clone(): Point {
    return new Point([...this.coordinate]);
  }

  isEmpty(): boolean {
    return Number.isNaN(this.coordinate[0]) && Number.isNaN(this.coordinate[1]);
  }

  getType(): string {
      return "Point";
  }

  getCoordinate(): Coordinate {
    return this.coordinate;
  }

  translate(dx: number, dy: number): void {
    this.coordinate[0] += dx;
    this.coordinate[1] += dy;
  }

  x(): number {
    return this.coordinate[0];
  }

  y(): number {
    return this.coordinate[1];
  }
}
