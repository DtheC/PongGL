import { Material, Geometry, Mesh, Vector3, Color, MeshBasicMaterial, BoxBufferGeometry } from "three";
import { PongInputEmitter } from "./InputManager";

class PongBat {
  private _material: Material;
  private _geometry: BoxBufferGeometry;
  private _mesh: Mesh;
  private _location: Vector3 = new Vector3();
  private _velocity: Vector3 = new Vector3();
  private _acceleration: Vector3 = new Vector3();
  private _speed: number = 0.1;

  constructor() {
    this.upPressed = this.upPressed.bind(this);
    this.downPressed = this.downPressed.bind(this);
  }

  public init(_playerNumber: number, _color: Color) {
    /** Init Mesh */
    this._material = new MeshBasicMaterial({color: _color});
    this._geometry = new BoxBufferGeometry(0.25, 1.5, 1);
    this._mesh = new Mesh(this._geometry, this._material);

    /** Event Listening */
    PongInputEmitter.on(PongInputEmitter.events.upPressed, this.upPressed);
    PongInputEmitter.on(PongInputEmitter.events.downPressed, this.downPressed);
  
    this.animate = this.animate.bind(this);
    this.animate();
  }

  /** Input Functions */
  private upPressed(_event: Event) {
    this._acceleration.add(new Vector3(0, this._speed, 0));
  }

  private downPressed(_event: Event) {
    this._acceleration.add(new Vector3(0, -this._speed, 0));
  }

  /** Animation Loop */
  private animate() {
    requestAnimationFrame(this.animate);
    // TODO: Check in natureofcode to figure out how to deal with drag
    this._velocity.add(this._acceleration).multiplyScalar(0.8);
    this._location.add(this._velocity);
    this._mesh.position.copy(this._location);
    this._acceleration = new Vector3();
  }

  /** Getters / Setters */
	public get mesh(): Mesh {
		return this._mesh;
	}
}

export {PongBat};