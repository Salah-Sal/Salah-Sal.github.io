(function () {
  'use strict';

  // ─── TREE DATA ─── Chapter 22: الإبدال في وضع المصطلحات ───
  var TREE_DATA = {
    n: "الإبدال في وضع المصطلحات", c: "#f0c040",
    ch: [
      // ── 1. تعريف الإبدال ──
      {
        n: "\u0661. تعريف الإبدال", c: "#60a5fa",
        info: "جعل حرف بدل حرف آخر في الكلمة. يُسمى أحيانًا بالاشتقاق الكبير",
        ch: []
      },
      // ── 2. أنواع الإبدال ──
      {
        n: "\u0662. أنواع الإبدال", c: "#2dd4bf",
        ch: [
          {
            n: "الإبدال الصرفي", c: "#2dd4bf",
            info: "تقتضيه ضرورة صوتية — مطّرد. ٨ حروف: \u00ABطويت دائمًا\u00BB",
            ch: [
              { n: "مطّرد (يحدث دائمًا)", c: "#2dd4bf" },
              { n: "مثال: ازدهر \u2190 ازتهر (افتعل)", c: "#2dd4bf" }
            ]
          },
          {
            n: "الإبدال اللغوي", c: "#2dd4bf",
            info: "لا تقتضيه ضرورة صوتية — غير مطّرد. ٢٢ حرفًا",
            ch: [
              { n: "في ٢٢ حرفًا: \u00ABلجد صرف شكس آمن طي ثوب عزّته\u00BB", c: "#2dd4bf" },
              { n: "الاستقراء الحديث: جميع الحروف", c: "#2dd4bf" }
            ]
          }
        ]
      },
      // ── 3. عناية اللغويين ──
      {
        n: "\u0663. عناية اللغويين", c: "#a78bfa",
        info: "لفت الإبدال انتباه اللغويين فخصّصوا له كتبًا كاملة",
        ch: [
          { n: "الأصمعي (ت ٢١٦هـ) — أول من أطلق الاسم", c: "#a78bfa" },
          { n: "ابن السكيت (ت ٢٤٤هـ) — \u00ABالقلب والإبدال\u00BB", c: "#a78bfa" },
          { n: "الزجاجي (ت ٣٤٠هـ) — \u00ABالإبدال والمعاقبة والنظائر\u00BB", c: "#a78bfa" },
          { n: "السكاكي (ت ٦٢٦هـ)", c: "#a78bfa" }
        ]
      },
      // ── 4. طبيعة الإبدال: ترادف أم تفريق؟ ──
      {
        n: "\u0664. طبيعة الإبدال: ترادف أم تفريق؟", c: "#fb7185",
        info: "اختلف اللغويون: هل الإبدال مجرد ترادف أم يفرّق بين درجات المعنى؟",
        ch: [
          {
            n: "رأي الترادف (أبو الطيب اللغوي)", c: "#fb7185",
            info: "لغات مختلفة لمعانٍ متفقة تتقارب حتى لا تختلف إلا في حرف واحد",
            ch: [
              { n: "حشي / خشي — لليابس", c: "#fb7185" },
              { n: "دزق الطائر / زرق", c: "#fb7185" },
              { n: "طُخْرور / طُخْرُور — للسحابة", c: "#fb7185" }
            ]
          },
          {
            n: "رأي التفريق (الأغلبية)", c: "#fb7185",
            info: "الإبدال يحمل تنويعات على المعنى العام ويفرّق بين درجاته",
            ch: [
              { n: "هتنت أشدّ من هطلت (ابن السكيت)", c: "#fb7185" },
              { n: "الشازب / الشاسب — أشد ضمورًا (الفارابي)", c: "#fb7185" },
              { n: "حزّ اللحم / جزّ الصوف (الثعالبي)", c: "#fb7185" },
              { n: "٥ درجات: رنين \u2192 هنين \u2192 حنين \u2192 أنين \u2192 خنين (الثعالبي)", c: "#fb7185" },
              { n: "الحَوَص / الخَوَص — عين واحدة / خِلقة (ابن سيده)", c: "#fb7185" },
              { n: "بُجْرة في السرة / عُجْرة في الظهر (ابن منظور)", c: "#fb7185" }
            ]
          }
        ]
      },
      // ── 5. أهمية الإبدال المصطلحية ──
      {
        n: "\u0665. أهمية الإبدال المصطلحية", c: "#34d399",
        info: "تخصيص اللفظتين المتعاقبتين لمسمّيين متشابهين بينهما علاقة معنوية",
        ch: [
          { n: "مبدأ التنوخي: تخصيص المتعاقبتين لمسمّيين", c: "#34d399" },
          { n: "مِرْضَخة / مِرْضَحة — كسّارة الجوز / اللوز", c: "#34d399" },
          { n: "الغَبْن / الخَبْن — الثوب / العروض", c: "#34d399" },
          { n: "التخدير / التخثير — anesthésie / narcose", c: "#34d399" },
          { n: "التأريث / التأريف — abornage / cadastre", c: "#34d399" },
          { n: "الكَهْرَب / الكَهْرَس / الكَهْرَح — electron / négaton / positon", c: "#34d399" }
        ]
      },
      // ── 6. شروط الاستخدام ──
      {
        n: "\u0666. شروط الاستخدام", c: "#fb923c",
        info: "ثلاثة شروط وضعها ممدوح خسارة",
        ch: [
          { n: "انسجام صوتي مع النظام العربي", c: "#fb923c" },
          { n: "تجنّب الاشتراك اللفظي ما أمكن", c: "#fb923c" },
          { n: "للضرورة فقط: عند تعذّر الترجمة والاشتقاق", c: "#fb923c" }
        ]
      }
    ]
  };

  // ─── RESPONSIVE CONSTANTS ───
  var DESKTOP_CONF = { NODE_H: 36, NODE_GAP: 8, LEVEL_W: 280, CIRCLE_R: [10, 7, 5], FONT: [15, 13], TEXT_GAP: [16, 12] };
  var MOBILE_CONF  = { NODE_H: 32, NODE_GAP: 6, LEVEL_W: 160, CIRCLE_R: [8, 5, 4],  FONT: [14, 12], TEXT_GAP: [12, 8]  };

  function isMobile() { return window.innerWidth <= 768; }
  function getConf() { return isMobile() ? MOBILE_CONF : DESKTOP_CONF; }

  var NODE_H, NODE_GAP, LEVEL_W, CIRCLE_R;
  function applyConf() {
    var c = getConf();
    NODE_H = c.NODE_H; NODE_GAP = c.NODE_GAP;
    LEVEL_W = c.LEVEL_W; CIRCLE_R = c.CIRCLE_R;
  }
  applyConf();

  // ─── LEGEND ENTRIES ───
  var LEGEND = [
    ["#f0c040", "الباب الرئيسي"],
    ["#60a5fa", "التعريف"],
    ["#2dd4bf", "أنواع الإبدال"],
    ["#a78bfa", "عناية اللغويين"],
    ["#fb7185", "طبيعة الإبدال"],
    ["#34d399", "التطبيقات المصطلحية"],
    ["#fb923c", "شروط الاستخدام"]
  ];

  // ─── LAYOUT ENGINE (ported from React) ───
  function layoutTree(node, depth) {
    depth = depth || 0;
    node.depth = depth;
    if (node.expanded === undefined) node.expanded = depth < 1;
    node.visible = true;
    if (!node.ch) node.ch = [];
    for (var i = 0; i < node.ch.length; i++) {
      layoutTree(node.ch[i], depth + 1);
    }
  }

  function computePositions(node, startY) {
    startY = startY || 0;
    node.x = node.depth * LEVEL_W;
    if (!node.expanded || !node.ch || node.ch.length === 0) {
      node.y = startY;
      node.subtreeHeight = NODE_H;
      return startY + NODE_H + NODE_GAP;
    }
    var currentY = startY;
    for (var i = 0; i < node.ch.length; i++) {
      currentY = computePositions(node.ch[i], currentY);
    }
    var firstChild = node.ch[0];
    var lastChild = node.ch[node.ch.length - 1];
    node.y = (firstChild.y + lastChild.y) / 2;
    node.subtreeHeight = currentY - startY - NODE_GAP;
    return currentY;
  }

  function collectVisible(node, list) {
    list = list || [];
    list.push(node);
    if (node.expanded && node.ch) {
      for (var i = 0; i < node.ch.length; i++) {
        collectVisible(node.ch[i], list);
      }
    }
    return list;
  }

  function collectEdges(node, list) {
    list = list || [];
    if (node.expanded && node.ch) {
      for (var i = 0; i < node.ch.length; i++) {
        list.push({ from: node, to: node.ch[i] });
        collectEdges(node.ch[i], list);
      }
    }
    return list;
  }

  // ─── TEXT MEASUREMENT (SVG getBBox for pixel-perfect Arabic widths) ───
  var _measureSvg = null, _measureText = null;
  var _textWidthCache = {};

  function getTextWidth(text, size) {
    size = size || 13;
    var key = text + '|' + size;
    if (_textWidthCache[key] !== undefined) return _textWidthCache[key];

    // Create hidden SVG for measurement on first call
    if (!_measureSvg && document.body) {
      _measureSvg = document.createElementNS(SVG_NS, "svg");
      _measureSvg.setAttribute("width", "0");
      _measureSvg.setAttribute("height", "0");
      _measureSvg.style.cssText = "position:absolute;top:-9999px;left:-9999px;visibility:hidden;overflow:hidden";
      _measureText = document.createElementNS(SVG_NS, "text");
      _measureText.style.fontFamily = "'Noto Naskh Arabic',sans-serif";
      _measureSvg.appendChild(_measureText);
      document.body.appendChild(_measureSvg);
    }

    if (_measureText) {
      _measureText.setAttribute("font-size", size);
      _measureText.textContent = text;
      try {
        var w = _measureText.getBBox().width;
        _textWidthCache[key] = w;
        return w;
      } catch (e) { /* fallback below */ }
    }

    // Fallback: generous estimate for Arabic glyphs
    var avg = size * 0.55;
    var w = 0;
    for (var i = 0; i < text.length; i++) {
      var code = text.charCodeAt(i);
      if (code >= 0x0600 && code <= 0x06FF) w += size * 0.85;
      else if (code >= 0x0020 && code <= 0x007E) w += size * 0.52;
      else w += avg;
    }
    return w;
  }

  function clearTextWidthCache() {
    _textWidthCache = {};
  }

  function getCircleRadius(node) {
    return CIRCLE_R[Math.min(node.depth, 2)];
  }

  // Returns {left, right} — pixel extent from circle center
  function getTextExtent(node) {
    var r = getCircleRadius(node);
    var conf = getConf();
    var fontSize = node.depth === 0 ? conf.FONT[0] : conf.FONT[1];
    var textW = getTextWidth(node.n, fontSize);
    var gap = node.depth === 0 ? conf.TEXT_GAP[0] : conf.TEXT_GAP[1];
    return { left: r + gap + textW, right: r };
  }

  // ─── STATE ───
  var transform = { x: 0, y: 0, scale: 1 };
  var dragging = false;
  var dragStart = { x: 0, y: 0 };
  var selected = null;
  var pinchStartDist = 0;
  var pinchStartScale = 1;

  // ─── DOM REFS ───
  var svgEl, contentGroup, wrapperEl, defsEl;
  var infoPanelEl, infoPanelTitle, infoPanelBody, infoAccentBar;
  var legendEl, legendItemsWrap;

  // ─── HELPERS ───
  var SVG_NS = "http://www.w3.org/2000/svg";

  function svgCreate(tag, attrs) {
    var el = document.createElementNS(SVG_NS, tag);
    if (attrs) {
      for (var k in attrs) {
        if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
      }
    }
    return el;
  }

  // ─── THEME ───
  function getThemeColors() {
    var dark = document.body.classList.contains('dark-mode');
    return {
      nodeFill: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
      nodeStroke: 0.3,
      nodeText: dark ? '#d4d2c8' : '#374151',
      rootText: '#f0c040',
      edgeOpacity: dark ? 0.25 : 0.3,
      selectedFillOpacity: dark ? 0.2 : 0.15,
      selectedText: dark ? '#fff' : '#1f2937'
    };
  }

  // ─── CURVE EDGE ───
  function curveEdge(from, to) {
    var r1 = getCircleRadius(from);
    var r2 = getCircleRadius(to);
    var sx = from.x + r1, sy = from.y + NODE_H / 2;
    var tx = to.x - r2,   ty = to.y + NODE_H / 2;
    var mx = (sx + tx) / 2;
    return "M" + sx + "," + sy + " C" + mx + "," + sy + " " + mx + "," + ty + " " + tx + "," + ty;
  }

  // ─── RENDER ───
  function render() {
    if (!contentGroup) return;
    var tc = getThemeColors();

    // Clear content and defs
    while (contentGroup.firstChild) contentGroup.removeChild(contentGroup.firstChild);
    if (defsEl) { while (defsEl.firstChild) defsEl.removeChild(defsEl.firstChild); }

    computePositions(TREE_DATA);
    var nodes = collectVisible(TREE_DATA);
    var edges = collectEdges(TREE_DATA);

    // Draw edges with gradients
    for (var i = 0; i < edges.length; i++) {
      var edge = edges[i];
      var gradId = "eg" + i;

      // Create linear gradient from parent color to child color
      if (defsEl) {
        var grad = svgCreate("linearGradient", { id: gradId, x1: "0%", y1: "0%", x2: "100%", y2: "0%" });
        var stop1 = svgCreate("stop", { offset: "0%", "stop-color": edge.from.c || "#f0c040", "stop-opacity": tc.edgeOpacity });
        var stop2 = svgCreate("stop", { offset: "100%", "stop-color": edge.to.c || "#6bb8ff", "stop-opacity": tc.edgeOpacity });
        grad.appendChild(stop1);
        grad.appendChild(stop2);
        defsEl.appendChild(grad);
      }

      var path = svgCreate("path", {
        d: curveEdge(edge.from, edge.to),
        fill: "none",
        stroke: defsEl ? "url(#" + gradId + ")" : (edge.to.c || "#6bb8ff"),
        "stroke-width": "1",
        "stroke-opacity": defsEl ? 1 : tc.edgeOpacity
      });
      contentGroup.appendChild(path);
    }

    // Draw nodes
    for (var j = 0; j < nodes.length; j++) {
      var node = nodes[j];
      var r = getCircleRadius(node);
      var hasKids = node.ch && node.ch.length > 0;
      var isRoot = node.depth === 0;
      var isSel = selected === node;
      var nodeColor = node.c || "#6bb8ff";
      var isCollapsed = hasKids && !node.expanded;

      // Circle center coords
      var cx = node.x;
      var cy = NODE_H / 2;

      // Node glow via drop-shadow filter
      var glowFilter;
      if (isRoot) {
        glowFilter = "drop-shadow(0 0 8px rgba(240,192,64,0.5))";
      } else if (isSel) {
        glowFilter = "drop-shadow(0 0 10px " + nodeColor + ")";
      } else {
        glowFilter = "drop-shadow(0 0 3px " + nodeColor + "66)";
      }

      var g = svgCreate("g", {
        transform: "translate(0," + node.y + ")",
        "class": "mm-node" + (isSel ? " mm-node-selected" : ""),
        style: "cursor:pointer;filter:" + glowFilter
      });

      // Circle fill: full if collapsed, low-opacity if expanded/leaf, mid if selected
      var fillOpacity;
      if (isSel) fillOpacity = 0.6;
      else if (isCollapsed) fillOpacity = 1;
      else fillOpacity = 0.18;

      var circle = svgCreate("circle", {
        cx: cx, cy: cy, r: r,
        fill: nodeColor,
        "fill-opacity": fillOpacity,
        stroke: nodeColor,
        "stroke-width": isSel ? 2 : 0.8,
        "stroke-opacity": isSel ? 0.9 : 0.5
      });
      g.appendChild(circle);

      // Text always LEFT of circle
      var conf = getConf();
      var gap = isRoot ? conf.TEXT_GAP[0] : conf.TEXT_GAP[1];
      var textX = cx - r - gap;

      var label = svgCreate("text", {
        x: textX,
        y: cy,
        "dominant-baseline": "central",
        "text-anchor": "start",
        direction: "rtl",
        "font-size": isRoot ? conf.FONT[0] : conf.FONT[1],
        "font-weight": node.depth <= 1 ? 700 : 500,
        fill: isRoot ? tc.rootText : (isSel ? tc.selectedText : tc.nodeText),
        style: "font-family:'Noto Naskh Arabic',var(--font-arabic),sans-serif"
      });
      label.textContent = node.n;
      g.appendChild(label);

      // Child count below label for collapsed nodes
      if (isCollapsed) {
        var countText = svgCreate("text", {
          x: textX,
          y: cy + 16,
          "dominant-baseline": "central",
          "text-anchor": "start",
          direction: "rtl",
          "font-size": isMobile() ? 8 : 9,
          fill: nodeColor,
          "fill-opacity": 0.7,
          style: "font-family:'Noto Naskh Arabic',var(--font-arabic),sans-serif"
        });
        countText.textContent = "\u2295 " + node.ch.length;
        g.appendChild(countText);
      }

      // Click handler (closure)
      (function (nd) {
        g.addEventListener("pointerdown", function (e) {
          e.stopPropagation();
        });
        g.addEventListener("click", function (e) {
          e.stopPropagation();
          if (nd.ch && nd.ch.length > 0) {
            nd.expanded = !nd.expanded;
          }
          selected = nd;
          render();
          showInfo(nd);
        });
      })(node);

      contentGroup.appendChild(g);
    }

    // Update transform
    contentGroup.setAttribute(
      "transform",
      "translate(" + transform.x + "," + transform.y + ") scale(" + transform.scale + ")"
    );
  }

  // ─── INFO PANEL ───
  function showInfo(node) {
    if (!node || !node.info) {
      infoPanelEl.classList.remove("visible");
      if (legendEl) legendEl.classList.remove("legend-hidden");
      return;
    }
    infoAccentBar.style.background = node.c || "#f0c040";
    infoPanelTitle.textContent = node.n;
    infoPanelTitle.style.color = node.c || "#f0c040";
    infoPanelBody.textContent = node.info;
    infoPanelEl.classList.add("visible");
    // On mobile, hide legend when info panel is visible
    if (legendEl && window.innerWidth <= 768) {
      legendEl.classList.add("legend-hidden");
    }
  }

  // ─── FIT VIEW ───
  function fitView() {
    if (!svgEl) return;
    applyConf();
    clearTextWidthCache();

    var rect = svgEl.getBoundingClientRect();
    var W = rect.width || 800;
    var H = rect.height || 600;

    computePositions(TREE_DATA);
    var nodes = collectVisible(TREE_DATA);

    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (var i = 0; i < nodes.length; i++) {
      var nd = nodes[i];
      var ext = getTextExtent(nd);
      var ncx = nd.x;
      var ncy = nd.y + NODE_H / 2;
      minX = Math.min(minX, ncx - ext.left - 10);
      maxX = Math.max(maxX, ncx + ext.right + 10);
      minY = Math.min(minY, ncy - 20);
      maxY = Math.max(maxY, ncy + 20);
    }

    var bw = maxX - minX || 1;
    var bh = maxY - minY || 1;
    var fitMultiplier = isMobile() ? 0.92 : 0.88;
    var scale = Math.min(W / bw, H / bh) * fitMultiplier;
    var cx = (minX + maxX) / 2;
    var cy = (minY + maxY) / 2;

    transform.x = W / 2 - cx * scale;
    transform.y = H / 2 - cy * scale;
    transform.scale = scale;

    render();
  }

  // ─── TOOLBAR ACTIONS ───
  function expandAll() {
    (function ex(nd) { nd.expanded = true; if (nd.ch) nd.ch.forEach(ex); })(TREE_DATA);
    render();
    setTimeout(fitView, 50);
  }

  function collapseAll() {
    (function co(nd) { if (nd.depth > 0) nd.expanded = false; if (nd.ch) nd.ch.forEach(co); })(TREE_DATA);
    render();
    setTimeout(fitView, 50);
  }

  function expandLevel(lv) {
    (function setLv(nd) {
      nd.expanded = nd.depth < lv;
      if (nd.ch) nd.ch.forEach(setLv);
    })(TREE_DATA);
    render();
    setTimeout(fitView, 50);
  }

  // ─── PAN / ZOOM ───
  function onPointerDown(e) {
    if (e.target.closest && e.target.closest(".mm-node")) return;
    dragging = true;
    dragStart.x = e.clientX - transform.x;
    dragStart.y = e.clientY - transform.y;
    svgEl.classList.add("dragging");
    svgEl.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    transform.x = e.clientX - dragStart.x;
    transform.y = e.clientY - dragStart.y;
    contentGroup.setAttribute(
      "transform",
      "translate(" + transform.x + "," + transform.y + ") scale(" + transform.scale + ")"
    );
  }

  function onPointerUp() {
    dragging = false;
    if (svgEl) svgEl.classList.remove("dragging");
  }

  function onWheel(e) {
    e.preventDefault();
    var rect = svgEl.getBoundingClientRect();
    var mx = e.clientX - rect.left;
    var my = e.clientY - rect.top;
    var factor = e.deltaY < 0 ? 1.12 : 0.89;
    var ns = Math.max(0.08, Math.min(5, transform.scale * factor));
    var r = ns / transform.scale;
    transform.x = mx - (mx - transform.x) * r;
    transform.y = my - (my - transform.y) * r;
    transform.scale = ns;
    contentGroup.setAttribute(
      "transform",
      "translate(" + transform.x + "," + transform.y + ") scale(" + transform.scale + ")"
    );
  }

  // ─── TOUCH PINCH-TO-ZOOM ───
  function getTouchDist(e) {
    var t = e.touches;
    var dx = t[0].clientX - t[1].clientX;
    var dy = t[0].clientY - t[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function onTouchStart(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      pinchStartDist = getTouchDist(e);
      pinchStartScale = transform.scale;
    }
  }

  function onTouchMove(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      var dist = getTouchDist(e);
      var ns = Math.max(0.08, Math.min(5, pinchStartScale * (dist / pinchStartDist)));

      var rect = svgEl.getBoundingClientRect();
      var mx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
      var my = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
      var r = ns / transform.scale;

      transform.x = mx - (mx - transform.x) * r;
      transform.y = my - (my - transform.y) * r;
      transform.scale = ns;
      contentGroup.setAttribute(
        "transform",
        "translate(" + transform.x + "," + transform.y + ") scale(" + transform.scale + ")"
      );
    }
  }

  // ─── BUILD UI ───
  function buildUI() {
    wrapperEl = document.getElementById("mindmap-root");
    if (!wrapperEl) return;

    // Toolbar with active class tracking
    var toolbar = document.createElement("div");
    toolbar.className = "mindmap-toolbar";
    var activeBtn = null;
    var buttons = [
      ["\u062A\u0648\u0633\u064A\u0639 \u0627\u0644\u0643\u0644", expandAll],
      ["\u0637\u064A \u0627\u0644\u0643\u0644", collapseAll],
      ["\u0645\u0633\u062A\u0648\u0649 \u0661", function () { expandLevel(1); }],
      ["\u0645\u0633\u062A\u0648\u0649 \u0662", function () { expandLevel(2); }],
      ["\u0645\u0633\u062A\u0648\u0649 \u0663", function () { expandLevel(3); }],
      ["\u0645\u0644\u0627\u0621\u0645\u0629", fitView]
    ];
    for (var i = 0; i < buttons.length; i++) {
      (function (label, action) {
        var btn = document.createElement("button");
        btn.textContent = label;
        btn.addEventListener("click", function () {
          if (activeBtn) activeBtn.classList.remove("active");
          btn.classList.add("active");
          activeBtn = btn;
          action();
        });
        toolbar.appendChild(btn);
      })(buttons[i][0], buttons[i][1]);
    }
    wrapperEl.appendChild(toolbar);

    // Hint with auto-fade (touch-aware)
    var hint = document.createElement("div");
    hint.className = "mindmap-hint";
    var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    hint.textContent = isTouchDevice
      ? "\u0627\u0633\u062D\u0628 \u0644\u0644\u062A\u062D\u0631\u064A\u0643 \u00B7 \u0627\u0641\u0631\u062F \u0625\u0635\u0628\u0639\u064A\u0646 \u0644\u0644\u062A\u0643\u0628\u064A\u0631 \u00B7 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0639\u0642\u062F\u0629 \u0644\u0644\u062A\u0641\u0627\u0635\u064A\u0644"
      : "\u0627\u0633\u062D\u0628 \u0644\u0644\u062A\u062D\u0631\u064A\u0643 \u00B7 \u0639\u062C\u0644\u0629 \u0627\u0644\u0641\u0623\u0631\u0629 \u0644\u0644\u062A\u0643\u0628\u064A\u0631 \u00B7 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0639\u0642\u062F\u0629 \u0644\u0644\u062A\u0641\u0627\u0635\u064A\u0644";
    wrapperEl.appendChild(hint);
    setTimeout(function () { hint.classList.add("fade-out"); }, 3000);

    // Legend with 2-column grid and glowing dots
    legendEl = document.createElement("div");
    legendEl.className = "mindmap-legend";
    var legendToggle = document.createElement("button");
    legendToggle.className = "mindmap-legend-toggle";
    legendToggle.textContent = "\u062F\u0644\u064A\u0644 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u25BC";
    legendToggle.addEventListener("click", function () {
      legendEl.classList.toggle("collapsed");
      legendToggle.textContent = legendEl.classList.contains("collapsed")
        ? "\u062F\u0644\u064A\u0644 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u25B2"
        : "\u062F\u0644\u064A\u0644 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u25BC";
    });
    legendEl.appendChild(legendToggle);
    legendItemsWrap = document.createElement("div");
    legendItemsWrap.className = "mindmap-legend-grid";
    for (var l = 0; l < LEGEND.length; l++) {
      var item = document.createElement("div");
      item.className = "mindmap-legend-item";
      var dot = document.createElement("div");
      dot.className = "mindmap-legend-dot";
      dot.style.background = LEGEND[l][0];
      dot.style.boxShadow = "0 0 6px " + LEGEND[l][0];
      item.appendChild(dot);
      var span = document.createElement("span");
      span.textContent = LEGEND[l][1];
      item.appendChild(span);
      legendItemsWrap.appendChild(item);
    }
    legendEl.appendChild(legendItemsWrap);
    wrapperEl.appendChild(legendEl);

    // Info panel with accent bar
    infoPanelEl = document.createElement("div");
    infoPanelEl.className = "mindmap-info";
    infoAccentBar = document.createElement("div");
    infoAccentBar.className = "mindmap-info-accent";
    infoPanelEl.appendChild(infoAccentBar);
    var infoContent = document.createElement("div");
    infoContent.className = "mindmap-info-content";
    var closeBtn = document.createElement("button");
    closeBtn.className = "mindmap-info-close";
    closeBtn.textContent = "\u2715";
    closeBtn.addEventListener("click", function () {
      infoPanelEl.classList.remove("visible");
      if (legendEl) legendEl.classList.remove("legend-hidden");
      selected = null;
      render();
    });
    infoContent.appendChild(closeBtn);
    infoPanelTitle = document.createElement("div");
    infoPanelTitle.className = "mindmap-info-title";
    infoContent.appendChild(infoPanelTitle);
    infoPanelBody = document.createElement("div");
    infoPanelBody.className = "mindmap-info-body";
    infoContent.appendChild(infoPanelBody);
    infoPanelEl.appendChild(infoContent);
    wrapperEl.appendChild(infoPanelEl);

    // SVG with defs for gradients
    svgEl = document.createElementNS(SVG_NS, "svg");
    svgEl.setAttribute("class", "mindmap-svg");
    defsEl = document.createElementNS(SVG_NS, "defs");
    svgEl.appendChild(defsEl);
    contentGroup = document.createElementNS(SVG_NS, "g");
    svgEl.appendChild(contentGroup);
    wrapperEl.appendChild(svgEl);

    // Event listeners
    svgEl.addEventListener("pointerdown", onPointerDown);
    svgEl.addEventListener("pointermove", onPointerMove);
    svgEl.addEventListener("pointerup", onPointerUp);
    svgEl.addEventListener("pointercancel", onPointerUp);
    svgEl.addEventListener("wheel", onWheel, { passive: false });
    svgEl.addEventListener("touchstart", onTouchStart, { passive: false });
    svgEl.addEventListener("touchmove", onTouchMove, { passive: false });
  }

  // ─── INIT ───
  function initMindmap() {
    layoutTree(TREE_DATA);
    buildUI();
    if (!svgEl) return;

    render();
    fitView();

    // Re-fit after fonts load — clear cached widths so getBBox uses actual font
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        clearTextWidthCache();
        render();
        fitView();
      });
    }

    // Theme observer — re-render on dark mode toggle
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].attributeName === "class") {
          render();
          break;
        }
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    // Re-layout on resize / orientation change (debounced)
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        applyConf();
        clearTextWidthCache();
        render();
        fitView();
      }, 200);
    });
  }

  document.addEventListener("DOMContentLoaded", initMindmap);
})();
