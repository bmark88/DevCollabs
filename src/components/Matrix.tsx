import React, { useEffect } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  margin: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  position: absolute;
`;

export default function MatrixPage() {
  useEffect(() => {

  setTimeout(() => {
  const canvas = document.getElementById('canv');
  const ctx = canvas.getContext('2d');

  const w = canvas.width = document.body.offsetWidth;
  const h = canvas.height = document.body.offsetHeight;
  const cols = Math.floor(w / 20) + 1;
  const ypos = Array(cols).fill(0);

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);

  function matrix () {
    ctx.fillStyle = '#0001';
    ctx.fillRect(0, 0, w, h);
    
    ctx.fillStyle = '#0f0';
    ctx.font = '15pt monospace';
    
    ypos.forEach((y, ind) => {
      const text = String.fromCharCode(Math.random() * 128);
      const x = ind * 20;
      ctx.fillText(text, x, y);
      if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
      else ypos[ind] = y + 20;
    });
  }

  setInterval(matrix, 100);
}, 200)
})
  return (
    <>
    <Canvas id='canv' width={500} height={200}>hello</Canvas>
    {/* <h1>Hello World</h1> */}
    </>
  )
}