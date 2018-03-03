import { Scene, Renderer, Camera, PerspectiveCamera, WebGLRenderer, Mesh, Object3D, Vector3, MeshBasicMaterial, PlaneBufferGeometry, DoubleSide, Box3, BoxBufferGeometry, OrthographicCamera } from "three";

class PongScene {
  private _backgroundMesh: Mesh;
  private _backgroundGeometry: PlaneBufferGeometry;
  private _backgroundMaterial: MeshBasicMaterial;
  private _scene: Scene;
  private _camera: Camera;
  private _renderer: Renderer;
  private _container: HTMLElement;
  private _bounds: Array<Box3>;
  
  constructor() {}

  init(_container?: HTMLElement) {
    this._container = _container || document.body;
    this._scene = new Scene();
    // this._camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const aspect = window.innerWidth / window.innerHeight;
    const width = 10;
    this._camera = new OrthographicCamera(width * aspect / - 2, width * aspect / 2, width / 2, width / - 2, 1, 1000);
    this._renderer = new WebGLRenderer();

    this._camera.position.set(0, 0, 5);
    this._camera.lookAt(new Vector3(0, 0, 0));

    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._container.appendChild(this._renderer.domElement);

    this.createBackground();
    this.createBounds();
    this.addMesh(this._backgroundMesh);
  }

  private createBackground() {
    this._backgroundMaterial = new MeshBasicMaterial({ color: 0x5E9EFC, side: DoubleSide});
    this._backgroundGeometry = new PlaneBufferGeometry(20, 7, 1, 1);
    this._backgroundMesh = new Mesh(this._backgroundGeometry, this._backgroundMaterial);
  }

  private createBounds() {
    this._bounds = [];
    // let geom = new BoxBufferGeometry(2, 7, 3);
    // let mesh = new Mesh(geom);
    // // Left Side
    // mesh.position.set(-10, 0 ,0);
    // this.addMesh(mesh);
    // this._bounds.push(new Box3().setFromObject(mesh));
    // // Right Side
    // mesh.position.set(10, 0, 0);
    // this.addMesh(mesh);
    // this._bounds.push(new Box3().setFromObject(mesh));
 
    // Top Side
    let geom = new BoxBufferGeometry(22, 1, 3);
    let mesh = new Mesh(geom);
    mesh.position.set(0, 3.5, 0);
    this._bounds.push(new Box3().setFromObject(mesh));
    //Bottom Side
    mesh.position.set(0, -3.5,0);
    this._bounds.push(new Box3().setFromObject(mesh));
  }

  public animate() {
    this._renderer.render(this._scene, this._camera);
  }

  /** Adding/Removing Elements in Scene */
  public addMesh(_mesh: Object3D) {
    this._scene.add(_mesh);
  }

  public removeMesh(_mesh: Object3D) {
    this.scene.remove(_mesh);
  }

  /** Getters / Setters */
  public get scene(): Scene {
    return this.scene;
  }

  public get camera(): Camera {
    return this.camera;
  }

	public get container(): HTMLElement {
		return this._container;
  }
  
	public get bounds(): Array<Box3> {
		return this._bounds;
	}
  
}

export {PongScene};
