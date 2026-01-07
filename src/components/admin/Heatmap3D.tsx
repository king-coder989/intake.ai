import { useEffect, useRef, useState, useMemo, lazy, Suspense } from "react";
import * as THREE from "three";
import { mockComplaints, departments, type Complaint } from "@/data/mockComplaints";
import { Skeleton } from "@/components/ui/skeleton";

// Department color mapping (muted, professional palette)
const DEPARTMENT_COLORS: Record<string, string> = {
  "Public Works": "#6366f1",    // Indigo
  "Electrical": "#f59e0b",       // Amber
  "Roads": "#ef4444",            // Red
  "Sanitation": "#10b981",       // Emerald
  "Water": "#3b82f6",            // Blue
  "Parks": "#22c55e",            // Green
};

// Urgency to height multiplier
const URGENCY_HEIGHT: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

interface Heatmap3DProps {
  className?: string;
}

const Heatmap3D = ({ className }: Heatmap3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredComplaint, setHoveredComplaint] = useState<Complaint | null>(null);

  // Filter complaints with location data
  const complaintsWithLocation = useMemo(() => 
    mockComplaints.filter((c) => c.location?.lat && c.location?.lng),
    []
  );

  // Calculate bounds for normalization
  const bounds = useMemo(() => {
    if (complaintsWithLocation.length === 0) {
      return { minLat: 28.5, maxLat: 28.7, minLng: 77.1, maxLng: 77.3 };
    }
    const lats = complaintsWithLocation.map((c) => c.location!.lat);
    const lngs = complaintsWithLocation.map((c) => c.location!.lng);
    const padding = 0.01;
    return {
      minLat: Math.min(...lats) - padding,
      maxLat: Math.max(...lats) + padding,
      minLng: Math.min(...lngs) - padding,
      maxLng: Math.max(...lngs) + padding,
    };
  }, [complaintsWithLocation]);

  // Normalize coordinates to scene space
  const normalizeCoords = (lat: number, lng: number) => {
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 10 - 5;
    const z = ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 10 - 5;
    return { x, z };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Ground plane (map base)
    const groundGeometry = new THREE.PlaneGeometry(12, 12);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d2d44,
      transparent: true,
      opacity: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    // Grid helper for map feel
    const gridHelper = new THREE.GridHelper(12, 20, 0x444466, 0x333355);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Add complaint spheres
    complaintsWithLocation.forEach((complaint) => {
      const { x, z } = normalizeCoords(complaint.location!.lat, complaint.location!.lng);
      const floatHeight = URGENCY_HEIGHT[complaint.urgency] * 1.2;
      const radius = 0.2 + URGENCY_HEIGHT[complaint.urgency] * 0.08;
      const color = DEPARTMENT_COLORS[complaint.department] || "#888888";

      // Sphere geometry
      const geometry = new THREE.SphereGeometry(radius, 16, 16);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.9,
        metalness: 0.4,
        roughness: 0.3,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.15,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, floatHeight, z);
      sphere.userData = { complaint };
      scene.add(sphere);

      // Vertical line connecting to ground for context
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 0.02, z),
        new THREE.Vector3(x, floatHeight - radius, z),
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    });

    // Fallback: if no complaints with location, show placeholder spheres
    if (complaintsWithLocation.length === 0) {
      const placeholderPositions = [
        { x: 0, z: 0, height: 1.8, radius: 0.3 },
        { x: 2, z: -1, height: 1.2, radius: 0.25 },
        { x: -2, z: 1, height: 2.4, radius: 0.35 },
      ];
      placeholderPositions.forEach(({ x, z, height, radius }) => {
        const geometry = new THREE.SphereGeometry(radius, 16, 16);
        const material = new THREE.MeshStandardMaterial({
          color: 0x666688,
          transparent: true,
          opacity: 0.5,
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(x, height, z);
        scene.add(sphere);
      });
    }

    // Mouse controls for rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationY = 0;
    let rotationX = 0.5;

    const onMouseDown = () => {
      isDragging = true;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        rotationY += deltaX * 0.005;
        rotationX = Math.max(0.2, Math.min(1.2, rotationX + deltaY * 0.005));
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const distance = camera.position.length();
      const newDistance = Math.max(5, Math.min(20, distance + e.deltaY * 0.01));
      camera.position.normalize().multiplyScalar(newDistance);
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("wheel", onWheel, { passive: false });

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Auto-rotate when not dragging
      if (!isDragging) {
        rotationY += 0.002;
      }

      // Update camera position
      const distance = camera.position.length();
      camera.position.x = Math.sin(rotationY) * Math.cos(rotationX) * distance;
      camera.position.y = Math.sin(rotationX) * distance;
      camera.position.z = Math.cos(rotationY) * Math.cos(rotationX) * distance;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    setIsLoading(false);
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [complaintsWithLocation, bounds]);

  return (
    <div className={className}>
      <div className="relative h-[500px] rounded-lg overflow-hidden border border-border">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <Skeleton className="h-full w-full" />
          </div>
        )}
        <div ref={containerRef} className="h-full w-full" />
        
        {/* Instructions overlay */}
        <div className="absolute bottom-3 left-3 text-xs text-muted-foreground/70 bg-background/80 px-2 py-1 rounded">
          Drag to rotate • Scroll to zoom
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Legend</h4>
        
        <div className="grid gap-4 md:grid-cols-2">
          {/* Axes explanation */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Axes</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">X–Z:</span>
                <span className="text-foreground">Geographic position (lat/lng)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Y (Height):</span>
                <span className="text-foreground">Urgency level</span>
              </div>
            </div>
          </div>

          {/* Department colors */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Department Colors</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(DEPARTMENT_COLORS).map(([dept, color]) => (
                <div key={dept} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-muted-foreground">{dept}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Urgency height/size */}
        <div className="mt-3 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Sphere Height & Size (Urgency)</p>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-foreground/60 rounded-full" />
              <span className="text-muted-foreground">Low (ground)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-foreground/70 rounded-full" />
              <span className="text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-foreground/80 rounded-full" />
              <span className="text-muted-foreground">High (floating)</span>
            </div>
          </div>
        </div>

        {/* Data stats */}
        <div className="mt-3 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Showing {complaintsWithLocation.length} complaints with location data
            {complaintsWithLocation.length === 0 && " (displaying placeholder view)"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Heatmap3D;
