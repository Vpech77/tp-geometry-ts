import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LogGeometryVisitor from "../src/LogGeometryVisitor";
import WktVisitor from "../src/WktVisitor";
import EnveloppeBuilder from "../src/EnvelopeBuilder";
import Enveloppe from "../src/Envelope";


describe("test Point", () => {
    it("test default constructor", () => {
        const p = new Point();
        const coordNaN = [Number.NaN, Number.NaN];
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
    });
    it("test Translate", () => {
        const p = new Point([3.0,4.0]);
        p.translate(2,2);
        expect(p.getCoordinate()).to.deep.equal([5.0,6.0]);
    });
    it("test clone", () => {
        const p = new Point([3.0,4.0]);
        const p2 = p.clone();
        expect(p2.getCoordinate()).to.deep.equal([3.0,4.0]);
        p2.translate(2.0,2.0);
        expect(p2.getCoordinate()).to.deep.equal([5.0,6.0]);
        expect(p.getCoordinate()).to.deep.equal([3.0,4.0]);
    });
    it("test LogGeometryVisitor", () => {
        let result = "";
        const vis =  new LogGeometryVisitor((message) =>{
            result = message;
        });
        {
            const g = new Point();
            g.accept(vis);
            expect(result).to.equal("Je suis un point vide");
        }
        {
            const g = new Point([3.0,4.0]);
            g.accept(vis);
            expect(result).to.equal("Je suis un point avec x=3.0 et y=4.0");
        }
    });
    it("test WktVisitor", () => {
        {
            const visitor = new WktVisitor();
            const geometry = new Point();
            geometry.accept(visitor);
            const wkt = visitor.getResult();
            expect(wkt).to.equal("POINT IS EMPTY");
        }
        {
            const visitor = new WktVisitor();
            const geometry = new Point([3.0,4.0]);
            geometry.accept(visitor);
            const wkt = visitor.getResult();
            expect(wkt).to.equal("POINT(3.0 4.0)");
        }
    });
    it("test asText", () => {
        {
            const g = new Point();
            expect(g.asText()).to.equal("POINT IS EMPTY");
        }
        {
            const g = new Point([3.0,4.0]);
            expect(g.asText()).to.equal("POINT(3.0 4.0)");
        }
    });
    it("test getEnveloppe", () => {
        {
            const g = new Point();
            const visitor = new EnveloppeBuilder();
            g.accept(visitor);
            const env = new Enveloppe();
            expect(g.getEnvelope().toString()).to.equal(env.toString());
        }
        {
            const g = new Point([3.0,4.0]);
            const visitor = new EnveloppeBuilder();
            g.accept(visitor);
            const env = new Enveloppe([3.0,4.0], [3.0,4.0]);
            expect(g.getEnvelope().toString()).to.equal(env.toString());
        }
    });


});

