import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Three from './components/three';
function App() {

  return (
    <Canvas id="id-three">
      <Suspense fallback={null}>
        <Three />
      </Suspense>
    </Canvas>
  )
}

export default App
