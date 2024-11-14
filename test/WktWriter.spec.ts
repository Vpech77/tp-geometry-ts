import "mocha";
import { expect } from "chai";
import WktWriter from "../src/WktWriter"
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("test WktWriter", () => {
    it("test write", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point();
        const writer = new WktWriter();

        expect(writer.write(p1)).to.equal("POINT(3.0 4.0)");
        expect(writer.write(p2)).to.equal("POINT IS EMPTY");

        const line = new LineString();
        const p3 = new Point([3.0,4.0]);
        const line2 = new LineString([p1, p3]);

        expect(writer.write(line2)).to.equal("LINESTRING(3.0 4.0,3.0 4.0)");
        expect(writer.write(line)).to.equal("LINESTRING IS EMPTY");


    })
})