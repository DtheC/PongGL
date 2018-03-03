import events = require('events');

class PongInputEmitter extends events.EventEmitter  {

  public events = {
    mouseDown: 'mousedown'
  };
  
  constructor(){
    super();
    
    this.emitMouseDown = this.emitMouseDown.bind(this);

    document.addEventListener('mousedown', this.emitMouseDown);
  }

  private emitMouseDown(_event: Event) {
    this.emit(this.events.mouseDown, _event);
  }
}

const pongInputEmitter = new PongInputEmitter();
export {pongInputEmitter as PongInputEmitter};
