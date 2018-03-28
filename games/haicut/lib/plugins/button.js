// A Button Entity for Impact.js
// Has 4 States:
// * hidden - Not shown
// * idle - just sitting there
// * active - someone is pushing on it
// * deactive - shown, but not usable

// And 3 Events
// * pressedDown - activated when pressed Down
// * pressed - constantly fires when pressing
// * pressedUp - activated when button released

// Can render Text. Should explain itself.

// Use like you want to, just don't blame me for anything.

ig.module(
	'plugins.button'
)
.requires(
  'impact.entity'
)

.defines(function() {

  Button = ig.Entity.extend({
  	type:ig.Entity.TYPE.B,
  	ignorePause:true,
  	
    size: { x: 80, y: 40 },
    
    text: [],
    textPos: { x: 5, y: 5 },
    textAlign: ig.Font.ALIGN.CENTER,
    textMode:"landscape",
    
    font: null,
    
    state: 'idle',
    counter:0,
    _oldPressed: false,
    _startedIn: false,
    
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      
      this.addAnim( 'idle', 1, [0] );
     // this.addAnim( 'hover', 1, [0] );
      //this.addAnim( 'active', 1, [0] );
      //this.addAnim( 'deactive', 1, [0] );
      
      if ( this.text.length > 0 && this.font === null ) {
        //this.font = ig.game.font || new ig.Font( 'media/adlib_18.font.png' );
        this.font = ig.game.font;
      }
    },
    
    update: function() {
      if (this.counter > 0) this.counter--;
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
            else if ( this._oldPressed && this.counter <= 0) { // up
              this.counter = 30;
                this.pressedUp();
            }
            
          }
          
          if ( this._oldPressed && !_clicked ) {
            this._startedIn = false;
          }
      
          this._oldPressed = _clicked;
          
      this.parent();
    },
    
    draw: function() {
      if ( this.state !== 'hidden' ) {
        this.parent();

				if (this.textMode == "portrait") {
	        for ( var i = 0; i < this.text.length; i++ ) {
	          this.font.draw(
	            this.text[i],
	            this.pos.x + this.textPos.x - ig.game.screen.x,
	            this.pos.y + ((this.font.height + 2) * i) + this.textPos.y - ig.game.screen.y,
	            this.textAlign
	          );
	        }
	     	} else {
	     		var w = 0;
	     		for ( var i = 0; i < this.text.length; i++ ) {
	     			//console.log("i " + (this.pos.x + ((this.font.width + 2) * i) + this.textPos.x - ig.game.screen.x))
	     			
	          this.font.draw(
	            this.text[i],
	            this.pos.x + (w + 2) + this.textPos.x - ig.game.screen.x,
	            this.pos.y + this.textPos.y - ig.game.screen.y,
	            this.textAlign
	          );
	          
	          w += this.font.widthForString(this.text[i]) + 2;
	        }
	     	} 
      }
    },
    
    setState: function( s ) {
      this.state = s;
      
      if ( this.state !== 'hidden' ) {
        this.currentAnim = this.anims[ this.state ];
      }
    },
    
    pressedDown: function() {},
    pressed: function() {},
    pressedUp: function() {},
    
    _inButton: function() {
      return ig.input.mouse.x + ig.game.screen.x > this.pos.x &&
             ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x &&
             ig.input.mouse.y + ig.game.screen.y > this.pos.y &&
             ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
    }
  });

});