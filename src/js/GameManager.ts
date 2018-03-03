import { BoxGeometry, MeshBasicMaterial, Mesh, Geometry, Material } from "three";
import { PongScene } from "./scene";

class PongGameManager {
  private _pongScene: PongScene;
  constructor() {
    this._pongScene = new PongScene();
    this._pongScene.init();
  }  
}

export {PongGameManager};
