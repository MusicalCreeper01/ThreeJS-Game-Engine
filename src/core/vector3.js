
/**
* The class for storing a 3 dimensional vector
* @constructor
* @param {number|undefined} newX - The X position for the Vector
* @param {number|undefined} newY - The Y position for the Vector
* @param {number|undefined} newZ - The Z position for the Vector
*/
Ember.Vector3 = function(newX, newY, newZ){
    /**
     * The x (left/right) position of the object
     * @type {number}
     */
    this.x = 0;
    /**
     * The y (up/down) position of the object
     * @type {number}
     */
    this.y = 0;
    /**
     * he z (forward/back) position of the object
     * @type {number}
     */
    this.z = 0;

    if(newX != undefined && newY != undefined && newZ != undefined){
        this.x = newX;
        this.y = newY;
        this.z = newZ;
    }else if (newX != undefined){
        this.x = newX;
        this.y = newX;
        this.z = newX;
    }

    /**
     * Sets the x, y, and z position of the vector in 3 dimensional space
     * @param {number|undefined} newX - The X position for the Vector
     * @param {number|undefined} newY - The Y position for the Vector
     * @param {number|undefined} newZ - The Z position for the Vector
     */

    this.set = function(newX, newY, newZ){
        if(newX != undefined && newY != undefined && newZ != undefined){
            this.x = newX;
            this.y = newY;
            this.z = newZ;
        }
        return this;
    }
}
