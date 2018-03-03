import { BoxGeometry, MeshBasicMaterial, Mesh, Geometry, Material, Color } from "three";
import { PongScene } from "./scene";
import { PongBat } from "./PongBat";
import { PongBall } from "./PongBall";

class PongGameManager {
  private _pongScene: PongScene;
  private _pongBats: Array<PongBat>;
  private _pongBalls: Array<PongBall>;
  constructor() {
    this._pongBats = [];
    this._pongBalls = [];

    this._pongScene = new PongScene();
    this._pongScene.init();

    const bat1 = new PongBat();
    bat1.init(0, new Color(0xffffff));
    this._pongScene.addMesh(bat1.mesh);
    this._pongBats.push(bat1);

    const ball1 = new PongBall();
    ball1.init();
    this._pongScene.addMesh(ball1.mesh);
    this._pongBalls.push(ball1);

    this.animate = this.animate.bind(this);
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate);
    this._pongScene.animate();
    for (let _ball of this._pongBalls) {
      _ball.animate(this._pongBats, this._pongScene.bounds);
    }
    for (let _bat of this._pongBats) {
      _bat.animate();
    }
  }
}

export {PongGameManager};
