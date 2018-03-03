import events = require('events');

class PongInputEmitter extends events.EventEmitter  {

  public events = {
    mouseDown: 'mousedown',
    upPressed: 'uppressed',
    downPressed: 'downpressed',
    leftPressed: 'leftpressed',
    rightPressed: 'rightPressed'
  };
  
  constructor(){
    super();
    
    this.emitMouseDown = this.emitMouseDown.bind(this);
    this.emitUpPressed = this.emitUpPressed.bind(this);
    this.emitDownPressed = this.emitDownPressed.bind(this);
    this.emitLeftPressed = this.emitLeftPressed.bind(this);
    this.emitRightPressed = this.emitRightPressed.bind(this);
    this.keyDown = this.keyDown.bind(this);

    document.addEventListener('mousedown', this.emitMouseDown);
    document.addEventListener('keydown', this.keyDown);
  }

  private keyDown(_event: KeyboardEvent) {
    switch (_event.keyCode) {
      case 38: // Up
        this.emitUpPressed(_event);
        break;
      case 40: // Down
        this.emitDownPressed(_event);
        break;
      case 37: // Left
        this.emitLeftPressed(_event);
        break;
      case 39: // Right
        this.emitRightPressed(_event);
        break;
    
      default:
        break;
    }
  }

  private emitMouseDown(_event: Event) {
    this.emit(this.events.mouseDown, _event);
  }
  private emitUpPressed(_event: Event) {
    this.emit(this.events.mouseDown, _event);
  }
  private emitDownPressed(_event: Event) {
    this.emit(this.events.mouseDown, _event);
  }
  private emitLeftPressed(_event: Event) {
    this.emit(this.events.mouseDown, _event);
  }
  private emitRightPressed(_event: Event) {
    this.emit(this.events.mouseDown, _event);
  }
}

const pongInputEmitter = new PongInputEmitter();
export {pongInputEmitter as PongInputEmitter};
