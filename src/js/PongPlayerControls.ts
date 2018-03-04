import events = require('events');
import { PongInputEmitter } from './InputManager';
import { ControlScheme } from './PongInterfaces';

class PongPlayerControls extends events.EventEmitter {
  public events = {
    upPressed: 'up',
    downPressed: 'down'
  };
  private _controls: ControlScheme = {up: -1, down: -1};
  constructor() {
    super();
    this.emitUpPressed = this.emitUpPressed.bind(this);
    this.emitDownPressed = this.emitDownPressed.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  public setControls(_controls: ControlScheme) {
    this._controls.up = _controls.up;
    this._controls.down = _controls.down;
    PongInputEmitter.on(PongInputEmitter.events.keyDown, this.keyDown);
  }

  private keyDown(_event: KeyboardEvent) {
    switch (_event.keyCode) {
      case this._controls.up:
        this.emitUpPressed();
        break;
      case this._controls.down:
        this.emitDownPressed();
        break;
    }
  }

  /** Emitters */
  private emitUpPressed() {
    this.emit(this.events.upPressed);
  }

  private emitDownPressed() {
    this.emit(this.events.downPressed);
  }
}

export {PongPlayerControls};
