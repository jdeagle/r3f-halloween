import { forwardRef, useMemo, useRef } from "react";
import { Color } from "three";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}

`;

/*
    vec2 point = gl_FragCoord.xy / 500.0;
    vec3 color = vec3(
    distance(point, vec2(0.5)));

    gl_FragColor = vec4(color,1.0);`;

    // vec3 color = mix(u_colorA, u_colorB, vUv.x);
  */

const fragmentShader = `
varying vec2 vUv;
uniform vec3 u_colorA;
uniform vec3 u_colorB;

void main() {
    // vec2 point = gl_FragCoord.xy / 1000.0;
    float dist = distance(vUv, vec2(0.5));
    vec3 color = mix(u_colorA, u_colorB, dist * 2.20);
    
    gl_FragColor = vec4(color, 1.0);
}

`;

const Ground = forwardRef((props, ref) => {
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new Color("#990000") },
      u_colorB: { value: new Color("#000000") },
    }),
    []
  );

  return (
    <mesh position-y={-3.5} rotation-x={Math.PI * -0.5} scale={8} ref={ref}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
        receiveShadow
      />
    </mesh>
  );
});

export default Ground;
