export {};

self.onmessage = (e: MessageEvent<{ count: number }>) => {
  const { count } = e.data;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  
  // Transfer the buffer directly without copying for maximum performance
  postMessage(positions, { transfer: [positions.buffer] });
};
