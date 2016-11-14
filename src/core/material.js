
/**
* The class for all scenes in the game
* @constructor
*/
Ember.Material = function(){
    var _self = this;

    /**
     * The name of the material
     * @type {string}
     */
    this.name = "New Scene";

    /**
     * The shader to be used for the material, if defined THREE uses a THREE.ShaderMaterial with the fragmentShader and vertexShader included in the supplied shader
     * @type {?THREE.Shader}
     */
    this.shader = undefined;

    this.Events = {};
    this.Events.OnChange = [];

    this.setShader = function(s){
        this.shader = s;
        this.Events.OnChange.forEach(function(callback){
            if(_self._t != undefined)
                _self._tmat();
            callback(_self);
        })
    }

    /**
     * The texture to be used on the material, passed to the map variable for the shader
     * @type {THREE.Image}
     */
    this.texture = null;

    this.setTexture = function(s){
        this.texture = s;
        this.Events.OnChange.forEach(function(callback){
            if(_self._t != undefined)
                if(_self._t.map != undefined)
                    _self._t.map = s;
            callback(_self);
        })
    }

    /**
     * The color of the material
     * @type {Ember.Color}
     */
    this.color = new Ember.Color(255,255,255);
    this.setColor = function(s){
        if(!(s instanceof Ember.Color)){
            console.error("Passed wrong instance type to Ember.Material.color");
            return;
        }

        this.color = s;

        if(_self._t != undefined){
            console.log("mat exists..")
            if(_self._t.color != undefined){
                console.log("color exists..")
                _self._t.color.setRGB(s.r, s.g, s.b);
            }
        }

        this.Events.OnChange.forEach(function(callback){
            callback(_self);
        })
    }

    /**
     * The side of the object that will be rendered when using a custom shader
     * @type {THREE.FrontSide|THREE.BackSide}
     */
    this.renderside = THREE.FrontSide;

    this.setRenderside = function(s){
        this.renderside = s;
        this.Events.OnChange.forEach(function(callback){
            if(_self._t != undefined)
                if(_self._t.side != undefined)
                    _self._t.side = _self.renderside;
            callback(_self);
        })
    }

    /**
     * A material that will override all the other parameters in this material object
     * @type {THREE.Material}
     */
    this.override = undefined;

    this.setOverride = function(s){
        this.override = s;
        this.Events.OnChange.forEach(function(callback){
            if(_self._t != undefined)
                _self._tmat();
            callback(_self);
        })
    }

    this._tmat = function(){
        if(_self.override != undefined){
            return _self.override;
        }else if(_self.shader != undefined){
            _self._t = new THREE.ShaderMaterial({
                fragmentShader    : _self.shader.fragmentShader,
                vertexShader  : _self.shader.vertexShader,
                uniforms  : _self.shader.uniforms,
                depthWrite : false,
                side: _self.renderside
            });
            return _self._t;
        }else{
            _self._t = new THREE.MeshBasicMaterial({
                color    : _self.color.toHex(),
                map: _self.texture
            });
            return _self._t;
        }
    };

}

Ember.Material.Skybox = function(urls, callback){
    var mat = new Ember.Material();
    mat.name = "Sky";

    var textureCube = THREE.ImageUtils.loadTextureCube( urls , undefined, function () {
        mat.texture = textureCube;

        var shader = THREE.ShaderLib["cube"];
        var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
        shader.uniforms['tCube'].value = textureCube;   // textureCube has been init before

        mat.shader = shader;
        mat.renderSide = THREE.BackSide;

        if(callback != null)
            callback(mat);
    });

    return mat;
}
Ember.Material.LoadRemote = function(url, callback){

    var _self = {
        loaded: false,
        progress: 0,
        error: false,
        material: mat
    };

    var mat = new Ember.Material();
    mat.name = "Loaded Material";

    THREE.MaterialLoader.load(url, function(material){
        _self.loaded = true;
        mat.override = material;
        if(callback != undefined)
            callback(mat)
    }, function(xhr){
        _self.progress = (xhr.loaded / xhr.total * 100);
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    }, function(){
        _self.error = true;
    });

    return _self;
}
