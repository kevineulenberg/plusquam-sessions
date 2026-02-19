import { useEffect, useRef } from 'react';

// Vertex Shader — passthrough
const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment Shader — fBm plasma aurora
const FRAG = `
  precision highp float;
  uniform float u_time;
  uniform vec2  u_resolution;

  // ---- Math Helpers ----
  mat2 rot2d(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
  }

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  // Fractal Brownian Motion — layered noise for organic feel
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 r = rot2d(0.5);
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p  = r * p * 2.1;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
    float t = u_time * 0.18;

    // Domain warp: warp the UV with fbm layers for fluid look
    vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(1.7, 9.2)));
    vec2 r = vec2(
      fbm(uv + 1.8 * q + vec2(1.7 + t * 0.15, 9.2)),
      fbm(uv + 1.8 * q + vec2(8.3 + t * 0.13, 2.8))
    );
    float f = fbm(uv + 2.2 * r);

    // Map noise field to colour palette — deep black → purple → violet
    vec3 col = mix(
      vec3(0.02, 0.00, 0.06),   // near black
      vec3(0.44, 0.18, 0.82),   // plusquam purple
      clamp(f * f * 3.0, 0.0, 1.0)
    );
    col = mix(
      col,
      vec3(0.62, 0.28, 0.98),   // bright violet highlight
      clamp(length(q) * 0.8, 0.0, 1.0)
    );

    // Vignette — darken edges so canvas blends into the page bg
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv * vec2(1.4, 1.0)));
    col *= vignette * 0.85;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function compileShader(gl, type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

export default function WebGLBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
        if (!gl) return;

        // Compile & link
        const vert = compileShader(gl, gl.VERTEX_SHADER, VERT);
        const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
        const prog = gl.createProgram();
        gl.attachShader(prog, vert);
        gl.attachShader(prog, frag);
        gl.linkProgram(prog);
        gl.useProgram(prog);

        // Full-screen quad
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, 'a_position');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        const uTime = gl.getUniformLocation(prog, 'u_time');
        const uRes = gl.getUniformLocation(prog, 'u_resolution');

        // Resize handler — render at 0.5× for performance, CSS scales it up
        const resize = () => {
            canvas.width = Math.floor(window.innerWidth * 0.5);
            canvas.height = Math.floor(window.innerHeight * 0.5);
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener('resize', resize);

        let rafId;
        const start = performance.now();
        const render = () => {
            gl.uniform1f(uTime, (performance.now() - start) / 1000);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            rafId = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            gl.deleteProgram(prog);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                imageRendering: 'auto',
                opacity: 0.7,
            }}
        />
    );
}
