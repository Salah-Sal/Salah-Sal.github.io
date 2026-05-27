(function () {
  'use strict';

  // ─── TREE DATA ─── دلائل الإعجاز — ما قبل فصل «في اللفظ يطلق والمراد به غير ظاهره» ───
  var TREE_DATA = {
    n: "أصول النَّظم — دلائل الإعجاز", c: "#f0c040",
    info: "خريطة لكل ما قبل فصل «في اللفظ يطلق والمراد به غير ظاهره» من دلائل الإعجاز للجرجاني — مقدّمات الكتاب وتحقيق الفصاحة والبلاغة وتأسيس نظرية النَّظم",
    ch: [
      // ── ١. مكانة العلم وعلم البيان ──
      {
        n: "١. مكانة العلم وعلم البيان", c: "#60a5fa",
        info: "افتتح الجرجاني كتابه ببيان فضل العلم وتقديم علم البيان على سائر العلوم؛ فهو الذي يكشف عن إعجاز القرآن ودقائق المعاني",
        ch: [
          {
            n: "فضل العلم أساس كل فضيلة", c: "#60a5fa",
            info: "العلم دليل وهادٍ، وما من منقبة إلا والعلم سبيلها؛ بغير العلم لا يصح فعل ولا يُعرف فضل من فضل"
          },
          {
            n: "تفاضل العلوم وضرورة العدل", c: "#60a5fa",
            info: "يقدّم الناس العلوم بحسب الهوى وحب النفس؛ والحق أن المفاضلة تحتاج إلى عدل في النظر لا اتباعَ ميل"
          },
          {
            n: "علم البيان أشرف العلوم", c: "#60a5fa",
            info: "علم البيان يُحيي المعاني الخافية، ويُظهر الحكمة المكتومة، ويكشف عن خصائص الإعجاز",
            ch: [
              { n: "يُحيي المعاني الخافية", c: "#60a5fa" },
              { n: "يُظهر دقائق الإعجاز وأسراره", c: "#60a5fa" },
              { n: "ليس مجرد ضبط الصوت أو طلب الغريب", c: "#60a5fa" }
            ]
          }
        ]
      },
      // ── ٢. الدفاع عن الشعر ──
      {
        n: "٢. الدفاع عن الشعر", c: "#34d399",
        info: "أطال الجرجاني في الرد على من ذمّ رواية الشعر وحفظه، وبيّن أن الشعر ديوان العرب ومعدن الفصاحة، ولا تُعرف دقائق إعجاز القرآن إلا به",
        ch: [
          {
            n: "حجج الذامّين", c: "#34d399",
            info: "ما زعمه ذامّو الشعر من سفاسف وموازين، وردّه الجرجاني عليهم",
            ch: [
              { n: "الشعر هزل ولهو لا فائدة فيه", c: "#34d399" },
              { n: "موزون مقفّى — صنعة لفظية", c: "#34d399" },
              { n: "وصف الأطلال والإبل ومغالاة المدح والهجو", c: "#34d399" }
            ]
          },
          {
            n: "الشعر ديوان العرب", c: "#34d399",
            info: "إليه يُرجع في معرفة كلام العرب وأساليبهم؛ وهو الحجة في الفصاحة والمعيار في البلاغة"
          },
          {
            n: "أساس معرفة إعجاز القرآن", c: "#34d399",
            info: "لا يُعرف وجه إعجاز القرآن إلا بمعرفة الشعر والنحو؛ فبهما يُقاس فضل النظم القرآني على كلام العرب"
          },
          {
            n: "الراوي حاكٍ لا تبعة عليه", c: "#34d399",
            info: "من حكى كلاماً لا يُؤاخذ به ما لم يقصد نُصرة باطل؛ والله ﷻ حكى كلام الكفار في القرآن ولم يُؤاخذ بحكايته"
          },
          {
            n: "شواهد الصحابة والعلماء", c: "#34d399",
            info: "تمثّل الصحابة والتابعون بالشعر في المواعظ والتفسير والاستشهاد",
            ch: [
              { n: "الحسن البصري في وعظه", c: "#34d399" },
              { n: "عمر بن الخطاب في خطبه وأحكامه", c: "#34d399" },
              { n: "استشهادات أئمة التفسير", c: "#34d399" }
            ]
          },
          {
            n: "علة منع النبي ﷺ من الشعر", c: "#34d399",
            info: "قوله تعالى {وما علّمناه الشعر وما ينبغي له} — تنزيهٌ حفظاً لمعجزة القرآن من شبهة الشعر، لا ذمٌّ للشعر ذاته"
          },
          {
            n: "بطلان الذم بأحوال الشعراء", c: "#34d399",
            info: "لا يصح ذم الشعر من أجل فسق بعض الشعراء؛ وإلا لزم ذم العلوم لمخالطة الفاسقين لها، ولزم ذم العلماء الذين استشهدوا بشعر امرئ القيس وأمثاله"
          }
        ]
      },
      // ── ٣. الدفاع عن النحو والإعراب ──
      {
        n: "٣. الدفاع عن النحو والإعراب", c: "#2dd4bf",
        info: "النحو ليس تكلّفاً ولا تعسّفاً، بل هو علم المعاني التي تُؤدّيها الكلم، ولا يُفهم القرآن إلا به",
        ch: [
          {
            n: "زهد الناس في النحو", c: "#2dd4bf",
            info: "كثير ممن يحتقر النحو يحصره في الرفع والنصب، وهذا قصور؛ النحو علم خصائص النظم وإقامة المعاني"
          },
          {
            n: "الإعراب مفتاح المعاني", c: "#2dd4bf",
            info: "الإعراب ليس صناعةً صوتية بل دلالة على المعاني والأغراض؛ وهو ميزان الفصاحة ومقياس البلاغة"
          },
          {
            n: "الآفة العظمى: القول بغير علم", c: "#2dd4bf",
            info: "أعظم البلاء أن يتكلم المرء في علم لم يُتقنه؛ والتخليط في النحو يُفسد فهم القرآن ودلائل الإعجاز"
          },
          {
            n: "ذم عبد القاهر لأهل زمانه", c: "#2dd4bf",
            info: "يشكو الجرجاني تحوّل الأمور عن جهاتها في زمانه، وأن الناس صدّوا عن العلم الذي به تُعرف خصائص الإعجاز"
          }
        ]
      },
      // ── ٤. الفصاحة والبلاغة وإعجاز القرآن ──
      {
        n: "٤. الفصاحة والبلاغة وإعجاز القرآن", c: "#a78bfa",
        info: "تمهيد لتحقيق معاني البلاغة والفصاحة والبيان والبراعة، وتأسيس قول الجرجاني في إعجاز القرآن",
        ch: [
          {
            n: "سبب تأليف الكتاب", c: "#a78bfa",
            info: "تقرير الأمور وبيان ما يخفى، وحلّ الشبه التي اعترضت المتكلمين في إعجاز القرآن والفصاحة"
          },
          {
            n: "الفصاحة قائمة على النظم", c: "#a78bfa",
            info: "البلاغة والفصاحة لا تتم إلا بنظمٍ وترتيب وتأليف؛ فبهذه الثلاثة تتحقق الجودة والفضل"
          },
          {
            n: "المزية تتزايد حتى الإعجاز", c: "#a78bfa",
            info: "المزية درجات: تتصاعد من جودة الكلام إلى منزلة فمنزلة حتى تنتهي إلى الإعجاز الذي يعجز العرب عن معارضته"
          },
          {
            n: "الرد على «الصرفة» المعتزلية", c: "#a78bfa",
            info: "زعم بعض المعتزلة أن إعجاز القرآن في «صرف الله» العرب عن معارضته لا في خصائص نظمه؛ والجرجاني يُبطل هذا ويُثبت أن الإعجاز في مزايا النظم نفسه"
          },
          {
            n: "وجوب الاستقصاء لا التقليد", c: "#a78bfa",
            info: "من اعتقد الإعجاز تقليداً بلا فحص لمزاياه فقد قصّر؛ المطلوب استقراء وجوه الفضل في كل آية وفصل"
          },
          {
            n: "لكل مستحسَن علة معقولة", c: "#a78bfa",
            info: "مبدأ معرفي محوري: كل كلامٍ بليغ تستحسنه ففيه علةٌ يمكن أن تُعقَل، وجهةٌ يمكن أن تُعرف؛ ليس الحُسن ذوقاً مبهماً"
          }
        ]
      },
      // ── ٥. المزية في المعاني لا في الألفاظ (القلب النظري) ──
      {
        n: "٥. المزية في المعاني لا الألفاظ", c: "#e879f9",
        info: "القلب النظري للكتاب — الفصاحة والبلاغة من جهة المعنى ومُلاءمته في التأليف، لا من جهة اللفظ المفرد أو الحروف",
        ch: [
          {
            n: "زعم المعتزلة: المزية في الحروف", c: "#e879f9",
            info: "ذهب بعض المعتزلة (والقاضي عبد الجبار) إلى أن المزية في الحروف والأصوات؛ فأفرَدوا اللفظ بالنعت ونسبوا الفضل إليه دون المعنى"
          },
          {
            n: "لا تفاضل بين الألفاظ المفردة", c: "#e879f9",
            info: "إذا نظرت إلى الكلمة قبل التأليف لم تجد لفظاً أدلَّ على معناه من آخر؛ الدلالة المفردة سواء",
            ch: [
              { n: "ليس «رجل» أدلَّ على معناه من «فرس»", c: "#e879f9" },
              { n: "ليس «الليث» أدلّ على السبع من «الأسد»", c: "#e879f9" },
              { n: "ولا يصح ترجيح عربيٍّ على فارسيٍّ من جهة لفظ مفرد", c: "#e879f9" }
            ]
          },
          {
            n: "الفضل من ملاءمة المعاني في التأليف", c: "#e879f9",
            info: "إنما تتفاضل الألفاظ من حيث ارتبطت بأخواتها في النظم، فحَسُن معنى الأولى لمعنى الثانية، ولاءمتْ السابقةُ التاليةَ في مؤدّاها"
          },
          {
            n: "شاهد: {وقيل يا أرض ابلعي ماءك}", c: "#e879f9",
            info: "تتجلى المزية في الآية من ارتباط الكلم بعضها ببعض: نداء الأرض ثم أمرها، النداء بـ«يا»، إضافة «الماء»، اتساق الفعلين، إضمار السفينة، ومقابلة «قيل» في الخاتمة بـ«قيل» في الفاتحة"
          },
          {
            n: "اللفظ الواحد يحسن ويقبح بحسب الموضع", c: "#e879f9",
            info: "الكلمة بعينها قد تَروقُك في موضع وتثقل في آخر؛ هذا يُبطل القول بأن الحسن في ذات اللفظ",
            ch: [
              { n: "«الأخدع» يحسُن في بيت الحماسة والبحتري، ويثقُل في بيت أبي تمام", c: "#e879f9" },
              { n: "«الشيء» يحسُن عند ابن أبي ربيعة وأبي حية، ويضعُف عند المتنبي", c: "#e879f9" }
            ]
          },
          {
            n: "شاعرٌ يَرتقي السِّماك وآخر يلصق بالحضيض بنفس الكلمات", c: "#e879f9",
            info: "لو كانت المزية في ذات اللفظ لما اختلفت قيمته بين شاعرين استعملا الكلم بأعيانها؛ فالتفاوت دليل قاطع على أن المزية في النظم لا في الألفاظ"
          }
        ]
      },
      // ── ٦. نظرية النَّظم ──
      {
        n: "٦. نظرية النَّظم", c: "#fb923c",
        info: "تحديد ماهية النَّظم: ليس توالي الألفاظ في النطق، بل ترتيب المعاني في النفس، وتوخّي معاني الإعراب",
        ch: [
          {
            n: "الفرق بين «نَظم الحروف» و«نَظم الكَلِم»", c: "#fb923c",
            info: "تفريقٌ مفتاحي يضع به الجرجاني أساس نظريته",
            ch: [
              { n: "نظم الحروف: تواليها في النطق بلا اقتضاء معنى", c: "#fb923c" },
              { n: "نظم الكَلِم: ترتيب الألفاظ بحسب ترتب معانيها في النفس", c: "#fb923c" },
              { n: "نظائره: النسج والوشي والصياغة والبناء والتحبير", c: "#fb923c" }
            ]
          },
          {
            n: "النَّظم صنعة تحتاج فكراً", c: "#fb923c",
            info: "إذا كان النظم يحتاج إلى فكر، فمحال أن يكون الفكر في الألفاظ المجرّدة؛ بل لا بد أن يكون في المعاني"
          },
          {
            n: "الألفاظ أوعية للمعاني", c: "#fb923c",
            info: "إذا وجب لمعنى أن يكون أوّلاً في النفس، وجب للفظ الدالّ عليه أن يكون أوّلاً في النطق؛ فترتيب الألفاظ تابعٌ لترتب المعاني"
          },
          {
            n: "نظائر العرب في تسمية النَّظم", c: "#fb923c",
            info: "العرب وإن لم يقولوا «نَظم المعاني» صريحاً، فقد قالوا: يُرتّب المعاني، ويُنزّلها، ويبني بعضها على بعض، ويُلحق النظير بالنظير"
          },
          {
            n: "التعريف الجامع: توخّي معاني الإعراب", c: "#fb923c",
            info: "محصول النَّظم أن تعمد إلى الكلم فتُقيم بينها علاقات الإعراب — وذلك كله مما يرجع إلى المعنى لا إلى اللفظ",
            ch: [
              { n: "الفاعلية والمفعولية", c: "#fb923c" },
              { n: "المبتدأ والخبر", c: "#fb923c" },
              { n: "النعت والتوكيد والبدل", c: "#fb923c" },
              { n: "الحال والتمييز", c: "#fb923c" },
              { n: "حروف النفي والاستفهام والتمنّي", c: "#fb923c" },
              { n: "أدوات الشرط وما ضُمِّن معناها", c: "#fb923c" }
            ]
          }
        ]
      },
      // ── ٧. الرد على شبهات اللفظ والمعتزلة ──
      {
        n: "٧. الرد على شبهات اللفظ والمعتزلة", c: "#fb7185",
        info: "إبطال الشبه القائلة بأن الفصاحة في تلاؤم الحروف، وتحرير القول مع القاضي عبد الجبار في تأويل عبارات القدماء",
        ch: [
          {
            n: "شبهة تلاؤم الحروف وردّها", c: "#fb7185",
            info: "زعم بعضهم أن الفصاحة مجرد تعديل مزاج الحروف بحيث لا تتلاقى ثقيلة على اللسان؛ والجرجاني يُبطل هذا",
            ch: [
              { n: "بيت أبي تمام في الثقل", c: "#fb7185" },
              { n: "بيت ابن يسير", c: "#fb7185" },
              { n: "لو كان الأمر للحروف لخرجت الفصاحة عن البلاغة", c: "#fb7185" }
            ]
          },
          {
            n: "صعوبة السجع من المعاني لا الألفاظ", c: "#fb7185",
            info: "ما يَعسُر في السجع وأشباهه إنما يعسُر من جهة جمع المعاني المتآلفة لا من جهة جلب الحروف المتلائمة"
          },
          {
            n: "وَهْم ترتيب الألفاظ بنفسها", c: "#fb7185",
            info: "من ظنّ أنّا نطلب ترتيباً للألفاظ بنفسها بمعزل عن معانيها فقد خَدع نفسه؛ ترتيب الألفاظ يَتبع ترتب المعاني ضرورة"
          },
          {
            n: "الرد على القاضي عبد الجبار", c: "#fb7185",
            info: "تفسير عبارات القدماء التي ظاهرها وصف اللفظ بالفصاحة — وإثبات أن المراد بها وصفُه من جهة الدلالة لا من جهة ذاته",
            ch: [
              { n: "الفصاحة تصف اللفظ من جهة الدلالة لا ذاته", c: "#fb7185" },
              { n: "«تتزايد الألفاظ» كناية عن تتايع المعاني", c: "#fb7185" },
              { n: "«لفظ متمكّن» = حسن الاتفاق بين معناه ومعنى ما يليه", c: "#fb7185" },
              { n: "«لفظ قَلِق نابٍ» = سوء التلاؤم بين المعاني", c: "#fb7185" },
              { n: "الصفات استعارة من المعنى للفظ لا توصيف للفظ في ذاته", c: "#fb7185" }
            ]
          }
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
    ["#f0c040", "الأصل الجامع"],
    ["#60a5fa", "العلم وعلم البيان"],
    ["#34d399", "الدفاع عن الشعر"],
    ["#2dd4bf", "الدفاع عن النحو"],
    ["#a78bfa", "الفصاحة والبلاغة"],
    ["#e879f9", "المزية في المعاني"],
    ["#fb923c", "نظرية النَّظم"],
    ["#fb7185", "الرد على شبهات اللفظ"]
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
        countText.textContent = "⊕ " + node.ch.length;
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
      ["توسيع الكل", expandAll],
      ["طي الكل", collapseAll],
      ["مستوى ١", function () { expandLevel(1); }],
      ["مستوى ٢", function () { expandLevel(2); }],
      ["مستوى ٣", function () { expandLevel(3); }],
      ["ملاءمة", fitView]
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
      ? "اسحب للتحريك · افرد إصبعين للتكبير · اضغط على عقدة للتفاصيل"
      : "اسحب للتحريك · عجلة الفأرة للتكبير · اضغط على عقدة للتفاصيل";
    wrapperEl.appendChild(hint);
    setTimeout(function () { hint.classList.add("fade-out"); }, 3000);

    // Legend with 2-column grid and glowing dots
    legendEl = document.createElement("div");
    legendEl.className = "mindmap-legend";
    var legendToggle = document.createElement("button");
    legendToggle.className = "mindmap-legend-toggle";
    legendToggle.textContent = "دليل الألوان ▼";
    legendToggle.addEventListener("click", function () {
      legendEl.classList.toggle("collapsed");
      legendToggle.textContent = legendEl.classList.contains("collapsed")
        ? "دليل الألوان ▲"
        : "دليل الألوان ▼";
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
    closeBtn.textContent = "✕";
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
