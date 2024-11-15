import "mocha";
import { expect } from "chai";
import Enveloppe from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder"

describe("test Enveloppe", () => {
    it("test default constructor", () => {
        const envA = new Enveloppe();
        expect(envA.isEmpty()).to.equal(true);
        
        const coordA = [0.0, 0.0];
        const coordB = [5.5, 5.5];

        const envB = new Enveloppe(coordA, coordB);
        expect(envB.isEmpty()).to.equal(false);

        expect(envB.getXmin()).to.equal(0.0);
        expect(envB.getXmax()).to.equal(5.5);
        expect(envB.getYmin()).to.equal(0.0);
        expect(envB.getYmax()).to.equal(5.5);

        expect(envB.toString()).to.equal("bottomLeft : 0 0 | topRight : 5.5 5.5");
    });
    it("test builder", () => {
        const builder = new EnvelopeBuilder();
        builder.insert([0.0,1.0]);
        builder.insert([2.0,0.0]);
        builder.insert([1.0,3.0]);

        const result = builder.build();

        expect(result.getXmin()).to.equal(0.0);
        expect(result.getXmax()).to.equal(2.0);
        expect(result.getYmin()).to.equal(0.0);
        expect(result.getYmax()).to.equal(3.0);
    });

})