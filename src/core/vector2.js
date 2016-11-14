
/**
* The class for storing a 2 dimensional vector
* @constructor
* @param {number|undefined} newX - The X position for the Vector
* @param {number|undefined} newY - The Y position for the Vector
*/
Ember.Vector2 = function(newX, newY, newZ){
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

    if(newX != undefined && newY != undefined){
        this.x = newX;
        this.y = newY;
    }else if (newX != undefined){
        this.x = newX;
        this.y = newX;
    }

    /**
     * Sets the x and y position of the vector in 2 dimensional space
     * @param {number|undefined} newX - The X position for the Vector
     * @param {number|undefined} newY - The Y position for the Vector
     */

    this.set = function(newX, newY){
        if(newX != undefined && newY != undefined){
            this.x = newX;
            this.y = newY;
        }
        return this;
    }
}
