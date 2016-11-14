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

             /* Add new objects to the THREE scene as their added to the Ember scene */
             _self.scene.Events.ObjectAdded.push(function(go){
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

         _self.three.camera = camera;

         var ambient = new THREE.AmbientLight( 0x444 );
         console.log(ambient);

         scene.add( ambient );

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

         _self.renderer = {
             camera: camera,
             ambient: ambient,
             WebGLRenderer: renderer
         }

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
