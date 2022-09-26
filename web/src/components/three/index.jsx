import React from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { angleToRadians } from '../../utils/angle';

const Three = () => {
    return (
        <>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} />
        <mesh position={[0, 1, 0]}>
            <sphereGeometry arg={[ 0.2, 16, 16 ]} />
            <meshStandardMaterial color="#ffffff" />
        </mesh>  
        <mesh
        rotation={[ -angleToRadians(90), 0, 0]}>
            <planeGeometry args={[7, 7]}/>
            <meshStandardMaterial color='#2985d6' />
        </mesh>
        <ambientLight args={['#ffffff', 1]} />   
        </>
    );
};

export default Three;