import Enveloppe from "./Envelope";
import GeometryVisitor from "./GeometryVisitor";

export default interface Geometry {
    getType(): string;
    isEmpty(): boolean;
    translate(dx: number, dy: number): void;
    clone(): Geometry;
    accept<T>(visitor: GeometryVisitor<T>): T;
    asText(): string;
    getEnvelope(): Enveloppe;
}