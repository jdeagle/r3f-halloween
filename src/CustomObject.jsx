import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three'
export default function CustomObject() {

  const geometryRef = useRef()
  const numberOfTriangles = 10;
  const verticesCount = numberOfTriangles * 3
  const positions = useMemo(() => {
    let positions = new Float32Array(verticesCount * 3)
    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3
    }

    return positions
  }, [])

  useEffect(() => {
    if (!geometryRef.current) return

    // ask three.js to update the normals for our triangles so the light reflects off of them correctly.
    geometryRef.current.computeVertexNormals()
  }, []);

  return (
    <mesh castShadow>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" count={verticesCount} itemSize={3} array={positions} />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={THREE.DoubleSide}/>
    </mesh>
  )
}
