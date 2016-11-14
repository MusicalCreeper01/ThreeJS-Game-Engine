/**
* The class for storing a 3 dimensional vector
* @constructor
* @param {number|number|number|undefined} nr - The R color or a hex code
* @param {number|number|undefined} ng - The G color
* @param {number|number|undefined} nb - The B color
* @param {number|undefined} na - The Alpha color
*/
Ember.Color = function(nr, ng, nb, na){

    this.r = 255;
    this.g = 86;
    this.b = 0;
    this.a = 1;

    this.Events = {};
    this.Events.OnChange = [];

    this.set = function(nr, ng, nb, na){
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
        this.Events.OnChange.forEach((callback) => callback(this));
    };

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

    this.toHex = function(){
        if(Ember.Util.Color != undefined){
            return Ember.Util.Color.toHex(this.r, this.g, this.b);
        }else{
            console.error("Hex output from Ember.Color is currently not supported due to the color utilities modules not being included")
        }
    }

}
