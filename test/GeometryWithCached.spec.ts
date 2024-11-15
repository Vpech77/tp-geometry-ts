import "mocha";
import { expect } from "chai";
import Geometry from "../src/Geometry";
import Point from "../src/Point";
import GeometryWithCachedEnvelope from "../src/GeometryWithCachedEnvelope";

describe("test GeometryWithCachedEnvelope", () => {
    it("test cache envelope", () => {
        let g : Geometry = new Point([3.0,3.0]);
        g = new GeometryWithCachedEnvelope(g);
        const a = g.getEnvelope();
        const b = g.getEnvelope();
        expect(a).to.deep.equal(b);

        expect(g.getType()).to.equal("Point");
        expect(g.isEmpty()).to.equal(false);
        expect(g.asText()).to.equal("POINT(3.0 3.0)");

        const p = g.clone();

        p.translate(2.0,2.0);
        expect(g).to.not.equal(p);

    });

});

