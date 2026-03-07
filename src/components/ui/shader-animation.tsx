"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        // Check initial theme
        setIsDark(document.documentElement.classList.contains("dark"))

        // Observe changes to the 'dark' class on the HTML element
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    setIsDark(document.documentElement.classList.contains("dark"))
                }
            })
        })

        observer.observe(document.documentElement, { attributes: true })
        return () => observer.disconnect()
    }, [])

    const sceneRef = useRef<{
        camera: THREE.Camera
        scene: THREE.Scene
        renderer: THREE.WebGLRenderer
        uniforms: any
        animationId: number
    } | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current

        // Vertex shader
        const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

        // Fragment shader
        const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec3 baseColor;
      uniform vec3 lineColor;
      uniform float isDarkTheme;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 intensity = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            intensity[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }
        
        vec3 finalColor;
        if (isDarkTheme > 0.5) {
            finalColor = baseColor + (lineColor * intensity);
        } else {
            // Background is white, intensity brightens further, so we subtract intensity to draw dark lines
            finalColor = baseColor - (intensity * 0.8);
        }
        
        gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
      }
    `

        // Initialize Three.js scene
        const camera = new THREE.Camera()
        camera.position.z = 1

        const scene = new THREE.Scene()
        const geometry = new THREE.PlaneGeometry(2, 2)

        const uniforms = {
            time: { type: "f", value: 1.0 },
            resolution: { type: "v2", value: new THREE.Vector2() },
            baseColor: { type: "v3", value: isDark ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(249 / 255, 246 / 255, 238 / 255) }, // Bone White
            lineColor: { type: "v3", value: isDark ? new THREE.Vector3(1, 1, 1) : new THREE.Vector3(0.1, 0.8, 0.3) }, // white in dark mode, greenish lines in light mode
            isDarkTheme: { type: "f", value: isDark ? 1.0 : 0.0 },
        }

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        })

        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)

        container.appendChild(renderer.domElement)

        // Handle window resize
        const onWindowResize = () => {
            const width = container.clientWidth
            const height = container.clientHeight
            renderer.setSize(width, height)
            uniforms.resolution.value.x = renderer.domElement.width
            uniforms.resolution.value.y = renderer.domElement.height
        }

        // Initial resize
        onWindowResize()
        window.addEventListener("resize", onWindowResize, false)

        // Animation loop
        const animate = () => {
            const animationId = requestAnimationFrame(animate)
            uniforms.time.value += 0.05

            // Dynamic uniform update if theme changes
            uniforms.baseColor.value = isDark ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(249 / 255, 246 / 255, 238 / 255)
            uniforms.lineColor.value = isDark ? new THREE.Vector3(1, 1, 1) : new THREE.Vector3(0.1, 0.8, 0.3)
            uniforms.isDarkTheme.value = isDark ? 1.0 : 0.0

            renderer.render(scene, camera)

            if (sceneRef.current) {
                sceneRef.current.animationId = animationId
            }
        }

        // Store scene references for cleanup
        sceneRef.current = {
            camera,
            scene,
            renderer,
            uniforms,
            animationId: 0,
        }

        // Start animation
        animate()

        // Cleanup function
        return () => {
            window.removeEventListener("resize", onWindowResize)

            if (sceneRef.current) {
                cancelAnimationFrame(sceneRef.current.animationId)

                if (container && sceneRef.current.renderer.domElement) {
                    container.removeChild(sceneRef.current.renderer.domElement)
                }

                sceneRef.current.renderer.dispose()
                geometry.dispose()
                material.dispose()
            }
        }
    }, [isDark]) // Re-run effect when `isDark` changes

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 w-full h-full -z-0 transition-colors duration-300 ${isDark ? "bg-black" : "bg-[#f9f6ee]"}`}
            style={{
                overflow: "hidden",
            }}
        />
    )
}
