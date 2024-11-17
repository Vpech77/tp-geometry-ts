import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LengthVisitor from "../src/LenghtVisitor";
import LineString from "../src/LineString";
import GeometryCollection from "../src/GeometryCollection";

describe("test LengthVisitor", () => {
    it("test puntos", () => {
        const visitor = new LengthVisitor();
        {
            const geometry = new Point();
            const result = geometry.accept(visitor);
            expect(result).to.equal(0.0);
        }
        {
            const geometry = new Point([3.0,4.0]);
            const result = geometry.accept(visitor);
            expect(result).to.equal(0.0);
        }
    });
    it("test line", () => {
        const visitor = new LengthVisitor();
        {
            const geometry = new LineString();
            const result = geometry.accept(visitor);
            expect(result).to.equal(0.0);
        }
        {
            const p1 = new Point([1.0,1.0]);
            const p2 = new Point([2.0,2.0]);
            const geometry = new LineString([p1, p2]);
            const result = geometry.accept(visitor);
            expect(result).to.equal(2**(1/2));
        }
    });
    it("test geometry collection", () => {
        const visitor = new LengthVisitor();
        {
            const geoms = new GeometryCollection();
            const result = geoms.accept(visitor);
            expect(result).to.equal(0.0);
        }
        {
            const p1 = new Point([3.0,4.0]);
            const p2 = new Point([2.0,2.0]);
            const p3 = new Point([2.5,2.7]);
            const line = new LineString([p1, p2]);
            const geoms = new GeometryCollection([p1, p3, line]);
            const result = geoms.accept(visitor);
            const longueurLine = line.accept(visitor)
            expect(result).to.equal(longueurLine);
        }
    });
});