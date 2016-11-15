/**
* Handles creating a ui layer for the game
* @constructor
* @memberof Ember
*/
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
        panel.famous = {
            surface: surface
        };
        panel.remove = function(){
            return _self.removePanel(panel);
        }
        return panel;
    }

    this.removePanel = function(panel){
        if(panel.famous.surface == undefined){
            console.error("To remove a panel from a UI you nede to pass the panel object returned from the add call");
            return undefined;
        }
        panel.famous.surface.render = function(){
            return null;
        }
        delete panel.famous;

        var index = _self.panels.indexOf(panel);
        if (index > -1) {
            _self.panels.splice(index, 1);
        }

        return panel;
    }

    this.draw = function(){


    }
}
