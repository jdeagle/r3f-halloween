import { useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  useHelper,
  Center,
  Decal,
  Text3D,
  Sparkles,
  useMatcapTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Ground from "./ground";
import { gsap } from "gsap";

extend({ OrbitControls });

export default function Experience() {
  const groundRef = useRef();
  const shapesRef = useRef();
  const directionalLightRef = useRef();
  const ambientLightRef = useRef();
  const deathCard = useRef();
  const theLoversCard = useRef();
  const theWorldCard = useRef();
  const textLine1 = useRef();
  const textLine2 = useRef();
  const textLine3 = useRef();
  const spellCircleRef = useRef();

  //useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  const [spellCircle, deathTexture, theLoversTexture, theWorldTexture] =
    useTexture([
      "textures/magic_circle.png",
      "textures/death.png",
      "textures/the-lovers.png",
      "textures/the-world.png",
    ]);

  useFrame((state, delta) => {
    // console.log(state)
    // console.log(delta);
    // lazy susan around the scene with camera.
    // const angle = state.clock.elapsedTime;
    // const speed = 0.5;
    // const distance = 8;
    state.camera.position.x = state.mouse.x * 2 - 0.5;
    // state.camera.position.x = Math.sin(angle * speed) * distance;
    // state.camera.position.z = Math.cos(angle * speed) * distance
    state.camera.lookAt(0, 0, 0);
    // change the mesh directly instead of using react state
    // shapesRef.current.rotation.x += delta//0.01
    // cubeRef.current.rotation.y += delta
    // const time = state.clock.getElapsedTime();
    // time.current += 0.03;
    spellCircleRef.current.rotation.z -= 0.001;
    // spellCircleRef.current.material.emissiveIntensity += 0.001; //5 * Math.sin(delta);
  });

  useLayoutEffect(() => {
    console.log("useLayoutEffect");

    setTimeout(() => {
      gsap.from(deathCard.current.position, {
        y: -13.5,
        ease: "power3.out",
        duration: 0.5,
      });

      gsap.from(theWorldCard.current.position, {
        y: -13.5,
        ease: "power3.out",
        duration: 0.5,
        delay: 0.1,
      });

      gsap.from(theLoversCard.current.position, {
        y: -13.5,
        ease: "power3.out",
        duration: 0.5,
        delay: 0.25,
      });

      gsap.from(textLine1.current.position, {
        y: -10.5,
        //z: -20.5,
        ease: "power3.out",
        duration: 0.4,
        delay: 0.25,
        onComplete: () => {
          console.log("deathCard animation complete");
        },
      });
      gsap.from(textLine2.current.position, {
        //z: -20.5,
        y: -10.5,
        ease: "power3.out",
        duration: 0.4,
        delay: 0.35,
      });
      // gsap.from(textLine3.current.position, {
      //   z: -20.5,
      //   ease: "power3.out",
      //   duration: 0.4,
      //   delay: 0.45,
      //   // onComplete: () => {
      //   //   console.log("deathCard animation complete");
      //   // },
      // });

      gsap.from(groundRef.current.position, {
        y: -13.5,
        ease: "power3.out",
        duration: 0.35,
        delay: 0.45,
      });

      gsap.from(spellCircleRef.current.scale, {
        y: 0,
        x: 0,
        ease: "power3.out",
        duration: 0.35,
        delay: 0.5,
      });
    }, 16);
  }, []);

  const { camera, gl } = useThree();

  //const [matcapTexture] = useMatcapTexture("430404_BD9295_7E1E21_94544C", 256);
  const [matcapTexture] = useMatcapTexture("BD0D0D_970404_7B0404_550404", 256);

  const scale = Array.from({ length: 200 }, () => 0.5 + Math.random() * 4);

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight
        intensity={2.5}
        position={[0, 2, 3]}
        color="white"
        castShadow
        ref={directionalLightRef}
      />

      <ambientLight intensity={0.75} color="white" ref={ambientLightRef} />

      {/* <fog attach="fog" args={["green", 15, 21.5]} /> */}
      <mesh
        position={[-2.65, 1, -9.5]}
        scale={5}
        ref={deathCard}
        rotation-z={(Math.PI / 180) * 15}
      >
        <planeGeometry args={[1, 1.73, 32, 32]} />
        <meshStandardMaterial map={deathTexture} transparent />
      </mesh>

      <mesh position={[0, 1.25, -8]} scale={5} ref={theLoversCard}>
        <planeGeometry args={[1, 1.73, 32, 32]} />
        <meshStandardMaterial map={theLoversTexture} transparent />
      </mesh>

      <mesh
        position={[2.65, 1, -9.5]}
        scale={5}
        ref={theWorldCard}
        rotation-z={(Math.PI / 180) * -15}
      >
        <planeGeometry args={[1, 1.73, 32, 32]} />
        <meshStandardMaterial map={theWorldTexture} transparent />
      </mesh>

      <group ref={shapesRef} position={[0, -1.75, 0]}>
        <Text3D
          ref={textLine1}
          position={[-0.72, 0.5, -0.25]}
          curveSegments={64}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.01}
          height={0.05}
          lineHeight={0.5}
          letterSpacing={0.12}
          size={0.45}
          font="fonts/H74-X_Death_X_Regular.json"
          castShadow
        >
          {`Happy`}
          <meshMatcapMaterial matcap={matcapTexture} reflectivity={0.1} />
        </Text3D>

        <Text3D
          ref={textLine2}
          position={[-2.95, -1, 0]}
          curveSegments={64}
          bevelEnabled
          bevelSize={0.001}
          bevelThickness={0.1}
          height={0.0001}
          lineHeight={0.5}
          letterSpacing={0.12}
          size={1.1}
          font="fonts/H74-X_Death_X_Regular.json"
          castShadow
        >
          {`Halloween`}
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>

        {/* <Text3D
          ref={textLine3}
          position={[-0.6, -1.55, 0.25]}
          curveSegments={128}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.01}
          height={0.05}
          lineHeight={0.5}
          letterSpacing={0.12}
          size={0.35}
          font="/H74-X_Death_X_Regular.json"
          castShadow
        >
          {`2023`}
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D> */}
      </group>

      {/* Floor */}
      <Ground ref={groundRef} />

      {/* <Sparkles
        count={scale.length}
        size={scale}
        position={[0, -4.0, 0]}
        scale={[18, 0.15, 7]}
        speed={0.3}
        color={"#FF0000"}
      /> */}

      <Sparkles
        count={scale.length}
        size={scale}
        position={[0, 0, -12.5]}
        scale={[30, 28, 7]}
        speed={0.3}
        color={"#FFFF00"}
      />

      <mesh
        position-y={-3.4}
        rotation-x={Math.PI * -0.5}
        scale={8}
        ref={spellCircleRef}
      >
        <planeGeometry args={[1, 1, 64, 64]} />
        <meshStandardMaterial
          map={spellCircle}
          transparent
          // color={[1.5, 1, 4]}
          toneMapped={false}
          emissive="#FF0000"
          emissiveIntensity={3}
        />
      </mesh>
    </>
  );
}
