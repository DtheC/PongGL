import { Material, Geometry, Mesh, Vector3, Color, MeshBasicMaterial, BoxBufferGeometry, Box3 } from "three";
import { PongInputEmitter } from "./InputManager";
import { PongPlayerControls } from "./PongPlayerControls";
import { ControlScheme } from "./PongInterfaces";
import { PongGlobals } from "./PongGlobals";

class PongBat {
  private _material: Material;
  private _geometry: BoxBufferGeometry;
  private _mesh: Mesh;
  private _location: Vector3 = new Vector3();
  private _velocity: Vector3 = new Vector3();
  private _acceleration: Vector3 = new Vector3();
  private _speed: number = 0.1;
  private _collider: Box3 = new Box3();
  private _controls: PongPlayerControls = new PongPlayerControls();

  constructor() {
    this.upPressed = this.upPressed.bind(this);
    this.downPressed = this.downPressed.bind(this);
  }

  public init(_color: Color, _controls: ControlScheme, _location: Vector3) {
    /** Init Mesh */
    this._material = PongGlobals.BatMaterial(_color);
    this._geometry = new BoxBufferGeometry(0.25, 1.5, 1);
    this._mesh = new Mesh(this._geometry, this._material);
    this._mesh.castShadow = true;
    this._location = _location.clone();
    this._collider.setFromObject(this._mesh);

    this._controls.setControls(_controls);

    /** Event Listening */
    this._controls.on(this._controls.events.upPressed, this.upPressed);
    this._controls.on(this._controls.events.downPressed, this.downPressed);
  }

  /** Input Functions */
  private upPressed() {
    this._acceleration.add(new Vector3(0, this._speed, 0));
  }

  private downPressed() {
    this._acceleration.add(new Vector3(0, -this._speed, 0));
  }

  /** Animation Loop */
  public animate() {
    // TODO: Check in natureofcode to figure out how to deal with drag
    this._velocity.add(this._acceleration).multiplyScalar(0.8);
    this._location.add(this._velocity);
    this._mesh.position.copy(this._location);
    this._collider.setFromObject(this._mesh);
    this._acceleration = new Vector3();
  }

  /** Getters / Setters */
	public get mesh(): Mesh {
		return this._mesh;
  }

	public get collider(): Box3 {
		return this._collider;
  }

}

export {PongBat};
