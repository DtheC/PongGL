import { PlaneBufferGeometry, MeshBasicMaterial, CanvasTexture, Mesh, Texture } from "three";
import { PlayerSettings } from "./PongInterfaces";

class PongScoreDisplay {
  private _ctx: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;
  private _geometry: PlaneBufferGeometry;
  private _material: MeshBasicMaterial;
  private _mesh: Mesh;

  constructor() {}

  init(_settings: PlayerSettings) {
    this._canvas = document.createElement('canvas');
    document.body.appendChild(this._canvas);
    this._canvas.height = 512;
    this._canvas.width = 512;
    this._ctx = this._canvas.getContext('2d');

    this._geometry = new PlaneBufferGeometry(3, 3);
    this._material = new MeshBasicMaterial({map: new Texture(this._canvas), transparent: true});
    this._material.map.needsUpdate = true;
    this._mesh = new Mesh(this._geometry, this._material);
    this._mesh.position.set(_settings.batLocation.x, _settings.batLocation.y, 0.1);
    this.updateScore(0);
  }

  public updateScore(_score: number) {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.font = "200px 'Source Code Pro', monospace";
    this._ctx.fillStyle = 'white';
    this._ctx.textAlign = "center";
    this._ctx.fillText(_score.toString(), this._canvas.width / 2, this._canvas.height / 2);
    this._material.map.needsUpdate = true;
  }

  get mesh() : Mesh {
    return this._mesh;
  }
}

export {PongScoreDisplay};
