import { Material, Geometry, Mesh, Vector3, Color, MeshBasicMaterial, BoxBufferGeometry, SphereBufferGeometry, Sphere, Box3 } from "three";
import { PongBat } from "./PongBat";
import { PongPlayer } from "./PongPlayer";

class PongBall {
  private _material: Material;
  private _geometry: SphereBufferGeometry;
  private _mesh: Mesh;
  private _location: Vector3 = new Vector3();
  private _velocity: Vector3 = new Vector3();
  private _speed: Vector3 = new Vector3();
  // private _speed: Vector3 = new Vector3(-0.1, -0.0001, 0);
  private _collider: Sphere;

  constructor() {}

  public init() {
    this._material = new MeshBasicMaterial({ color: 0xff00ff });
    this._geometry = new SphereBufferGeometry(0.2);
    this._mesh = new Mesh(this._geometry, this._material);
    this._mesh.position.set(0, 0, 0);
    this._collider = new Sphere(this._location, 0.2);
    this._speed = this.getRandomSpeed();
  }

  private reset() {
    this._location = new Vector3();
    this._velocity = new Vector3();
    this._speed = this.getRandomSpeed();
    this._collider = new Sphere(this._location, 0.2);
    this._mesh.position.copy(this._location);
  }

  private getRandomSpeed(): Vector3 {
    const y = Math.random() > 0.5? 0.01 : 0.01;
    return new Vector3(Math.random() * 0.1 - 0.05, y, 0);
  }

  /** Animation Loop */
  public animate(_players: Array<PongPlayer>, _bats: Array<PongBat>, _bounds: Array<Box3>) {
    //Check if in score zone
    const pointScored = false;
    for (let _player of _players) {
      if (this.isCollidingWithBox3(_player.scoreZone.area)) {
        _player.addToScore(1);
        this.reset();
      }
    }
    
    if (!pointScored) {
      for (let _bat of _bats) {
        if (this.isCollidingWithBat(_bat)) {
          this._velocity.x *= -1;
          this._speed.x *= -1;
        }
      }
      for (let _bound of _bounds) {
        if (this.isCollidingWithBox3(_bound)) {
          this._velocity.y *= -1;
          this._speed.y *= -1;
        }
      }
      this._velocity.add(this._speed);
      this.limitVector(this._velocity, 0.1);
      this._location.add(this._velocity);
      this._collider = new Sphere(this._location, 0.2);
      this._mesh.position.copy(this._location);
    }
  }

  private limitVector(_vector: Vector3, _max: number) {
    if (this.magSq(_vector) > _max * _max) {
      _vector.normalize();
      _vector.multiplyScalar(_max);
    }
    return _vector;
  }

  private magSq(_vector: Vector3) {
    return (_vector.x * _vector.x + _vector.y * _vector.y + _vector.z * _vector.z);
  }

  private isCollidingWithBat(_bat: PongBat) {
    return this._collider.intersectsBox(_bat.collider);
  }

  public isCollidingWithBox3(_box3: Box3) {
    return this._collider.intersectsBox(_box3);
  }

  /** Getters / Setters */
  public get mesh(): Mesh {
    return this._mesh;
  }
}

export {PongBall};
