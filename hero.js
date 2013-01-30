var Hero = Bot.$extend({

	setPosition : function() {
		// Throw the bot somewhere on the screen randomly
		this.x = 32 + (Math.random() * (canvas.width - 64));
		this.y = 32 + (Math.random() * (canvas.height - 64));
	}

});