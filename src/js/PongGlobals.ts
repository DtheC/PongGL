import { Material, MeshPhongMaterial } from "three";

class PongGlobals {
  constructor(){
    
  }

  public BallMaterial(): Material {
    return new MeshPhongMaterial({color: 0xff00ff, shininess: 30});
  }

  public BatMaterial(_color): Material {
    return new MeshPhongMaterial({ color: _color, shininess: 30 });
  }

  public GroundMaterial(): Material {
    return new MeshPhongMaterial({ color: 0x5E9EFC, shininess: 30 });
  }
}

const pongGlobals = new PongGlobals();
export {pongGlobals as PongGlobals};
