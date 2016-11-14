
/**
* The class for all scenes in the game
* @constructor
*/
Ember.Scene = function(){
    var _self = this;

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

    this.enviroment = new (function(){
        this.ambientColor = 0xddd;
        var backgroundTypes = {
            Skybox: 0,
            Color: 1,
            Transparent: 2
        };
        this.background = {
            type: backgroundTypes.Color,
            color: 0x0EB2E8,
            skybox: new Ember.Material.Skybox([ "img/sky/posx.jpg", "img/sky/negx.jpg", "img/sky/posy.jpg","img/sky/negy.jpg", "img/sky/posz.jpg", "img/sky/negz.jpg" ])

        }

    });

    this.Events = {};
    this.Events.ObjectAdded = [];

    this.add = function(go){
        this.objects.push(go);
        this.Events.ObjectAdded.forEach(function(callback){
            callback(go);
        });
    }

}
