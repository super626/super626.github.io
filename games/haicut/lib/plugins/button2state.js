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
	'plugins.button2state'
)
.requires(
  'impact.entity',
  'impact.sound'
)

.defines(function() {

  Button2State = ig.Entity.extend({
  	type:ig.Entity.TYPE.B,
  	ignorePause: true,
  	
    size: { x: 80, y: 40 },
    
    text: [],
    textPos: { x: 5, y: 5 },
    textAlign: ig.Font.ALIGN.CENTER,
    textMode:"landscape",
    
    font: null,
    
    state: 'idle',
    
    _oldPressed: false,
    _startedIn: false,
    _bolIdle: false,
    
    //clip: new ig.Sound('media/Sound/tombol.*'),
    
    init: function( x, y, settings ) {
    	
      this.parent( x, y, settings );
      
      this.addAnim( 'idle', 1, [0] );
      this.addAnim( 'hover', 1, [1] );
      this.addAnim( 'active', 1, [2] );
      this.addAnim( 'idle2', 1, [3] );
      this.addAnim( 'hover2', 1, [4] );
      this.addAnim( 'active2', 1, [5] );
      
      if ( this.text.length > 0 && this.font === null ) {
        this.font = ig.game.font || new ig.Font( 'media/adlib_18.font.png' );
      }
      
   	  if (!ig.global.SOUND)
   	  	this.changeIdle();
    },
    
    update: function() {
      if ( this.state !== 'hidden' ) {
        var _clicked = ig.input.state( 'click' );
        
        //console.log("clicked : " + _clicked)
        
        if ( !this._oldPressed && this._inButton() ) {
          this._startedIn = true;
        }
        
        if ( this._startedIn && this.state !== 'deactive' && this._inButton()) {
          if ( _clicked && !this._oldPressed ) { // down
 
            if (!this._bolIdle)
          	  this.setState( 'active' );
          	else
          	  this.setState( 'active2' );
          	
            this.pressedDown();
          }
          else if ( _clicked ) { // pressed
          	
            if (!this._bolIdle)
          	  this.setState( 'active' );
          	else
          	  this.setState( 'active2' );
            this.pressed();
          }
          else if ( this._oldPressed ) { // up
          	
            if (!this._bolIdle)
          	  this.setState( 'idle' );
          	else 
          	  this.setState( 'idle2' );
          	  
            this.pressedUp();
          }
          else { // hover 
          	
          	if (!this._bolIdle)
          	  this.setState( 'hover' );
          	else
          	  this.setState( 'hover2' );
          }
        }
        else if ( this.state === 'active' || this.state == 'hover' || this.state === 'active2' || this.state == 'hover2' ) {
         
          if (!this._bolIdle)
          	this.setState( 'idle' );
          else 
          	this.setState( 'idle2' );
        }

        if ( this._oldPressed && !_clicked ) {
          this._startedIn = false;
        }

        this._oldPressed = _clicked;
      }
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
		            Math.floor(this.size.x/2) + this.pos.x + (w + 2) + this.textPos.x - ig.game.screen.x,
		            this.pos.y + this.textPos.y - ig.game.screen.y,
		            this.textAlign
		          );
		          
		          w += this.font.widthForString(this.text[i]) + 2;
		        }
	     	} 
      }
    },
    
  	changeIdle: function() {
  		
  		if (this._bolIdle) {
  			this.setState( "idle" );
  			this._bolIdle = false;
  		}
  		else {
  			this.setState( "idle2" );
  			this._bolIdle = true;
  		}
  	},
    
    setState: function( s ) {
      this.state = s;
      
      if (s == 'idle')
      	this._bolIdle = false;
      else if (s == 'idle2')
      	this._bolIdle = true;
      
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