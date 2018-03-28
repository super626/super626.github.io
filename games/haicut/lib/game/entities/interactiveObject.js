ig.module(
	'game.entities.interactiveObject'
)
.requires(
	'impact.entity'
)

.defines(function() {
	
	InteractiveObject = ig.Entity.extend({
		
		size: null,
		zIndex: null,
		path: null,
		init: function( x, y, settings ) {;
			this.parent( x, y, settings );
			
			if (this.path != null) {
				this.animSheet = new ig.AnimationSheet( this.path, this.size.x, this.size.y);
				this.addAnim( 'idle', 1, [0] );
			}
		},
		
		_oldPressed: false,
    	_startedIn: false,
    	_hoveringOut: false,
		update:function(){
			
			var _clicked = ig.input.state( 'click' );

			if ( !this._oldPressed && this._inButton()) {
				this._startedIn = true;
			}
			
			if ( this._startedIn && this._inButton() ) {
         		if ( _clicked && !this._oldPressed ) { // down
            		this.pressedDown();
          		}
         		else if ( _clicked ) { // pressed
         			this.pressed();
          		}
         		else if ( this._oldPressed ) { // up
            		this.pressedUp();
         		}
	       		else { 	// hover
	          		this.hovered();
	          		this._hoveringOut = true;
	          	}
       		}
       		
       		if ( !this._inButton() && this._hoveringOut) {
       			this.hoveredOut();
       			this._hoveringOut = false;
       		}

       		if ( this._oldPressed && !_clicked ) {
         		this._startedIn = false;
        	}
			
        	this._oldPressed = _clicked;
        	
			this.parent();
		},
		
		pressedDown: function() {},
		
		pressed: function() {},
		
		pressedUp: function() {},
		
		hovered: function() {},
		
		hoveredOut: function() {},
		
		_inButton: function() {
	      return ig.input.mouse.x + ig.game.screen.x >= this.pos.x &&
	             ig.input.mouse.x + ig.game.screen.x <= this.pos.x + this.size.x &&
	             ig.input.mouse.y + ig.game.screen.y >= this.pos.y &&
	             ig.input.mouse.y + ig.game.screen.y <= this.pos.y + this.size.y;
	  	},
	});
});

