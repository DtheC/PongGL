import { Material, Geometry, Mesh, Vector3, Color, MeshBasicMaterial, BoxBufferGeometry, SphereBufferGeometry, Sphere } from "three";
import { PongBat } from "./PongBat";

class PongBall {
  private _material: Material;
  private _geometry: SphereBufferGeometry;
  private _mesh: Mesh;
  private _location: Vector3 = new Vector3();
  private _velocity: Vector3 = new Vector3();
  private _acceleration: Vector3 = new Vector3();
  private _speed: Vector3 = new Vector3(Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05, 0);
  private _collider: Sphere;

  constructor() {}

  public init() {
    this._material = new MeshBasicMaterial({ color: 0xff00ff });
    this._geometry = new SphereBufferGeometry(0.2);
    this._mesh = new Mesh(this._geometry, this._material);
    this._collider = new Sphere(this._location, 0.2);
  }

  /** Animation Loop */
  public animate(_bats: Array<PongBat>) {
    // TODO: Check in natureofcode to figure out how to deal with drag
    this._acceleration.add(this._speed);
    this._velocity.add(this._acceleration);
    this._location.add(this._velocity);
    this._collider.translate(this._velocity);
    this._mesh.position.copy(this._location);
    this._acceleration = new Vector3();
  }

  private isCollidingWithBat(_bat: PongBat) {
    return this._collider.intersectsBox(_bat.collider);
  }

  /** Getters / Setters */
  public get mesh(): Mesh {
    return this._mesh;
  }
}

export {PongBall};
