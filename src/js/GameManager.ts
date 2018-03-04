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

    const p1Settings = {
      id: 0,
      controls: { up: 38, down: 40 },
      batLocation: new Vector3(8, 0, 0),
      scoreBox: {
        corners: [new Vector3(-10, 3.5, -1), new Vector3(-8.5, -3.5, 1)]
      },
      color: new Color(0.8, 0.5, 0.1)
    }

    const player1 = new PongPlayer();
    player1.init(p1Settings);
    this._pongPlayers.push(player1);
    this._pongScene.addMesh(player1.bat.mesh);
    this._pongScene.addMesh(player1.scoreDisplay.mesh);

    const p2Settings = {
      id: 1,
      controls: { up: 81, down: 90 },
      batLocation: new Vector3(-8, 0, 0),
      scoreBox: {
        corners: [new Vector3(10, 3.5, -1), new Vector3(8.5, -3.5, 1)]
      },
      color: new Color(0.1, 0.8, 0.5)
    }

    const player2 = new PongPlayer();
    player2.init(p2Settings);
    this._pongPlayers.push(player2);
    this._pongScene.addMesh(player2.bat.mesh);
    this._pongScene.addMesh(player2.scoreDisplay.mesh);
    
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
      _ball.animate(this._pongPlayers, this.pongBats, this._pongScene.bounds);
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
