import { Material, Geometry, Mesh, Vector3, Color, MeshBasicMaterial, BoxBufferGeometry } from "three";
import { PongInputEmitter } from "./InputManager";

class PongBat {
  private _material: Material;
  private _geometry: BoxBufferGeometry;
  private _mesh: Mesh;
  private _location: Vector3;
  private _velocity: Vector3;
  private _acceleration: Vector3;

  constructor() {
    this.upPressed = this.upPressed.bind(this);
    this.downPressed = this.downPressed.bind(this);
  }

  public init(_playerNumber: number, _color: Color) {
    /** Init Mesh */
    this._material = new MeshBasicMaterial({color: _color});
    this._geometry = new BoxBufferGeometry(1, 5, 1);
    this._mesh = new Mesh(this._geometry, this._material);

    /** Event Listening */
    PongInputEmitter.on(PongInputEmitter.events.upPressed, this.upPressed);
    PongInputEmitter.on(PongInputEmitter.events.downPressed, this.downPressed);
  }

  /** Input Functions */
  private upPressed(_event: Event) {
    this._acceleration.add(new Vector3(0, 1, 0));
  }

  private downPressed(_event: Event) {
    this._acceleration.add(new Vector3(0, -1, 0));
  }

  /** Getters / Setters */
	public get mesh(): Mesh {
		return this._mesh;
	}
}
