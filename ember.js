function Ember (element){


}

Ember.prototype.Vector3 = function(){
    this.x = 0;
    this.y = 0;
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

    this.set = function(newX, newY, newZ){
        if(newX != undefined && newY != undefined && newZ != undefined){
            this.x = newX;
            this.y = newY;
            this.z = newZ;
        }

        return this;
    }
}

Ember.prototype.GameObject = function(){
    this.mesh = {};
    this.material = {};
    this.scripts = [];

    this.position = new Vector3();
    this.rotation = new Vector3();
    this.scale = new Vector3();
}
