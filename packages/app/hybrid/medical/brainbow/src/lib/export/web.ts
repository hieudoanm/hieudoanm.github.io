import type { Project } from '@/types/project';

const PROJECT_PLACEHOLDER = '__BRAINBOW_PROJECT_JSON__';

const escapeScriptData = (value: string): string =>
  value
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const VIEWER_SCRIPT = `(function () {
  'use strict';
  var project = ${PROJECT_PLACEHOLDER};
  var image = project.images[0];
  if (!image) return;
  var canvas = document.getElementById('viewer');
  var ctx = canvas.getContext('2d');
  var width = image.width;
  var height = image.height;

  var binary = atob(image.data);
  var bytes = new Uint8ClampedArray(binary.length);
  for (var i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

  var offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  var octx = offscreen.getContext('2d');
  var imageData = octx.createImageData(width, height);
  imageData.data.set(bytes);
  octx.putImageData(imageData, 0, 0);

  var transform = { scale: 1, x: 0, y: 0 };
  var pointers = {};
  var pinch = null;
  var drag = null;

  function esc(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function buildLegend() {
    var layersEl = document.getElementById('layers');
    var items = '';
    for (var l = 0; l < project.layers.length; l += 1) {
      var layer = project.layers[l];
      var count = layer.annotations.length;
      items += '<li><span class="swatch" style="background:' + esc(layer.color) + '"></span>' +
        esc(layer.name) + ' <small>(' + count + ')</small></li>';
    }
    layersEl.innerHTML = items;

    var ppm = image.calibration && image.calibration.pixelsPerMicron;
    var meta = esc(project.name) + ' \\u00b7 ' + width + '\\u00d7' + height + ' px';
    if (ppm) meta += ' \\u00b7 ' + ppm + ' px/\\u00b5m';
    document.getElementById('meta').textContent = meta;
    document.getElementById('reset').addEventListener('click', fit);
  }

  function fit() {
    var w = canvas.clientWidth || window.innerWidth;
    var h = canvas.clientHeight || window.innerHeight;
    transform.scale = Math.min(w / width, h / height);
    transform.x = (w - width * transform.scale) / 2;
    transform.y = (h - height * transform.scale) / 2;
    render();
  }

  function render() {
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth || window.innerWidth;
    var h = canvas.clientHeight || window.innerHeight;
    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#05080f';
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.scale, transform.scale);
    ctx.drawImage(offscreen, 0, 0);
    ctx.restore();
    drawAnnotations();
    drawScaleBar(w, h);
  }

  function drawAnnotations() {
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    for (var l = 0; l < project.layers.length; l += 1) {
      var layer = project.layers[l];
      if (!layer.visible) continue;
      var annotations = layer.annotations;
      for (var a = 0; a < annotations.length; a += 1) {
        var ann = annotations[a];
        var pts = ann.points;
        if (pts.length === 0) continue;
        ctx.beginPath();
        for (var p = 0; p < pts.length; p += 1) {
          var qx = pts[p].x * transform.scale + transform.x;
          var qy = pts[p].y * transform.scale + transform.y;
          if (p === 0) ctx.moveTo(qx, qy);
          else ctx.lineTo(qx, qy);
        }
        if (ann.kind === 'polygon' && pts.length > 2) ctx.closePath();
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = Math.max(1, 1.5 / transform.scale);
        ctx.stroke();
      }
    }
  }

  function drawScaleBar(vw, vh) {
    var ppm = image.calibration && image.calibration.pixelsPerMicron;
    if (!ppm || ppm <= 0) return;
    var screenPxPerMicron = ppm * transform.scale;
    var steps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000];
    var targetMicrons = 96 / screenPxPerMicron;
    var lengthMicrons = targetMicrons;
    for (var s = 0; s < steps.length; s += 1) {
      if (steps[s] >= targetMicrons) {
        lengthMicrons = steps[s];
        break;
      }
    }
    var lengthPx = lengthMicrons * screenPxPerMicron;
    var label = (lengthMicrons >= 10 ? Math.round(lengthMicrons) : lengthMicrons) + ' \\u00b5m';
    var margin = 12;
    var y = vh - margin;
    var x0 = margin;
    var x1 = x0 + lengthPx;
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x0, y - 4);
    ctx.lineTo(x0, y + 4);
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.moveTo(x1, y - 4);
    ctx.lineTo(x1, y + 4);
    ctx.stroke();
    ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(label, (x0 + x1) / 2, y - 8);
  }

  canvas.addEventListener('wheel', function (event) {
    event.preventDefault();
    var rect = canvas.getBoundingClientRect();
    var px = event.clientX - rect.left;
    var py = event.clientY - rect.top;
    var factor = event.deltaY < 0 ? 1.25 : 0.8;
    var nextScale = Math.max(0.01, Math.min(64, transform.scale * factor));
    var ratio = nextScale / transform.scale;
    transform.scale = nextScale;
    transform.x = px - (px - transform.x) * ratio;
    transform.y = py - (py - transform.y) * ratio;
    render();
  }, { passive: false });

  canvas.addEventListener('pointerdown', function (event) {
    pointers[event.pointerId] = { x: event.clientX, y: event.clientY };
    var ids = Object.keys(pointers);
    if (ids.length === 2) {
      var a = pointers[ids[0]];
      var b = pointers[ids[1]];
      pinch = {
        distance: Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)),
        scale: transform.scale
      };
      drag = null;
      return;
    }
    drag = { x: event.clientX, y: event.clientY };
  });

  canvas.addEventListener('pointermove', function (event) {
    if (pointers[event.pointerId]) {
      pointers[event.pointerId] = { x: event.clientX, y: event.clientY };
    }
    var ids = Object.keys(pointers);
    if (pinch && ids.length === 2) {
      var a = pointers[ids[0]];
      var b = pointers[ids[1]];
      var distance = Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
      if (distance > 0) {
        transform.scale = Math.max(0.01, Math.min(64, pinch.scale * distance / pinch.distance));
        render();
      }
      return;
    }
    if (drag && ids.length === 1) {
      var dx = event.clientX - drag.x;
      var dy = event.clientY - drag.y;
      drag.x = event.clientX;
      drag.y = event.clientY;
      transform.x += dx;
      transform.y += dy;
      render();
    }
  });

  function endPointer(event) {
    delete pointers[event.pointerId];
    if (Object.keys(pointers).length < 2) pinch = null;
    drag = null;
  }
  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', endPointer);

  window.addEventListener('resize', fit);
  buildLegend();
  fit();
})();
`;

const PAGE_SHELL = (project: Project): string => {
  const name = escapeHtml(project.name);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex"/>
<title>${name} - Brainbow read-only viewer</title>
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; background: #05080f; color: #d7dce6;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  body { display: grid; grid-template-rows: auto 1fr; }
  header { display: flex; align-items: center; justify-content: space-between;
    padding: 0.6rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
  header h1 { font-size: 1rem; font-weight: 400; margin: 0; }
  header .pill { font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.2); color: #9aa3b2; }
  main { position: relative; min-height: 0; }
  #viewer { position: absolute; inset: 0; width: 100%; height: 100%;
    display: block; touch-action: none; cursor: grab; }
  #viewer:active { cursor: grabbing; }
  aside { position: absolute; top: 0.75rem; left: 0.75rem; z-index: 1;
    width: 15rem; max-width: calc(100% - 1.5rem); max-height: calc(100% - 1.5rem);
    overflow: auto; padding: 0.75rem; border-radius: 0.75rem;
    background: rgba(10, 15, 25, 0.85); border: 1px solid rgba(255,255,255,0.12);
    backdrop-filter: blur(6px); }
  aside h2 { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em;
    color: #9aa3b2; margin: 0 0 0.5rem; }
  aside ul { list-style: none; margin: 0 0 0.75rem; padding: 0; }
  aside li { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem;
    padding: 0.2rem 0; }
  aside li small { color: #9aa3b2; }
  aside .swatch { width: 0.75rem; height: 0.75rem; border-radius: 0.25rem;
    flex: none; }
  aside #meta { font-size: 0.7rem; color: #9aa3b2; margin: 0 0 0.75rem; }
  aside button { width: 100%; padding: 0.45rem 0; border-radius: 0.5rem;
    border: 1px solid rgba(255,255,255,0.2); background: transparent;
    color: inherit; cursor: pointer; font: inherit; }
  aside button:hover { background: rgba(255,255,255,0.08); }
</style>
</head>
<body>
<header>
  <h1>${name}</h1>
  <span class="pill">read-only</span>
</header>
<main>
  <canvas id="viewer" aria-label="Read-only image viewer"></canvas>
  <aside>
    <h2>Layers</h2>
    <ul id="layers"></ul>
    <p id="meta"></p>
    <button id="reset" type="button">Fit image</button>
  </aside>
  </main>
<script>${VIEWER_SCRIPT}</script>
</body>
</html>`;
};

export const exportWebViewer = (project: Project): string =>
  PAGE_SHELL(project).replace(
    PROJECT_PLACEHOLDER,
    escapeScriptData(JSON.stringify(project))
  );
