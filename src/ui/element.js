/*
    http://stackoverflow.com/a/32212067/3980985

    Whyen creating new elements call
    Ember.UI.Element.apply(this);
    at the top of the new constructor

*/

Ember.UI.Element = function (){
    var _self = this;

    this.name = "UI Element";

    this.position = new Ember.Vector2();
    this.rotation = new Ember.Vector3();

    this.size = new Ember.Vector2();
    this.sizepercent = true;

    this.getSize = function (element){
        return Ember.Util.Transform.getSize(_self.size, element, _self.sizepercent);
    }
}
