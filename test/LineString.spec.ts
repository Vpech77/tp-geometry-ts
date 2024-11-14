import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("test LineString", () =>{
    it("test default constructor", () => {
        const line = new LineString();
        expect(line.getNumPoints()).to.equal(0);
    })
    it("test constructor with Point", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([5.0,8.0]);
        const line = new LineString([p1, p2]);
        expect(line.getNumPoints()).to.equal(2);
        expect(line.getPointN(0)).to.deep.equal(p1);
        expect(line.getPointN(1)).to.deep.equal(p2);
    });
    it("test getType", () => {
        const line = new LineString();
        expect(line.getType()).to.equal("LineString");
    })

})