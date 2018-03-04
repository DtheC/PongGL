import { PongBat } from "./PongBat";
import { ControlScheme } from "./PongInterfaces";
import { Color, Vector3 } from "three";

class PongPlayer {
  private _bat: PongBat = new PongBat();
  private _number: number;
  constructor() {}

  public init(_playerNumber: number, _controls: ControlScheme, _location: Vector3) {
    this._number = _playerNumber;
    this._bat.init(new Color(0xffffff), _controls, _location);
  }

  public animate() {
    this._bat.animate();
  }

  /** Getters & Setters */
	public get bat(): PongBat {
		return this._bat;
	}
  
}

export {PongPlayer};
