import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleField({ count = 80, color = '#C8A97E', opacity = 0.4 }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Particles
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const offsets = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      speeds[i] = 0.2 + Math.random() * 0.5
      offsets[i] = Math.random() * Math.PI * 2
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.15,
      transparent: true,
      opacity,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Mouse parallax
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // Animation
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      const pos = geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(t * speeds[i] + offsets[i]) * 0.008
        pos[i * 3] += Math.cos(t * speeds[i] * 0.7 + offsets[i]) * 0.005
      }
      geometry.attributes.position.needsUpdate = true

      particles.rotation.y = mouseX * 0.03
      particles.rotation.x = mouseY * 0.02

      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [count, color, opacity])

  return (
    <div
      ref={mountRef}
      className="canvas-container"
      style={{ pointerEvents: 'none' }}
    />
  )
}
