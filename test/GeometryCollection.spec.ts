import "mocha";
import { expect } from "chai";
import WktWriter from "../src/WktWriter"
import Point from "../src/Point";
import LineString from "../src/LineString";
import GeometryCollection from "../src/GeometryCollection";
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
    it("test wktwriter", () => {
        const g = new Fabrique().createGeometryCollection();
        const writer = new WktWriter();
        expect(() => {writer.write(g)}).to.throw("geometry type not supported");
    });
    it("test envelope visitor", () => {
        {
            const g = new Fabrique().createGeometryCollection();
            const visitor = new EnveloppeBuilder();
            g.accept(visitor);
            const env = g.getEnvelope();
            expect(g.getEnvelope().toString()).to.equal(env.toString());
        }
    });
});