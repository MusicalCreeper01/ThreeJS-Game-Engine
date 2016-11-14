Ember.Util.Transform = {
    getSize : function(size, element, percent){
        if(!(size instanceof Ember.Vector2)){
            console.error("At the moment getSize is only avaliable for Vector2");
        }

        if(!percent)
            return size;
        else{
            var width = element.offsetWidth;
            var height = element.offsetHeight;

            console.log(width);
            console.log(size.x);

            size.x = (size.x/100)*width;
            size.y = (size.y/100)*height;

            return size;

        }
    }

};
