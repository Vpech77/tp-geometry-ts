import Enveloppe from "./Envelope";
import EnveloppeBuilder from "./EnvelopeBuilder";
import Geometry from "./Geometry"
import GeometryVisitor from "./GeometryVisitor";
import WktVisitor from "./WktVisitor";


export default abstract class AbstractGeometry implements Geometry{
    abstract getType(): string;
    abstract isEmpty(): boolean;
    abstract translate(dx: number, dy: number): void;
    abstract clone(): Geometry;
    abstract accept<T>(visitor: GeometryVisitor<T>): T;
    asText(): string {
        const visitor = new WktVisitor();
        return this.accept(visitor);
    }
    getEnvelope(): Enveloppe {
        const visitor = new EnveloppeBuilder();
        this.accept(visitor)
        return visitor.build();
    }
}