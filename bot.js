var Bot = Class.$extend({
	__init__ : function(x, y, speed, imageUrl) {
		this.x = x;
		this.y = y;
		this.speed = speed;

		this.imageUrl = imageUrl;
		this.img = new Image();
		this.initiated = false;

		this.loadImage();
		this.setPosition();
	},

	loadImage: function()  {
		var self = this;
		this.img.onload = function() {
			self.loadHandler();
		};
		this.img.src = this.imageUrl;
	},

	loadHandler: function() {
		this.initiated = true;
	},

	setPosition : function() {

	},

	render : function() {		
		if (this.initiated) {
			ctx.drawImage(this.img, this.x, this.y);
		}
	}
});