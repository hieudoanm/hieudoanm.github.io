(function () {
  'use strict';

  var canvas = document.getElementById('graph-canvas');
  var empty = document.getElementById('graph-empty');
  var searchInput = document.getElementById('graph-search');
  var searchClear = document.getElementById('graph-search-clear');
  var physicsCheck = document.getElementById('graph-physics');
  var fitBtn = document.getElementById('graph-fit');
  var resetBtn = document.getElementById('graph-reset');
  var detailsEmpty = document.getElementById('graph-details-empty');
  var detailsContent = document.getElementById('graph-details-content');
  var detailName = document.querySelector('[data-detail-name]');
  var detailPath = document.querySelector('[data-detail-path]');
  var detailDegree = document.querySelector('[data-detail-degree]');
  var detailExtension = document.querySelector('[data-detail-extension]');
  var detailLinks = document.querySelector('[data-detail-links]');
  var statNodes = document.querySelector('[data-stat-nodes]');
  var statEdges = document.querySelector('[data-stat-edges]');

  var DATA = window.__GRAPH_DATA__ || { nodes: [], edges: [] };

  // Build nodes with stable ids. Edges get ids so they can be updated later.
  var nodeDefs = (DATA.nodes || []).map(function (n) {
    return {
      id: String(n.id),
      label: n.label || n.id,
      title: (n.path || n.id) + '\nConnections: ' + (n.degree || 0),
      group: n.extension || 'default',
    };
  });
  var edgeDefs = (DATA.edges || []).map(function (e, i) {
    return { id: 'e' + i, from: String(e.from), to: String(e.to) };
  });

  var nodes = new vis.DataSet(nodeDefs);
  var edges = new vis.DataSet(edgeDefs);

  if (nodes.length === 0) {
    empty.hidden = false;
    return;
  }

  if (statNodes) statNodes.textContent = nodes.length;
  if (statEdges) statEdges.textContent = edges.length;

  var THEME = {
    nodes: {
      shape: 'dot',
      borderWidth: 0,
      color: {
        background: '#a78bfa',
        highlight: { background: '#c4b5fd', border: '#a78bfa' },
        hover: { background: '#c4b5fd', border: '#a78bfa' },
      },
      font: { color: '#d8d1e8', size: 14, face: 'system sans-serif' },
      scaling: {
        min: 5,
        max: 28,
        label: { min: 8, max: 30, drawLabels: true },
      },
    },
    edges: {
      color: { color: '#625879', highlight: '#a78bfa' },
      smooth: false,
      width: 1,
      hoverWidth: 2,
    },
    physics: {
      enabled: true,
      solver: 'forceAtlas2Based',
      forceAtlas2Based: {
        gravitationalConstant: -45,
        centralGravity: 0.01,
        springLength: 100,
        springConstant: 0.08,
        damping: 0.4,
      },
      stabilization: { enabled: true, iterations: 500 },
    },
    interaction: {
      hover: true,
      tooltipDelay: 150,
      navigationButtons: false,
      keyboard: true,
    },
  };

  var network = new vis.Network(canvas, { nodes: nodes, edges: edges }, THEME);

  // Look up connected node ids for a given node.
  function neighboursOf(id) {
    var set = {};
    edges.forEach(function (e) {
      if (e.from === id) set[e.to] = true;
      if (e.to === id) set[e.from] = true;
    });
    return set;
  }

  function showDetails(id) {
    var node = nodes.get(id);
    if (!node) return;
    var neigh = neighboursOf(id);
    var list = [];
    Object.keys(neigh).forEach(function (nid) {
      var other = nodes.get(nid);
      if (other) list.push(other);
    });
    list.sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });

    detailName.textContent = node.label;
    detailPath.textContent = node.title ? node.title.split('\n')[0] : node.id;
    detailDegree.textContent = Object.keys(neigh).length;
    detailExtension.textContent = node.group || '—';
    detailLinks.innerHTML = '';
    if (list.length === 0) {
      var li = document.createElement('li');
      li.textContent = 'No connections';
      detailLinks.appendChild(li);
    } else {
      list.forEach(function (other) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#';
        a.textContent = other.label;
        a.title = other.id;
        a.addEventListener('click', function (ev) {
          ev.preventDefault();
          network.selectNodes([other.id]);
          showDetails(other.id);
        });
        li.appendChild(a);
        detailLinks.appendChild(li);
      });
    }
    detailsEmpty.hidden = true;
    detailsContent.hidden = false;
  }

  function clearDetails() {
    detailsEmpty.hidden = false;
    detailsContent.hidden = true;
  }

  network.on('selectNode', function (params) {
    if (params.nodes.length) showDetails(params.nodes[0]);
    else clearDetails();
  });

  network.on('deselectNode', clearDetails);

  // Search: highlight matches, dim the rest. Rebuild update batches so
  // every DataSet entry has a valid id.
  var highlightTimeout = null;

  function applySearch() {
    var q = searchInput.value.trim().toLowerCase();
    searchClear.hidden = q.length === 0;
    if (q.length === 0) {
      nodes.forEach(function (n) {
        nodes.update({
          id: n.id,
          color: {
            background: '#a78bfa',
            highlight: { background: '#c4b5fd' },
            hover: { background: '#c4b5fd' },
          },
          opacity: 1,
        });
      });
      edges.forEach(function (e) {
        edges.update({
          id: e.id,
          color: { color: '#625879', highlight: '#a78bfa' },
          opacity: 1,
        });
      });
      return;
    }

    var matches = {};
    nodes.forEach(function (n) {
      var hit =
        n.label.toLowerCase().indexOf(q) !== -1 ||
        n.id.toLowerCase().indexOf(q) !== -1;
      if (hit) matches[n.id] = true;
    });

    nodes.forEach(function (n) {
      var isMatch = !!matches[n.id];
      nodes.update({
        id: n.id,
        color: {
          background: isMatch ? '#c4b5fd' : '#4a4260',
          highlight: { background: '#c4b5fd' },
          hover: { background: '#c4b5fd' },
        },
        opacity: isMatch ? 1 : 0.25,
      });
    });

    edges.forEach(function (e) {
      var connected = matches[e.from] && matches[e.to];
      edges.update({
        id: e.id,
        color: { color: connected ? '#a78bfa' : '#3a3348' },
        opacity: connected ? 1 : 0.1,
      });
    });
  }

  searchInput.addEventListener('input', function () {
    clearTimeout(highlightTimeout);
    highlightTimeout = setTimeout(applySearch, 120);
  });

  searchClear.addEventListener('click', function () {
    searchInput.value = '';
    searchClear.hidden = true;
    applySearch();
    searchInput.focus();
  });

  physicsCheck.addEventListener('change', function () {
    network.setOptions({ physics: { enabled: physicsCheck.checked } });
  });

  fitBtn.addEventListener('click', function () {
    network.fit({ animation: true });
  });
  resetBtn.addEventListener('click', function () {
    network.setOptions({ physics: { enabled: true } });
    physicsCheck.checked = true;
    network.fit({ animation: true });
  });

  // Stabilise once, then fit the view and freeze physics.
  network.once('stabilizationIterationsDone', function () {
    network.setOptions({ physics: { enabled: false } });
    network.fit({
      animation: { duration: 400, easingFunction: 'easeInOutQuad' },
    });
  });
})();
