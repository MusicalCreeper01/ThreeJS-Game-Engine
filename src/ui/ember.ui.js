
Ember.UI = function(ember){
    if(ember == undefined){
        console.error("Ember.UI must be passed an instance of Ember");
        return undefined;
    }
    if(ember.element == undefined){
        console.error("ember.element MUST be set to initialize a UI!");
        return undefined;
    }

    var _self = this;

    var Engine = famous.core.Engine;
    var Surface = famous.core.Surface;
    var Modifier = famous.core.Modifier;
    var Transform = famous.core.Transform;

    this.panels = [];

    this.active = true;

    _self.famous = {};
    _self.famous.context = Engine.createContext(ember.element);


    this.addPanel = function(panel){
        _self.panels.push(panel);
        var size = panel.getSize(ember.element);
        var surface = new Surface({
          size: [size.x, size.y],
          content: 'Hello world',
          properties: {
            backgroundColor: panel.color.toHex()
          }
        });
        _self.famous.context.add(surface)
    }

    this.draw = function(){


    }
}
