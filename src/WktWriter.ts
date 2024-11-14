import Geometry from "./Geometry";
import Point from "./Point";
import LineString from "./LineString";

export default class WktWriter {
    write(geometry : Geometry): string {
        if (geometry instanceof Point){
            return geometry.isEmpty() ? "POINT IS EMPTY" : "POINT("+ geometry.x().toFixed(1) + " " + geometry.y().toFixed(1) + ")";
        }
        else if (geometry instanceof LineString){
            if (geometry.isEmpty()){
                return "LINESTRING IS EMPTY";
            }
            else{
                let data = "LINESTRING(";
                for (var i=0;i<geometry.getNumPoints()-1; i++){
                    data += geometry.getPointN(i).x().toFixed(1) + " " + geometry.getPointN(i).y().toFixed(1) +",";
                }
                data += geometry.getPointN(i).x().toFixed(1) + " " + geometry.getPointN(i).y().toFixed(1) +")";
                return data;
            }
        }

    }
}