import { Vector3, Box3 } from "three";
import { Box3Helper} from '../../node_modules/three/build/three';
import { ScoreBox } from "./PongInterfaces";

class PongScoreZone {
  public events = {
    ballHasEntered: 'ballentered'
  }

  private _area: Box3 = new Box3();
  public helper: Box3Helper;
	constructor() {
  }

  init(_corners: ScoreBox) {
    const numbers = [_corners.corners[0].x, _corners.corners[0].y, _corners.corners[0].z,
      _corners.corners[1].x, _corners.corners[1].y, _corners.corners[1].z ];
    this._area = new Box3().setFromArray(numbers);
    this.helper = new Box3Helper(this._area, 0xffff00);
  }
  
  /** Getters & Setters */
  public get area() : Box3 {
    return this._area;
  }
}
export {PongScoreZone};
