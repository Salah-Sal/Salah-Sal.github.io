(function () {
  'use strict';

  // ─── TREE DATA ─── enriched from React component + 21_mindmap.md ───
  var TREE_DATA = {
    n: "الاشتقاق في وضع المصطلحات", c: "#f0c040",
    ch: [
      // ── 1. بنية الكلمة العربيّة ──
      {
        n: "١. بنية الكلمة العربيّة", c: "#6bb8ff",
        info: "تتولّد الكلمات عبر: الجذر \u2190 الجذع \u2190 الكلمة",
        ch: [
          { n: "الجذر", c: "#6bb8ff", info: "ثلاثة صوامت عادةً مثل (ك ت ب). يحمل المعنى الأصليّ في جميع المشتقّات" },
          { n: "الجذع", c: "#6bb8ff", info: "الجذر + الوزن الصرفي. مثال: (ك ت ب) + (فَاعِل) = كَاتِب" },
          { n: "الكلمة", c: "#6bb8ff", info: "الجذع + زائدة للدلالة على الشخص أو الزمن أو التأنيث أو الجمع. مثال: كاتِب + تاء التأنيث = كاتبة" },
          { n: "لغات إلصاقية", c: "#6bb8ff", info: "تولّد الألفاظ بإضافة لواصق إلى جذع الكلمة" },
          { n: "لغات اشتقاقية", c: "#6bb8ff", info: "تولّد الألفاظ من الجذر طبقًا لأوزان معيّنة (كالعربيّة)" }
        ]
      },
      // ── 2. الميزان الصرفيّ ──
      {
        n: "٢. الميزان الصرفيّ", c: "#6bb8ff",
        info: "مقياس بنية الكلمة من (ف ع ل). الفاء = الأصل الأول، العين = الثاني، اللام = الثالث",
        ch: [
          { n: "وزن الثلاثي", c: "#6bb8ff", info: "كَتَبَ = فَعَلَ / عُلِمَ = فُعِلَ" },
          { n: "حرف أصلي زائد", c: "#6bb8ff", info: "طمأن = فَعْلَلَ / دِرهم = فِعْلَل" },
          { n: "تكرار حرف", c: "#6bb8ff", info: "كتَّبَ = فَعَّلَ (التاء مشدّدة)" },
          { n: "أحرف سألتمونيها", c: "#6bb8ff", info: "كاتَبَ = فاعَلَ / استعلم = استفعل" },
          { n: "حذف حرف", c: "#6bb8ff", info: "قُلْ = فُلْ / عِ = عِ (أمر من وعى)" }
        ]
      },
      // ── 3. تعريف الاشتقاق (NEW) ──
      {
        n: "٣. تعريف الاشتقاق", c: "#60a5fa",
        info: "توليد كلمة من كلمة مع تناسُب في اللفظ والمعنى بحسب قوانين الصرف",
        ch: [
          { n: "من فَعَلَ \u2192 ١٢ فعلًا مزيدًا", c: "#60a5fa", info: "أَفْعَلَ، فَعَّلَ، فاعَلَ، تَفَعَّلَ، انْفَعَلَ، افْتَعَلَ، تَفاعَلَ، افْعَلَّ، اسْتَفْعَلَ، افْعَوْعَلَ، افْعَوَّلَ، افْعَالَّ" },
          { n: "من فَعَلَ \u2192 ١٠ أسماء", c: "#60a5fa", info: "فاعِل، مَفْعُول، فَعِيل، أفْعَل، مَفْعَل، مِفْعَل، مِفْعَلَة، مِفْعَال، فُعْلَة، فِعْلَة + المصدر عند الكوفيّين" }
        ]
      },
      // ── 4. أهمية الاشتقاق (NEW) ──
      {
        n: "٤. أهمية الاشتقاق", c: "#34d399",
        info: "وسيلة لتنمية اللغة والتعبير عن المفاهيم الجديدة",
        ch: [
          { n: "المعاجم لا تضمّ جميع المفردات", c: "#34d399", info: "المعاجم لا تضمّ جميع المفردات الممكنة — الاشتقاق يكمّل النقص" },
          { n: "طاقة توليديّة لامتناهية", c: "#34d399", info: "يوفّر طاقة توليديّة لامتناهية من أصول محدودة" },
          { n: "تنويع المعنى الأصلي", c: "#34d399", info: "يُنوِّع المعنى الأصليّ بخواصّ: المبالغة، المطاوعة، التعدية، المشاركة، الطلب، الصيرورة..." },
          {
            n: "إحصائيّات الجذور", c: "#34d399",
            info: "عبد الصبور شاهين: يمكن اشتقاق أكثر من ١٠٠ جذع من الجذر الواحد → ملايين الكلمات",
            ch: [
              { n: "١٢٩٥٢ جذرًا ثلاثيًّا", c: "#34d399", info: "المستعمل: ٧٥٩٧ — الباقي مهمل لتنافر الأصوات" },
              { n: "٤٠٨ جذرًا رباعيًّا", c: "#34d399" },
              { n: "٣٠٠ جذر خماسيّ", c: "#34d399" },
              { n: "أكثر من ١٠٠ جذع من الجذر الواحد", c: "#34d399", info: "→ ملايين الكلمات الممكنة" }
            ]
          }
        ]
      },
      // ── 5. عناية اللغويين (NEW) ──
      {
        n: "٥. عناية اللغويين بالاشتقاق", c: "#a78bfa",
        info: "وصلنا ≈ ٣٠ كتابًا بعنوان «الاشتقاق»",
        ch: [
          { n: "أقدمها: قُطْرب (ت ٢٠٦هـ)", c: "#a78bfa", info: "كتاب الاشتقاق لقُطْرب — أقدم مؤلّف وصل إلينا في هذا الباب" },
          { n: "أحدثها: فؤاد حنا ترزي (١٩٦٨)", c: "#a78bfa", info: "الاشتقاق، بيروت ١٩٦٨م" }
        ]
      },
      // ── 6. أنواع الاشتقاق ──
      {
        n: "٦. أنواع الاشتقاق", c: "#5eead4",
        info: "أربعة أقسام عند اللغويين العرب",
        ch: [
          { n: "الصغير (العام)", c: "#5eead4", info: "انتزاع كلمة بتغيير الصيغة مع اتفاق في الأحرف الأصلية وترتيبها. مثال: عَلِمَ \u2190 عالِم، معلوم، أعلم. هو المقصود عند إطلاق «الاشتقاق»." },
          { n: "الكبير (الإبدال)", c: "#5eead4", info: "تغيير حرف مع تشابه في المعنى وتقارب في المخارج. مثال: قضم (أكل اليابس) وخضم (أكل الرطب). حمولة ضئيلة." },
          { n: "الأكبر (التقليبات)", c: "#5eead4", info: "ابن جني في «الخصائص». تقليبات الأصل الثلاثي الستة على معنى واحد. مثال: (ج ب ر) = جبر، رجب، برج... كلها تدل على القوة والشدة." },
          { n: "الكُبّار (النحت)", c: "#5eead4", info: "صياغة كلمة من كلمتين أو أكثر: بسملة (بسم الله) / حمدلة (الحمد لله). أنواعه: فعلي، اسمي، وصفي، نسبي." }
        ]
      },
      // ── 7. أصل المشتقات ──
      {
        n: "٧. أصل المشتقات", c: "#c4b5fd",
        info: "خلاف بين البصريين والكوفيين حول أصل المشتقات",
        ch: [
          { n: "البصريون: المصدر أصل", c: "#c4b5fd", info: "المصدر بسيط ومطلق يدل على الحدث فقط. البسيط أصل المركّب." },
          { n: "الكوفيون: الفعل أصل", c: "#c4b5fd", info: "المصدر يصحّ لصحة الفعل ويعتلّ لاعتلاله. الفعل يعمل في المصدر." },
          { n: "اشتقاق من الأعيان", c: "#c4b5fd", info: "من أسماء الأعيان: أبحر، تحجّر. من المعرّبة: دوّن، فهرس. من الأعضاء: رأسه. من الزمان: أصبح. من المكان: أنجد." }
        ]
      },
      // ── 8. القياسيّ والسماعيّ ──
      {
        n: "٨. القياسيّ والسماعيّ", c: "#c4b5fd",
        info: "القياس: صوغ الألفاظ بتواتر واطّراد. السماعي: ما شذّ عن القاعدة. مثال: مكتب (قياسي) / مَغرِب (سماعي).",
        ch: [
          { n: "العربية قياسية", c: "#c4b5fd", info: "ابن فارس: «أجمع أهل اللغة أنّ للغة العرب قياسًا»" },
          { n: "المشتقات عربية", c: "#c4b5fd", info: "المازني: «كلّ ما قِيسَ على كلام العرب فهو من كلام العرب»" },
          { n: "الصواب من أينما", c: "#c4b5fd", info: "ابن جني: «الناطق على قياس لغة من لغات العرب مصيب»" },
          { n: "الضرورة تبيح", c: "#c4b5fd", info: "السيوطي: «علّة الضرورة التشبيه لشيء بشيء أو الردّ إلى الأصل»" }
        ]
      },
      // ── 9. أوزان الأفعال المزيدة ──
      {
        n: "٩. أوزان الأفعال المزيدة", c: "#7fdb8a",
        info: "١٢ وزنًا لمزيدات الفعل الثلاثي. «زيادة المعاني في زيادة المباني»",
        ch: [
          {
            n: "بزيادة حرف واحد", c: "#7fdb8a",
            ch: [
              { n: "أَفْعَلَ", c: "#7fdb8a", info: "التعدية: التمييز بين الحدوث والإحداث. خرج \u2192 أخرج" },
              { n: "فَعَّلَ", c: "#7fdb8a", info: "التعدية: شخّص، حلّل | التكثير: طوّف | الصيرورة: قيّح | الوصم: كفّر، خطّأ" },
              { n: "فاعَلَ", c: "#7fdb8a", info: "المشاركة: ساجل، سايف" }
            ]
          },
          {
            n: "بزيادة حرفين", c: "#7fdb8a",
            ch: [
              { n: "تَفَعَّلَ", c: "#7fdb8a", info: "الاتخاذ: تبنّاه | التكلّف: تحلّم | المطاوعة: تكسّر، تعلّم" },
              { n: "تَفاعَلَ", c: "#7fdb8a", info: "المشاركة: تسايفوا | التظاهر: تعامى | المطاوعة: تباعد" },
              { n: "انْفَعَلَ", c: "#7fdb8a", info: "المطاوعة فقط (لازم دائمًا): انقلب، انكسر" },
              { n: "افْتَعَلَ", c: "#7fdb8a", info: "المطاوعة: اشتهر | الاتخاذ: امتطى" },
              { n: "افْعَلَّ", c: "#7fdb8a", info: "قوة اللون: ابيضّ، احمرّ، اصفرّ" }
            ]
          },
          {
            n: "بزيادة ٣ أحرف", c: "#7fdb8a",
            ch: [
              { n: "اسْتَفْعَلَ", c: "#7fdb8a", info: "الطلب: استخبر، استغفر | الصيرورة: استحجر | الحكم: استحسن | الاتخاذ: استوزر" },
              { n: "افْعَوْعَلَ", c: "#7fdb8a", info: "المبالغة: اخشوشن، اعشوشب" },
              { n: "افْعَوَّلَ", c: "#7fdb8a", info: "المبالغة: اجلوّذ (ذهب بسرعة)" },
              { n: "افْعَالَّ", c: "#7fdb8a", info: "الصيرورة في الألوان: اسوادّ، احمارّ" }
            ]
          }
        ]
      },
      // ── 10. أوزان الرباعي ──
      {
        n: "١٠. أوزان الرباعي", c: "#7fdb8a",
        info: "أقرّه المجمع للاشتقاق من الاسم الجامد المعرَّب غير الثلاثيّ",
        ch: [
          { n: "فَعْلَلَ", c: "#7fdb8a", info: "ماضي الرباعي: كحلل، درجن" },
          { n: "تَفَعْلَلَ", c: "#7fdb8a", info: "المطاوعة: تدحرج، تبعثر" }
        ]
      },
      // ── 11. الأسماء المشتقة ──
      {
        n: "١١. الأسماء المشتقة", c: "#e07bdb",
        info: "٩ فئات + المصدر. المشتق مأخوذ من المصدر أو الفعل \u2260 الجامد.",
        ch: [
          {
            n: "المصدر (٦ أنواع)", c: "#e07bdb",
            ch: [
              { n: "الأصلي (الصريح)", c: "#e07bdb", info: "سماعي في الثلاثي، قياسي في غيره: فَهم، إكرام، زلزال" },
              { n: "اسم المصدر", c: "#e07bdb", info: "يساوي المصدر دلالة ويخالفه عدد حروف: كلام بدل تكليم" },
              { n: "الميمي", c: "#e07bdb", info: "(مَفْعَل/مَفْعِلة) للثلاثي: مَقدَم" },
              { n: "المرّة", c: "#e07bdb", info: "(فَعْلة): أَكْلة. يدل على عدد المرات" },
              { n: "النوع (الهيئة)", c: "#e07bdb", info: "(فِعْلة): مِشية الأسد. يدل على صفة الفعل" },
              { n: "الصناعي", c: "#e07bdb", info: "ياء مشدّدة + تاء تأنيث: إنسانيّة، عالميّة" }
            ]
          },
          { n: "اسم الفاعل", c: "#e07bdb", info: "(فاعِل) للثلاثي: كاتب، ناصر. غير الثلاثي: ميم مضمومة + كسر ما قبل الآخر: مُنطلِق" },
          { n: "اسم المفعول", c: "#e07bdb", info: "(مَفْعول): مقروء، مأكول، مجروح" },
          {
            n: "الصفة المشبّهة", c: "#e07bdb",
            info: "تدل على ثبوت صفة ملازمة",
            ch: [
              { n: "من فَعِلَ", c: "#e07bdb", info: "(فَعِل): تعِب | (أفعل): أصفر | (فَعْلان): عطشان" },
              { n: "من فَعُلَ", c: "#e07bdb", info: "(فَعِيل): شريف | (فَعَال): جَبان | (فَعُول): وقور | (فَعْل): ضَخْم" },
              { n: "من فَعَلَ", c: "#e07bdb", info: "(فَيْعِل): سيّد، ميّت — أندر الأوزان" }
            ]
          },
          {
            n: "صيغ المبالغة", c: "#e07bdb",
            info: "تدل على المبالغة فيما يدلّ عليه اسم الفاعل",
            ch: [
              { n: "فَعَّال", c: "#e07bdb", info: "سبّاح، علّام، جبّار" },
              { n: "فَعَّالَة", c: "#e07bdb", info: "علّامة، فهَّامة" },
              { n: "فَعُول", c: "#e07bdb", info: "طروب، قؤُول" },
              { n: "فَعِيل", c: "#e07bdb", info: "عليم، سميع" },
              { n: "فاعول", c: "#e07bdb", info: "فاروق، صاروخ، حاسوب" }
            ]
          },
          { n: "اسم التفضيل", c: "#e07bdb", info: "(أفعل / فُعلى): أكبر / كُبرى. شروط: ثلاثي، مُثبت، متصرّف" },
          { n: "اسما المكان والزمان", c: "#e07bdb", info: "(مَفْعَل / مَفْعِل): مَعمل، مَجلس، مُجتمَع، مُستشفى، مَدرسة" },
          {
            n: "اسم الآلة", c: "#e07bdb",
            info: "ثلاثة أوزان قياسية",
            ch: [
              { n: "مِفْعَل", c: "#e07bdb", info: "مِبرد، مِجهر، مِبضع، مِدفع" },
              { n: "مِفْعَال", c: "#e07bdb", info: "مِفتاح، مِصباح، مِنشار" },
              { n: "مِفْعَلة", c: "#e07bdb", info: "مِكنسة، مِعصرة، مِروحة" }
            ]
          }
        ]
      },
      // ── 12. دلالات الأوزان المصطلحية ──
      {
        n: "١٢. دلالات الأوزان المصطلحية", c: "#ff8a6b",
        info: "١٦ وزنًا مخصصًا لتوليد المصطلحات العلمية والتقنية",
        ch: [
          { n: "فِعَالة \u2192 حرفة", c: "#ff8a6b", info: "نِجارة، حِدادة، خِياطة، جِراحة. ابن قتيبة في «أدب الكاتب»" },
          { n: "فُعَال/فَعِيل \u2192 أصوات", c: "#ff8a6b", info: "فُعَال: صُراخ، نُباح | فَعِيل: ضَجيج، هَدير، زَئير" },
          { n: "فُعَال \u2192 أمراض", c: "#ff8a6b", info: "سُعال، زُكام، صُداع. أقرّه المجمع قياسيًا. حديثًا: عُصاب، ذُهان" },
          { n: "فَعَل \u2192 أمراض/عيوب", c: "#ff8a6b", info: "شَلَل، صَرَع، بَرَص، وَرَم، أرَق، صَلَع" },
          { n: "فُعْلَة \u2192 عيوب نطقية", c: "#ff8a6b", info: "لُثْغة، حُبْسة، حُكْلَة. حديثًا: جُمدة (cataplexy)" },
          { n: "فَعَلان \u2192 حركة", c: "#ff8a6b", info: "سيبويه: غَلَيان، دَوَران، طَيَران، هَذَيان، نَوَسان" },
          { n: "تَفَعُّل \u2192 صيرورة", c: "#ff8a6b", info: "تخثُّر الدم، تصلُّب الشرايين، تشمُّع الكبد" },
          { n: "تَفَاعُل \u2192 اشتراك", c: "#ff8a6b", info: "تعاون، تسارع، تفاعل جلدي، تكافؤ، تناظر" },
          { n: "تَفْعَال \u2192 كثرة", c: "#ff8a6b", info: "تَجْوال، تَرْداد. الجليلي: تحماض لـ Hyper-. المجمع فضّل «فَرْط»" },
          { n: "أَفْعَل/فَعْلاء \u2192 عيوب/ألوان", c: "#ff8a6b", info: "عيوب: أعرج، أحول | ألوان: أبيض، أحمر" },
          { n: "فَعُول \u2192 أدوية/قابلية", c: "#ff8a6b", info: "أدوية: لَعوق، غَسول | قابلية (= -able): شَروب، خَثور" },
          { n: "فَعَّال \u2192 احتراف", c: "#ff8a6b", info: "جَمّال، صَرّاف. أقرّه المجمع. زَجّاج (صانع) \u2260 زُجاجي (بائع)" },
          {
            n: "أوزان الآلات المتقدمة", c: "#ff8a6b",
            ch: [
              { n: "مِفْعَال \u2192 قياس", c: "#ff8a6b", info: "حقي: مِحرار، مِسراع، مِضغاط، مِطياف، مِرطاب" },
              { n: "فاعول \u2192 دوران", c: "#ff8a6b", info: "طاحونة، ناعورة، حاسوب، ثاقوبة. مكي: معظمها تفيد الدوران" },
              { n: "فَعَّالة \u2192 مخترعات", c: "#ff8a6b", info: "ثلّاجة، غسّالة، فتّاحة. أقرّه المجمع" },
              { n: "فِعَال \u2192 عمل مباشر", c: "#ff8a6b", info: "أثره يزول بعد الزوال: سِراج، حِزام، لِجام" },
              { n: "فاعِلة", c: "#ff8a6b", info: "راجِمة، قاذِفة، ساقِية" }
            ]
          },
          { n: "فَعْلَة / فِعْلَة \u2192 المرة والهيئة", c: "#ff8a6b", info: "فَعْلَة (بالفتح) \u2192 المرَّة: الموتة الأولى. فِعْلَة (بالكسر) \u2192 الهيئة: مِشية الأسد. فِعْلَة أكثر فائدة في توليد المصطلحات" },
          { n: "المصدر الصناعي \u2192 مذاهب", c: "#ff8a6b", info: "مذاهب: ماديّة | معنويات: حريّة | ظواهر: كهربيّة | أمراض: صدفيّة" },
          { n: "فُعَالة \u2192 فضالة", c: "#ff8a6b", info: "حُثالة، نُخالة، بُرادة، كُسارة، قُلامة" }
        ]
      },
      // ── 13. أوزان غير شائعة ──
      {
        n: "١٣. أوزان غير شائعة", c: "#fbbf24",
        info: "اقتراحات الصابوني لأوزان إلحاق الثلاثي بالرباعي",
        ch: [
          { n: "فَعْلَنَ", c: "#fbbf24", info: "مدّ الاسم إلى الفعل: رَقْمَنَ = to digitize" },
          { n: "فَوْعَلَ", c: "#fbbf24", info: "التعميم: حَوْسَبَ، عَوْلَمَ" },
          { n: "صَوْتَم / صَرْفَم", c: "#fbbf24", info: "الجوهر الحامل للصفة: Phoneme / Morpheme" }
        ]
      },
      // ── 14. ملاحظات ختامية (NEW) ──
      {
        n: "١٤. ملاحظات ختامية", c: "#f472b6",
        info: "ست ملاحظات على ما سبق من أوزان ودلالات",
        ch: [
          { n: "الأوزان تبلغ المئات", c: "#f472b6", info: "ما ذُكر لا يتعدّى العشرات من مئات الأوزان العربية" },
          { n: "الوزن الواحد بأكثر من دلالة", c: "#f472b6", info: "قد يشترك وزنان في دلالة واحدة، وقد يكون للوزن الواحد أكثر من دلالة" },
          { n: "الوزن يصلح لعلوم متنوّعة", c: "#f472b6", info: "فِعال: خِراج (مالي)، خِيال (أدبي)، فَساد (فقهي)، شَغاف (طبي)" },
          { n: "أوزان قليلة الاستعمال", c: "#f472b6", info: "مُفْعَل (مجمع أشياء): مُعْجَم، مُصْحَف | فَعَلوت: مَلَكوت، جَبَروت، رَحَموت" },
          {
            n: "المصدر = المعنى، الفعل = الزمن، الوزن = الوظيفة", c: "#f472b6",
            info: "مثال تطبيقي من مادة (ص ب غ)",
            ch: [
              { n: "صَبَغَ = أصل الفعل", c: "#f472b6" },
              { n: "الصِّباغة = الحرفة (فِعالة)", c: "#f472b6" },
              { n: "الصَّبّاغ = المحترف (فَعّال)", c: "#f472b6" },
              { n: "المِصْبَغ = أداة الطبع (مِفْعَل)", c: "#f472b6" },
              { n: "المِصْباغ = مقياس الدقة (مِفْعال)", c: "#f472b6" },
              { n: "المِصْبَغَة = آلة الصباغة (مِفْعَلة)", c: "#f472b6" },
              { n: "الصُّبوغ = القابل للصبغ (فَعُول)", c: "#f472b6" }
            ]
          },
          { n: "الاشتقاق = الوسيلة الرئيسة", c: "#f472b6", info: "خلاصة: الاشتقاق هو الوسيلة الرئيسة لتنمية العربية ورفدها بالمصطلحات" }
        ]
      }
    ]
  };

  // ─── CONSTANTS ───
  var NODE_H = 36;
  var NODE_GAP = 8;
  var LEVEL_W = 280;
  var CIRCLE_R = [10, 7, 5]; // root, depth1, depth2+

  // ─── LEGEND ENTRIES ───
  var LEGEND = [
    ["#f0c040", "الباب الرئيسي"],
    ["#6bb8ff", "بنية الكلمة والأوزان"],
    ["#60a5fa", "التعريف"],
    ["#34d399", "أهمية الاشتقاق"],
    ["#a78bfa", "عناية اللغويين"],
    ["#5eead4", "أنواع الاشتقاق"],
    ["#c4b5fd", "خلافات ومبادئ"],
    ["#7fdb8a", "أوزان الأفعال"],
    ["#e07bdb", "الأسماء المشتقة"],
    ["#ff8a6b", "تطبيقات مصطلحية"],
    ["#fbbf24", "أوزان مقترحة"],
    ["#f472b6", "ملاحظات ختامية"]
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
    var textW = getTextWidth(node.n, node.depth === 0 ? 15 : 13);
    var gap = node.depth === 0 ? 16 : 12;
    return { left: r + gap + textW, right: r }; // text always LEFT of circle
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
      var gap = isRoot ? 16 : 12;
      var textX = cx - r - gap;

      var label = svgCreate("text", {
        x: textX,
        y: cy,
        "dominant-baseline": "central",
        "text-anchor": "start",
        direction: "rtl",
        "font-size": isRoot ? 15 : 13,
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
          "font-size": 9,
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
    var scale = Math.min(W / bw, H / bh) * 0.88;
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

    // Hint with auto-fade
    var hint = document.createElement("div");
    hint.className = "mindmap-hint";
    hint.textContent = "\u0627\u0633\u062D\u0628 \u0644\u0644\u062A\u062D\u0631\u064A\u0643 \u00B7 \u0639\u062C\u0644\u0629 \u0627\u0644\u0641\u0623\u0631\u0629 \u0644\u0644\u062A\u0643\u0628\u064A\u0631 \u00B7 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0639\u0642\u062F\u0629 \u0644\u0644\u062A\u0641\u0627\u0635\u064A\u0644";
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
  }

  document.addEventListener("DOMContentLoaded", initMindmap);
})();
