import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";
import WktVisitor from "../src/WktVisitor";
import LogGeometryVisitor from "../src/LogGeometryVisitor";
import Enveloppe from "../src/Envelope";
import EnveloppeBuilder from "../src/EnvelopeBuilder";

describe("test LineString", () =>{
    it("test default constructor", () => {
        const line = new LineString();
        expect(line.getNumPoints()).to.equal(0);
        expect(line.getType()).to.equal("LineString");
    })
    it("test constructor with Point", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([5.0,8.0]);
        const line = new LineString([p1, p2]);
        expect(line.getNumPoints()).to.equal(2);
        expect(line.getPointN(0)).to.equal(p1);
        expect(line.getPointN(1)).to.equal(p2);
    });
    it("test isEmpty", () => {
        const line = new LineString();
        expect(line.isEmpty()).to.equal(true);
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([5.0,8.0]);
        const line2 = new LineString([p1, p2]);
        expect(line2.isEmpty()).to.equal(false);
    })
    it("test translate", () => {
        const p1 = new Point([1.0,1.0]);
        const p2 = new Point([2.0,2.0]);
        const line = new LineString([p1, p2]);
        line.translate(2.0,2.0);
        expect(line.getPointN(0)).to.equal(p1);
        expect(line.getPointN(1)).to.equal(p2);
    })
    it("test clone", () => {
        const p1 = new Point([1.0,1.0]);
        const p2 = new Point([2.0,2.0]);
        const line = new LineString([p1, p2]);
        const line2 = line.clone();

        line2.translate(2.0,2.0);

        expect(line.getPointN(0)).to.equal(p1);
        expect(line.getPointN(1)).to.equal(p2);

        expect(line2.getPointN(0).getCoordinate()).to.deep.equal([3.0,3.0]);
        expect(line2.getPointN(1).getCoordinate()).to.deep.equal([4.0,4.0]);

    });


    // it("test asText", () => {
    //     {
    //         const g = new LineString();
    //         expect(g.asText()).to.equal("LINESTRING IS EMPTY");
    //     }
    //     {
    //         const p1 = new Point([1.0,1.0]);
    //         const p2 = new Point([2.0,2.0]);
    //         const g = new LineString([p1, p2]);
    //         expect(g.asText()).to.equal("LINESTRING(1.0 1.0,2.0 2.0)");
    //     }
    // });
    // it("test getEnveloppe", () => {
    //     {
    //         const g = new LineString();
    //         const visitor = new EnveloppeBuilder();
    //         g.accept(visitor);
    //         const env = new Enveloppe();
    //         expect(g.getEnvelope().toString()).to.equal(env.toString());
    //     }
    //     {
    //         const p1 = new Point([1.0,1.0]);
    //         const p2 = new Point([2.0,2.0]);
    //         const g = new LineString([p1, p2]);

    //         const visitor = new EnveloppeBuilder();
    //         g.accept(visitor);
    //         const env = new Enveloppe(p1.getCoordinate(), p2.getCoordinate());
    //         expect(g.getEnvelope().toString()).to.equal(env.toString());
    //     }
    // });




})