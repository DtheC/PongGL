import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import '../sass/default.scss';
import {PongScene} from './scene';
import { PongGameManager } from './GameManager';
import { PongInputEmitter} from './InputManager';

const pscene = new PongGameManager();