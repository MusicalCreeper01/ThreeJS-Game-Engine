/**
 * Three.JS variable
 * @external THREE
 * @see {@link https://threejs.org/}
 */


/**
* The main class for all Ember games
* @constructor
* @class
* @param {Object} element - The DOM element that the game will live in
* @param {Object} params - The options for the game instance
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

    /**
     * The DOM element the game lives in
     * @type {Object}
     */
    this.element = element;

    /**
     * The name of the game
     * @type {string}
     */
    this.name = "My New Ember Game";

    if(params != undefined)
        if(params.save)
            for (var prop in params) this[prop] = params[prop];

    /*http://stackoverflow.com/questions/8624590/accessing-instance-variable-from-parent-function*/
    var _this;
    this.super = function(){
       _this = this;
     }

     /**
      * All the scenes in the game
      * @type {?Array<Ember.Scene>}
      */
     this.scenes = [];
     /**
      * The currently loaded scene
      * @type {Ember.Scene}
      */
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
                 _self.scenes.forEach(function(s){
                     if(s.name == scene)
                        this._load(_self.scenes[s]);
                 });
             }
         },
         this._load = function(emberscene){
             if(_self.scene != undefined && _self.scene.Events != undefined)
                _self.scene.Events.ObjectAdded = [];

             _self.scene = emberscene;

             if(_self.three.scene.children.length > 2){
                 console.log("Clearing previous scene")
                 for( var i = _self.three.scene.children.length ; i >= 2; i--) {
                     if(_self.three.scene.children[i] != undefined)
                        _self.three.scene.remove(_self.three.scene.children[i]);
                 }
             }
             if(emberscene.objects != undefined){
                 console.log("Adding " + emberscene.objects.length + " objects from new scene")
                 for(var i = 0; i < emberscene.objects.length; ++i){
                     console.log(emberscene.objects[i]._tmesh());
                     _self.three.scene.add(emberscene.objects[i]._tmesh());
                 }
             }

             _self.scene.Events.ObjectAdded.push(function(go){
                 console.log("Added object to scene");
                 _self.three.scene.add(go._tmesh());
             })
         }
         this.add = function(scene){
             _self.scenes.push(scene);
         }
     });

     this.begin = function(){
         _self.three = {};

        var width = _self.element.offsetWidth;
        var height = _self.element.offsetHeight;

        if(width == undefined || width == 0 || height == undefined || height == 0){
            console.error("Width/Height of the game element is 0! ");
        }

        console.log(width + "/" + height);

         var scene = new THREE.Scene();
         _self.three.scene = scene;
         var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
         camera.position.z = 5;
         scene.add(camera);

         scene.add( new THREE.AmbientLight( 0xffffff ) );

         /*var geometry = new THREE.BoxGeometry( 1, 1, 1 );
         var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
         var cube = new THREE.Mesh( geometry, material );
         scene.add( cube );*/

         var renderer = new THREE.WebGLRenderer({ antialias: true });
//         renderer.setClearColor( 0x000000, 0 );
         renderer.setPixelRatio( width/height );
         renderer.setSize( width, height );

         _self.element.appendChild( renderer.domElement );
         renderer.domElement.style.width = '100%';
         renderer.domElement.style.height = '100%';
         _self.three.renderer = renderer;

        function render() {
        	requestAnimationFrame( render );

            camera.updateProjectionMatrix();

            renderer.setViewport( 0, 0, width, height );
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


Ember.Color = function(nr, ng, nb, na){

    this.r = 255;
    this.g = 86;
    this.b = 0;
    this.a = 1;

    if(nr != undefined && ng != undefined && nb != undefined && na != undefined){
        this.r = nr;
        this.g = ng;
        this.b = nb;
        this.a = na;
    }else if (nr != undefined && ng != undefined && nb != undefined ){
        this.r = nr;
        this.g = ng;
        this.b = nb;
    }else if (nr != undefined){
        if(Ember.Util.Color != undefined){
            var rgb = Ember.Util.Color.fromHex(nr);
            this.r = rgb.r;
            this.g = rgb.g;
            this.b = rgb.b;
        }else{
            console.error("Hex input to the Ember.Color constructor is currently not supported due to the color utilities modules not being included")
        }
    }



}

/**
* The class for all objects in the game's scene
* @constructor
*/
Ember.GameObject = function(){
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
     * @type {THREE.Material}
     */
    this.material = {};
    /**
     * The scripts for the object that will run when the object is active and in the scene
     * @type {?Array<string>}
     */
    this.scripts = [];

    this._tmesh = function(){
        return new THREE.Mesh(this.mesh, this.material)
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

Ember.GameObject.Box = function(){
    var go = new Ember.GameObject();
    go.mesh = new THREE.BoxGeometry();
    go.material = new THREE.MeshBasicMaterial();
    return go;
}

/**
* The class for all scenes in the game
* @constructor
*/
Ember.Scene = function(){
    /**
     * The name of the scene - used when loading the scene
     * @type {string}
     */
    this.name = "New Scene";
    /**
     * The {Ember.GameObject} in the scene
     * @type {?Array<Ember.GameObject>}
     */
    this.objects = [];

    this.Events = {};
    this.Events.ObjectAdded = [];

    this.add = function(go){
        this.objects.push(go);
        this.Events.ObjectAdded.forEach(function(callback){
            callback(go);
        });
    }

}
