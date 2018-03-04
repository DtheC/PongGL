import { Color, Vector3, Vector } from "three";

interface ControlScheme {
  up: number,
  down: number
}

interface ScoreBox {
  corners: Array<Vector3>
}

interface PlayerSettings {
  id: number,
  controls: ControlScheme,
  batLocation: Vector3,
  scoreBox: ScoreBox,
  color?: Color,
}

export {ControlScheme, ScoreBox, PlayerSettings};
