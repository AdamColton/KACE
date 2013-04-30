function Label(text,x,y){
  this.text = text;
  this.location = new Vector(x,y);
  this.size = new Vector(text.length*20,20);
  Widgets.add(this);
}
Label.prototype.draw = "text";
Label.prototype.font = "10pt Arial";
Label.prototype.color = "black";
Label.prototype.update = function(){ Screen.append(this,1);}
Label.prototype.trigger = function(){}