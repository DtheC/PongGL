import { BoxGeometry, MeshBasicMaterial, Mesh, Geometry, Material, Color, Vector3 } from "three";
import { PongScene } from "./scene";
import { PongBat } from "./PongBat";
import { PongBall } from "./PongBall";
import { PongPlayer } from "./PongPlayer";

class PongGameManager {
  private _pongScene: PongScene;
  private _pongBalls: Array<PongBall>;
  private _pongPlayers: Array<PongPlayer>;
  constructor() {
    this._pongBalls = [];
    this._pongPlayers = [];

    this._pongScene = new PongScene();
    this._pongScene.init();

    const playerControls = { up: 38, down: 40 };
    const player1 = new PongPlayer();
    player1.init(0, playerControls, new Vector3(8, 0, 0));
    this._pongPlayers.push(player1);
    this._pongScene.addMesh(player1.bat.mesh);

    playerControls.up = 81;
    playerControls.down = 90;
    const player2 = new PongPlayer();
    player2.init(1, playerControls, new Vector3(-8, 0, 0));
    this._pongPlayers.push(player2);
    this._pongScene.addMesh(player2.bat.mesh);
    
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
      _ball.animate(this.pongBats, this._pongScene.bounds);
    }
    for (let _player of this._pongPlayers) {
      _player.animate();
    }
  }

  /** Getters & Setters */
	public get pongBats(): Array<PongBat> {
		return this._pongPlayers.map(x => x.bat);
	}
}

export {PongGameManager};
