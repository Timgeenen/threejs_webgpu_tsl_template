import { type Experience } from "@webgl";
import { Earth } from "@world";

export default class World {
    /* ======================
    * Properties
    ====================== */
    public earth: Earth;



    /* ======================
    * Setup
    ====================== */
    constructor(experience: Experience) {
        this.earth = new Earth(experience);
    }



    /* ======================
    * Methods
    ====================== */
    
}