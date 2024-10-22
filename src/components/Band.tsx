import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { RigidBody, CuboidCollider, BallCollider, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { extend } from '@react-three/fiber';

// Extend THREE dengan MeshLineGeometry dan MeshLineMaterial
extend({ MeshLineGeometry, MeshLineMaterial });

type GLTFResult = {
  nodes: {
    card: THREE.Mesh
    clip: THREE.Mesh
    clamp: THREE.Mesh
  }
  materials: {
    base: THREE.MeshStandardMaterial
    metal: THREE.MeshStandardMaterial
  }
}

function Band({ maxSpeed = 50, minSpeed = 10, cardRef }) {
  const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial>>(null);
  const fixed = useRef<THREE.Object3D & { wakeUp?: () => void }>(null);
  const j1 = useRef<THREE.Object3D & { wakeUp?: () => void; lerped?: THREE.Vector3 }>(null);
  const j2 = useRef<THREE.Object3D & { wakeUp?: () => void; lerped?: THREE.Vector3 }>(null);
  const j3 = useRef<THREE.Object3D & { wakeUp?: () => void }>(null);
  const card = useRef<THREE.Object3D & { wakeUp?: () => void; setNextKinematicTranslation: (translation: { x: number; y: number; z: number }) => void; angvel: () => THREE.Vector3; rotation: () => THREE.Euler; setAngvel: (angvel: { x: number; y: number; z: number }) => void }>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 };
  const { nodes, materials } = useGLTF('/onecard.glb') as unknown as GLTFResult;
  const texture = useTexture('/band.jpg');
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState<THREE.Vector3 | null>(null);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  React.useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp?.());
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation() as THREE.Vector3);
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation() as THREE.Vector3)));
        ref.current.lerped.lerp(ref.current.translation() as THREE.Vector3, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      curve.points[0].copy(j3.current.translation() as THREE.Vector3);
      curve.points[1].copy(j2.current.lerped!);
      curve.points[2].copy(j1.current.lerped!);
      curve.points[3].copy(fixed.current.translation() as THREE.Vector3);
      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[1, 1.4, 0.01]} />
          <group
            scale={2.75}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              drag(null);
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current!.translation() as THREE.Vector3)));
            }}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={materials.base.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry attach="geometry" />
        <meshLineMaterial 
          attach="material" 
          color="white" 
          depthTest={false} 
          lineWidth={1}
          resolution={[width, height]}
          map={texture}
          useMap={true}
          repeat={[-3, 1]}
        />
      </mesh>
    </>
  );
}

export default Band;