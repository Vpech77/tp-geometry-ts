import "mocha";
import { expect } from "chai";
import WktWriter from "../src/WktWriter"
import Point from "../src/Point";
import LineString from "../src/LineString";
import GeometryCollection from "../src/GeometryCollection";
import WktVisitor from "../src/WktVisitor";
import LogGeometryVisitor from "../src/LogGeometryVisitor";
import EnveloppeBuilder from "../src/EnvelopeBuilder";

class Fabrique{
    createGeometryCollection() : GeometryCollection {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([2.0,2.0]);
        const line = new LineString([p1, p2]);
        return new GeometryCollection([p1, line]);
    }
}

describe("test Point", () => {
    it("test default constructor", () => {
        const geomsVide = new GeometryCollection();
        expect(geomsVide.getType()).to.equal("GeometryCollection");
        expect(geomsVide.isEmpty()).to.equal(true);
        expect(geomsVide.getNumGeometries()).to.equal(0);

        const geoms = new Fabrique().createGeometryCollection();
        expect(geoms.getType()).to.equal("GeometryCollection");
        expect(geoms.isEmpty()).to.equal(false);
        expect(geoms.getNumGeometries()).to.equal(2);
        const p1 = new Point([3.0,4.0]);
        expect(geoms.getGeometryN(0)).to.deep.equal(p1);
    });
    it("test clone and translate", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([2.0,2.0]);
        const line = new LineString([p1, p2]);
        const geoms = new Fabrique().createGeometryCollection();
        const geoms2 = geoms.clone();

        geoms2.translate(1.0, 1.0);

        expect(geoms.getGeometryN(0)).to.deep.equal(p1);
        expect(geoms.getGeometryN(1)).to.deep.equal(line);

        p1.translate(1.0,1.0);

        expect(geoms2.getGeometryN(0)).to.deep.equal(p1);
    });
    // it("test wkt visitor", () => {
    //     {
    //         const geoms = new GeometryCollection();
    //         const wkt = new WktVisitor();
    //         geoms.accept(wkt);
    //         expect(wkt.getResult()).to.equal("GEOMETRYCOLLECTION IS EMPTY");
    //     }
    //     {
    //         const geoms = new Fabrique().createGeometryCollection();
    //         const wkt = new WktVisitor();
    //         geoms.accept(wkt);
    //         expect(wkt.getResult()).to.equal("GEOMETRYCOLLECTION(POINT(3.0 4.0),POINT(3.0 4.0)LINESTRING(3.0 4.0,2.0 2.0))");
    //     }
    // });
    // it("test logVisitor", () => {
    //     {
    //     const geoms = new Fabrique().createGeometryCollection();
    //     let result = "";
    //     const log =  new LogGeometryVisitor((message) =>{
    //         result = message;
    //     });
    //     geoms.accept(log);
    //     expect(result).to.equal("Je suis une GeometryCollection avec 2 geometrie(s)");
    //     }
    //     {
    //         const geoms = new GeometryCollection();
    //         let result = "";
    //         const log =  new LogGeometryVisitor((message) =>{
    //             result = message;
    //         });
    //         geoms.accept(log);
    //         expect(result).to.equal("Je suis une GeometryCollection vide");
    //     }
    // });
    // it("test envelope visitor", () => {
    //     {
    //         const g = new Fabrique().createGeometryCollection();
    //         const visitor = new EnveloppeBuilder();
    //         g.accept(visitor);
    //         const env = g.getEnvelope();
    //         expect(g.getEnvelope().toString()).to.equal(env.toString());
    //     }
    // });
    // it("test wktwriter", () => {
    //     const g = new Fabrique().createGeometryCollection();
    //     const writer = new WktWriter();
    //     expect(() => {writer.write(g)}).to.throw("geometry type not supported");
    // });
});