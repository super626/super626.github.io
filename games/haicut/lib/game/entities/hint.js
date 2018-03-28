
ig.module(
	'game.entities.hint'
)
.requires(
  'impact.entity'
)

.defines(function() {

  HintText = ig.Entity.extend({
    size: { x: 185, y: 57 },
    text: [],
    textPos: { x: 15, y: 20 },
    textAlign: ig.Font.ALIGN.LEFT,
    textMode:"landscape",
    font: new ig.Font( '', 10, 110, 11, '#000','center', 1, false),
    state: 'idle',
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1, [0] );      
    },
    
   
    draw: function() {
      if ( this.state !== 'hidden' ) {
        this.parent();

        if (this.textMode == "portrait") {
          console.log("portrait");
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
    }
  });

});