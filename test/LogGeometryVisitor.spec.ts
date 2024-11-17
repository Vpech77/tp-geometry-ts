import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LogGeometryVisitor from "../src/LogGeometryVisitor";
import LineString from "../src/LineString";
import GeometryCollection from "../src/GeometryCollection";

describe("test LogGeometryVisitor", () => {
    it("test puntos", () => {
        let result = "";
        const vis =  new LogGeometryVisitor((message) =>{
            result = message;
        });
        {
            const geometry = new Point();
            geometry.accept(vis)
            expect(result).to.equal("Je suis un point vide");
        }
        {
            const geometry = new Point([3.0,4.0]);
            geometry.accept(vis)
            expect(result).to.equal("Je suis un point avec x=3.0 et y=4.0");
        }
    });
    it("test LogGeometryVisitor", () => {
        let result = "";
        const vis =  new LogGeometryVisitor((message) =>{
            result = message;
        });
        {
            const g = new LineString();
            g.accept(vis);
            expect(result).to.equal("Je suis une polyligne vide");
        }
        {
            const p1 = new Point([1.0,1.0]);
            const p2 = new Point([2.0,2.0]);
            const g = new LineString([p1, p2]);
            g.accept(vis);
            expect(result).to.equal("Je suis une polyligne définie par 2 point(s)");
        }
    });
    it("test logVisitor", () => {
        let result = "";
        const log =  new LogGeometryVisitor((message) =>{
            result = message;
        });
        {
            const geoms = new GeometryCollection();
            geoms.accept(log);
            expect(result).to.equal("Je suis une GeometryCollection vide");
        }
        {
            const p1 = new Point([3.0,4.0]);
            const p2 = new Point([2.0,2.0]);
            const line = new LineString([p1, p2]);
            const geoms = new GeometryCollection([p1, line]);
            geoms.accept(log);
            expect(result).to.equal("Je suis une GeometryCollection avec 2 geometrie(s)");
        }
    });
})