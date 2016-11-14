
/**
* The class for all objects in the game's scene
* @constructor
*/
Ember.GameObject = function(){
    var _self = this;

    /**
     * The name of the object
     * @type {number}
     */
    this.name = "New GameObject";
    /**
     * The render layer the object is on
     * @type {number}
     */
    this.layer = 0;
    /**
     * The tags the object has, used to find groups of objects
     * @type {?Array<string>}
     */
    this.tags = [];

    /**
     * Whether the object is enable in the scene of not
     * @type {boolean}
     */
    this.active = true;

    /**
     * The THREE.Mesh for the object
     * @type {THREE.Mesh}
     */
    this.mesh = {};
    /**
     * The THREE.Material for the object
     * @type {Ember.Material}
     */
    this.material = {};
    /**
     * The scripts for the object that will run when the object is active and in the scene
     * @type {?Array<string>}
     */
    this.scripts = [];

    this._tmesh = function(){
        if(_self.material instanceof Ember.Material)
            return new THREE.Mesh(_self.mesh, _self.material._tmat())
        else if(_self.material instanceof THREE.Material)
            return new THREE.Mesh(_self.mesh, _self.material)
    };

    /**
     * The position of the object
     * @type {Ember.Vector3}
     */
    this.position = new Ember.Vector3();
    if(Ember.quaternions)
        this.rotation = new Ember.Vector3();
    else
        this.rotation = new THREE.Quaternion();
    /**
     * The size of the object
     * @type {Ember.Vector3}
     */
    this.scale = new Ember.Vector3();

}

/**
* Contructor for easily creating a primitive {Ember.GameObject} with a cube mesh and a Phong material
* @constructor
* @param {number|number|undefined} sizex - The size of the box in the +-x dimention, or if the only parameter - the side for all the sides
* @param {number|undefined} sizey - The size of the box in the +-y dimention
* @param {number|undefined} sizez - The size of the box in the +-z dimention
* @return {Enber.GameObject}
*/
Ember.GameObject.Box = function(sizex, sizey, sizez){
    var go = new Ember.GameObject();
    if(sizex != undefined && sizey != undefined && sizez != undefined)
        go.mesh = new THREE.BoxGeometry(sizex, sizey, sizez);
    else if(sizex != undefined)
        go.mesh = new THREE.BoxGeometry(sizex, sizex, sizex);
    else
        go.mesh = new THREE.BoxGeometry(1,1,1);

    go.material = new THREE.MeshPhongMaterial();
    return go;
}

/**
* Contructor for easily creating a primitive {Ember.GameObject} with a circle mesh and a Phong material
* @constructor
* @param {number|number|undefined} radius - The outter radius of the circle
* @param {number|undefined} segments - The segments that form the circle
* @return {Ember.GameObject}
*/
Ember.GameObject.Circle = function(radius, segments){
    var go = new Ember.GameObject();
    if(radius != undefined && segments != undefined)
        go.mesh = new THREE.CircleGeometry(radius, segments);
    else if(radius != undefined)
        go.mesh = new THREE.CircleGeometry(radius);
    else
        go.mesh = new THREE.CircleGeometry(5,32);

    go.material = new THREE.MeshPhongMaterial();
    return go;
}

/**
* Contructor for easily creating a primitive {Ember.GameObject} with a sphere mesh and a Phong material
* @constructor
* @param {number|number|undefined} radius - The outter radius of the sphere
* @param {number|undefined} widthsegments - The segments that form the sphere width
* @param {number|undefined} heightsegments - The segments that form the sphere height
* @return {Ember.GameObject}
*/
Ember.GameObject.Sphere = function(radius, widthsegments, heightsegments){
    var go = new Ember.GameObject();
    if(radius != undefined && widthsegments != undefined && heightsegments != undefined)
        go.mesh = new THREE.SphereGeometry(radius, widthsegments, heightsegments);
    else if(radius != undefined)
        go.mesh = new THREE.SphereGeometry(radius);
    else
        go.mesh = new THREE.SphereGeometry(5, 32, 32);

    go.material = new THREE.MeshPhongMaterial();
    return go;
}

/**
* Contructor for easily creating a {Ember.GameObject} with a mesh made front text
* @constructor
* @param {string|string|undefined} text - The text to use to make the mesh
* @param {Object|undefined} parameters - The THREE.TextGeometry parameters
* @return {Ember.GameObject}
*/
Ember.GameObject.Sphere = function(text, parameters){
    var go = new Ember.GameObject();
    if(text != undefined && parameters != undefined)
        go.mesh = new THREE.TextGeometry(text, parameters);
    else if(radius != undefined)
        go.mesh = new THREE.TextGeometry(text);
    else
        go.mesh = new THREE.TextGeometry("This is some text!");

    go.material = new THREE.MeshPhongMaterial();
    return go;
}
