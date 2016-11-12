/**
* The main class for all Ember games
* @namespace Ember
* @method Ember
* @param {Object} element - The DOM element that the game will live in
* @param {Object} params - The options for the game instance
* @var {Object} element - The DOM element the game lives in
* @var {String} name - The name of the game
* @var {bool} quaternions - Whether to use THREE quaternions (true) or not (false:default)
* @var {Array} scenes  - The game's scenes
* @var {Ember.Scene} scene  - The currently loaded scene
* @var {Object} SceneManager  - The {Object} for managing scenes
* @function begin - Initializes the THREE WebGL contex and creates the THREE objects {Ember.three}
* @function save - Serializes the game to a JSON string
* @function load - Deserializes a game from a JSON string
*/
function Ember (element, params){

    if(THREE == undefined){
        console.error("Three.js isn't loaded!");

        return {};
    }else{
        if(THREE.REVISION < 82){
            console.warn("Ember is tested with Three.js version >82, you are using " + THREE.REVISION + ". Things may break if there have been API changes, please be careful!");
        }
    }

    var _self = this;
    this.element = element;

    this.name = "My New Ember Game";

    if(params != undefined)
        if(params.save)
            for (var prop in params) this[prop] = params[prop];

    /*http://stackoverflow.com/questions/8624590/accessing-instance-variable-from-parent-function*/
    var _this;
    this.super = function(){
       _this = this;
     }

     this.scenes = [];
     this.scene = {};

     this.SceneManager = new (function(){
         this.load = function(scene){
             if(_self.three == undefined){
                 console.error("Three.js is not initialized, call Ember.begin() before loading scenes");
                 return;
             }
             if(!isNaN(scene)){
                 this._load(_self.scenes[scene]);
             }else{
                 _scenes.forEach(function(s){
                     if(s.name == scene)
                        this._load(_self.scenes[s]);
                 });
             }
         },
         this._load = function(scene){
             if(_self.three.scene.children.length > 2){
                 for( var i = _self.three.scene.children.length ; i >= 2; i--) {
                     if(_self.scene.children[i] != undefined)
                        _self.scene.remove(_self.scene.children[i]);
                 }
             }
             for(var i = 0; i < scene.objects.length; ++i){
                 console.log(scene.objects[i]._tmesh());
                 _self.three.scene.add(scene.objects[i]._tmesh());
             }
         }
         this.add = function(scene){
             _self.scenes.push(scene);
         }
     });

     this.begin = function(){
         _self.three = {};

        var width = _self.element.innerWidth;
        var height = _self.element.innerHeight;

         var scene = new THREE.Scene();
         _self.three.scene = scene;
         var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
         camera.position.z = 20;
         scene.add(camera);

         scene.add( new THREE.AmbientLight( 0xbbbbbb ) );

         var renderer = new THREE.WebGLRenderer();
        renderer.setSize( width, height );
        renderer.setPixelRatio( width/height );
        _self.element.appendChild( renderer.domElement );
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        _self.three.renderer = renderer;

        function render() {
        	requestAnimationFrame( render );
        	renderer.render( scene, camera );
        }
        render();

     }

     this.save = function(){
         this.save = true;

         var text = JSON.stringify(this);
         return text;
     }

     this.load = function(text){
         var parsed = JSON.parse(text);
         for (var prop in parsed) this[prop] = parsed[prop];
     }

}

Ember.quaternions = false;

/**
* The class for holder a 3 dimensional vector
* @namespace Ember
* @method Vector3
* @param {float} newX - The X position for the Vector
* @param {float} newY - The Y position for the Vector
* @param {float} newZ - The Z position for the Vector
* @var {float} x - The x (left/right) position of the object
* @var {float} y - The y (up/down) position of the object
* @var {float} z - The z (forward/back) position of the object
* @function set - Sets new x, y, and z coordinates for the {Ember.Vector3}
*/
Ember.Vector3 = function(newX, newY, newZ){
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
/**
* The class for all objects in the game's scene
* @namespace Ember
* @method GameObject
* @var {String} name - The name of the gameobject
* @var {int} layer - The display later the object is a part of
* @var {Array} tags - A string array of tags to be used for referencing groups of objects later
* @var {bool} active - Whether the object is in the scene or not
* @var {THREE.Mesh} mesh - The mesh of the object
* @var {THREE.Material} material - The material for the object mesh
* @var {Array} scripts - The scripts that will run on the object when it's active
* @var {Ember.Vector3} position - The position of the object
* @var {Ember.Vector3} rotation - The rotation of the object, a {THREE.Quaternion} if the quaternions param is enables in the {Ember} object
* @var {Ember.Vector3} scale - The size of the object
*/
Ember.GameObject = function(){
    this.name = "New GameObject";
    this.layer = 0;
    this.tags = [];

    this.active = true;

    this.mesh = {};
    this.material = {};
    this.scripts = [];

    this._tmesh = function(){
        return new THREE.Mesh(this.mesh, this.material)
    };

    this.position = new Ember.Vector3();
    if(Ember.quaternions)
        this.rotation = new Ember.Vector3();
    else
        this.rotation = new THREE.Quaternion();
    this.scale = new Ember.Vector3();

}
/**
* The class for all scenes in the game
* @namespace Ember
* @method Scene
* @var {String} name - The name of the scene
* @var {Array} objects - The {Ember.GameObject}s in the scene
*/
Ember.Scene = function(){
    this.name = "New Scene";
    this.objects = [];

    this.add = function(go){
        this.objects.push(go);
    }

}
