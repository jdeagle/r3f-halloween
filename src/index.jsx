import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import ReactDOM from "react-dom/client";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const cameraSettings = {
  position: [0, 0, 14],
  fov: 45,
  near: 0.1,
  far: 200,
};

const rendererSettings = {
  // map colors in scene from HDR to LDR
  //toneMapping: THREE.CineonToneMapping,
  // encode colors to sRGB space and its possible values. (effects gradient ranges and steps)
  //outputEncoding: THREE.LinearSRGBEncoding,
};

root.render(
  <Canvas gl={rendererSettings} camera={cameraSettings} shadows>
    <Experience />
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={1} mipmapBlur radius={0.7} />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  </Canvas>
);
