import { BoxGeometry, MeshBasicMaterial, Mesh, Geometry, Material, Color } from "three";
import { PongScene } from "./scene";
import { PongBat } from "./PongBat";

class PongGameManager {
  private _pongScene: PongScene;
  private _pongBats: Array<PongBat>;
  constructor() {
    this._pongBats = [];
    this._pongScene = new PongScene();
    this._pongScene.init();
    const bat1 = new PongBat();
    bat1.init(0, new Color(0xffffff));
    this._pongScene.addMesh(bat1.mesh);
    this._pongBats.push(bat1);
  }  
}

export {PongGameManager};
