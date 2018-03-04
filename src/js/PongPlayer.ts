import { PongBat } from "./PongBat";
import { ControlScheme, PlayerSettings } from "./PongInterfaces";
import { Color, Vector3 } from "three";
import { PongScoreZone } from "./PongScoreZone";
import {clone} from 'lodash';
import { PongScoreDisplay } from "./PongScoreDisplay";

class PongPlayer {
  private _bat: PongBat = new PongBat();
  private _scoreZone: PongScoreZone = new PongScoreZone();
  private _scoreDisplay: PongScoreDisplay = new PongScoreDisplay();
  private _settings: PlayerSettings;
  private _score: number = 0;
  constructor() {}

  public init(_settings: PlayerSettings) {
    this._settings = clone(_settings);
    this._bat.init(this._settings.color || new Color(), this._settings.controls, this._settings.batLocation);
    this._scoreZone.init(_settings.scoreBox);
    this._scoreDisplay.init(_settings);
  }

  public animate() {
    this._bat.animate();
  }

  addToScore(_toAdd: number) {
    this._score += _toAdd;
    this._scoreDisplay.updateScore(this._score);
  }

  /** Getters & Setters */
	public get bat(): PongBat {
		return this._bat;
  }
  
	public get scoreZone(): PongScoreZone {
		return this._scoreZone;
  }
  
	public get scoreDisplay(): PongScoreDisplay  {
		return this._scoreDisplay;
	}
  
  
}

export {PongPlayer};
