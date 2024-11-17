import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import WktVisitor from "../src/WktVisitor";
import LineString from "../src/LineString";
import GeometryCollection from "../src/GeometryCollection";

describe("test WktVisitor", () => {
    it("test puntos", () => {
        const visitor = new WktVisitor();
        {
            const geometry = new Point();
            expect(geometry.accept(visitor)).to.equal("POINT IS EMPTY");
        }
        {
            const geometry = new Point([3.0,4.0]);
            expect(geometry.accept(visitor)).to.equal("POINT(3.0 4.0)");
        }
    });
    it("test line", () => {
        const visitor = new WktVisitor();
        {
            const geometry = new LineString();
            expect(geometry.accept(visitor)).to.equal("LINESTRING IS EMPTY");
        }
        {
            const p1 = new Point([1.0,1.0]);
            const p2 = new Point([2.0,2.0]);
            const geometry = new LineString([p1, p2]);
            expect(geometry.accept(visitor)).to.equal("LINESTRING(1.0 1.0,2.0 2.0)");
        }
    });
    it("test geometry collection", () => {
        const visitor = new WktVisitor();
        {
            const geoms = new GeometryCollection();
            expect(geoms.accept(visitor)).to.equal("GEOMETRYCOLLECTION IS EMPTY");
        }
        {
            const p1 = new Point([3.0,4.0]);
            const p2 = new Point([2.0,2.0]);
            const line = new LineString([p1, p2]);
            const geoms = new GeometryCollection([p1, line]);
            expect(geoms.accept(visitor)).to.equal("GEOMETRYCOLLECTION(POINT(3.0 4.0),LINESTRING(3.0 4.0,2.0 2.0))");
        }
    });
})