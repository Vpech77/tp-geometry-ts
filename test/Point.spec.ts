import "mocha";
import { expect } from "chai";
import Point from "../src/Point";

describe("test Point", () => {
    it("test default constructor", () => {
        const p = new Point();
        const coordNaN = [Number.NaN, Number.NaN]
        expect(p.getCoordinate()).to.deep.equal(coordNaN);
        expect(Number.isNaN(p.x()));
        expect(Number.isNaN(p.y()));
        expect(p.getType()).to.equal("Point");
    });
    it("test constructor with coordinates", () => {
        const p = new Point([3.0,4.0]);
        expect(p.getCoordinate()).to.deep.equal([3.0,4.0]);
        expect(p.x()).to.equal(3.0);
        expect(p.y()).to.equal(4.0);
    });
    it("test isEmpty", () => {
        const p = new Point();
        expect(p.isEmpty()).to.equal(true);
        const p2 = new Point([3.0,4.0]);
        expect(p2.isEmpty()).to.equal(false);
    })

});

