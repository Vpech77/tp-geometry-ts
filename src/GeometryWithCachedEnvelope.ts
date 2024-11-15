import Enveloppe from "./Envelope";
import Geometry from "./Geometry";
import GeometryVisitor from "./GeometryVisitor";

export default class GeometryWithCachedEnvelope implements Geometry {

    private original: Geometry;
    private cachedEnvelope: Enveloppe;

    constructor(original: Geometry){
        this.original = original;
    }

    getEnvelope(): Enveloppe {
        if (this.cachedEnvelope == undefined){
            this.cachedEnvelope = this.original.getEnvelope();
        }
        return this.cachedEnvelope;
    }

    getType(): string {
        return this.original.getType();
    }
    isEmpty(): boolean {
        return this.original.isEmpty();
    }
    translate(dx: number, dy: number): void {
        return this.original.translate(dx, dy);
    }
    clone(): Geometry {
        return this.original.clone()
    }
    accept(visitor: GeometryVisitor): void {
        return this.original.accept(visitor);
    }
    asText(): string {
        return this.original.asText();
    }


}