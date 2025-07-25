---
layout: post
title: "ما هو بروتوكول سياق النموذج (MCP)؟ ولمَ الحديث عنه فجأة وبكثرة؟"
date: 2024-05-23 10:00:00 +0300
lang: ar
categories: [ذكاء اصطناعي, بروتوكولات تقنية]
tags: [MCP, Anthropic, نماذج لغوية كبيرة, وكلاء الذكاء الاصطناعي]
translation: true
original_author: "Kseniase Ksenia Se"
original_link: "https://huggingface.co/blog/Kseniase/mcp"
---


[Kseniase Ksenia Se](https://huggingface.co/Kseniase)

## في هذا المقال

- [كل ما تريد معرفته عن بروتوكول سياق النموذج](#everything-you-need-to-know-about-model-context-protocol)
- [لمَ كل هذه الضجة حول MCP الآن (وليس في نوفمبر/تشرين الثاني الماضي)؟](#why-is-mcp-making-waves-now-and-not-last-november)
- [إذًا، ما هو بروتوكول MCP وكيف يعمل؟](#so-what-is-mcp-and-how-does-it-work)
- [قبل MCP، كيف كانت أنظمة الذكاء الاصطناعي تتعامل مع السياق والوصول إلى الأدوات؟](#before-mcp-how-were-ai-systems-handling-context-and-tool-access)
- [هل يُعدّ MCP حلًا سحريًا لجميع المشكلات؟](#is-mcp-a-silver-bullet-and-solve-it-all)
- [دور MCP في تنسيق الوكلاء ومكانته في مسار العمل الوكيلي](#mcp-in-agentic-orchestration-and-its-place-in-the-agentic-workflow)
- [إمكانيات جديدة يتيحها بروتوكول MCP](#new-possibilities-unlocked-by-mcp)
- [أفكار ختامية](#concluding-thoughts)
- [مصادر للتعمق أكثر:](#resources-to-dive-deeper)

_«حتى النماذج الأكثر تطورًا تظل حبيسة عزلتها عن البيانات، ومحاصَرة خلف جُدران المعلومات والأنظمة الموروثة.»_ — أنثروبيك، تعليقًا على أهمية تكامل السياق

تتمتع نماذج اللغة الكبيرة (LLMs) اليوم بذكاء مذهل نظريًا، لكنها تعاني ما إن تحتاج إلى معلومات خارج نطاق بيانات تدريبها الثابتة. لكي تكون وكلاء الذكاء الاصطناعي مفيدة حقًا، لا بد لها من الوصول إلى السياق المناسب في الوقت المناسب — سواء كان ذلك ملفاتك أو قواعد المعرفة أو الأدوات المتاحة — بل وحتى اتخاذ إجراءات مثل تحديث مستند أو إرسال بريد إلكتروني استنادًا إلى هذا السياق. تاريخيًا، كان ربط نماذج الذكاء الاصطناعي بكل هذه المصادر الخارجية عملية فوضوية وتعتمد على حلول مخصصة لكل حالة. جعل هذا النهج عمليات التكامل "المرقّعة" هشة وصعبة التوسيع.

لتبسيط هذه العملية، ابتكرت شركة Anthropic بروتوكول سياق النموذج (MCP) — وهو معيار مفتوح مصمم ليكون جسرًا يربط مساعدي الذكاء الاصطناعي بعالم البيانات والأدوات، ويتيح توصيل العديد من مصادر السياق المختلفة. أُعلِن عنه في نوفمبر/تشرين الثاني 2024، وكان رد الفعل حينها فاترًا إلى حد ما. لكن بروتوكول MCP يشهد الآن رواجًا كبيرًا، وقد تجاوز بالفعل LangChain، ويُتوقع أن يتفوق على OpenAPI وCrewAI قريبًا جدًا. يتّحد كبار اللاعبين في مجال الذكاء الاصطناعي ومجتمعات المصادر المفتوحة لدعم MCP، إذ يرون فيه تقنية قد تُحدث تحولًا جذريًا في بناء أنظمة الذكاء الاصطناعي الوكيلة (agentic AI systems). لمَ كل هذا الاهتمام؟

[![image/png](https://cdn-uploads.huggingface.co/production/uploads/64838b28c235ef76b63e4999/UlARrzn0TPvpZl04UqC9l.png)](https://cdn-uploads.huggingface.co/production/uploads/64838b28c235ef76b63e4999/UlARrzn0TPvpZl04UqC9l.png)

في هذا المقال، سنتناول بالتفصيل بروتوكول MCP: لمَ يحظى بكل هذا الاهتمام الآن، وكيف يُمكّن هذا البروتوكول التحول نحو ذكاء اصطناعي أكثر تكاملًا ووعيًا بالسياق، وما مكانته في مسارات العمل الوكيلة (agentic workflows)، وما هي التفاصيل الدقيقة التي ينبغي للمطورين والباحثين ومهندسي الذكاء الاصطناعي والمديرين التنفيذيين في قطاع التقنية الإلمام بها. كما سنستكشف بعض التطبيقات المبتكرة لبروتوكول MCP التي لم يجرّبها سوى قلة. يُعدّ هذا المقال دليلًا تمهيديًا ممتازًا، ولكنه مفيد أيضًا لمن سبق لهم تجربة MCP ويرغبون في معرفة المزيد. فلنبدأ الغوص في التفاصيل!

---

**🔳 أصبح Turing Post مقيمًا في 🤗 Hugging Face -> [انقر هنا](https://huggingface.co/Kseniase) للمتابعة!**

---

**محتويات مقال اليوم:**

- [لمَ كل هذه الضجة حول MCP الآن (وليس في نوفمبر/تشرين الثاني الماضي)؟](https://huggingface.co/blog/Kseniase/mcp#why-is-mcp-making-waves-now-and-not-last-november)
- [إذًا، ما هو بروتوكول MCP وكيف يعمل؟](https://huggingface.co/blog/Kseniase/mcp#so-what-is-mcp-and-how-does-it-work)
- [نظرة عامة فنية على MCP](https://huggingface.co/blog/Kseniase/mcp#technical-overview-of-mcp)
- [كيف أبدأ فعليًا باستخدام MCP؟](https://huggingface.co/blog/Kseniase/mcp#how-do-i-actually-get-started-with-mcp)
- [قبل MCP، كيف كانت أنظمة الذكاء الاصطناعي تتعامل مع السياق والوصول إلى الأدوات؟](https://huggingface.co/blog/Kseniase/mcp#before-mcp-how-were-ai-systems-handling-context-and-tool-access)
- [هل يُعدّ MCP حلًا سحريًا لجميع المشكلات؟](https://huggingface.co/blog/Kseniase/mcp#is-mcp-a-silver-bullet-and-solve-it-all)
- [دور MCP في تنسيق الوكلاء ومكانته في مسار العمل الوكيلي](https://huggingface.co/blog/Kseniase/mcp#mcp-in-agentic-orchestration-and-its-place-in-the-agentic-workflow)
- [إمكانيات جديدة يتيحها بروتوكول MCP](https://huggingface.co/blog/Kseniase/mcp#new-possibilities-unlocked-by-mcp)
- [أفكار ختامية](https://huggingface.co/blog/Kseniase/mcp#concluding-thoughts)
- [مصادر للتعمق أكثر](https://huggingface.co/blog/Kseniase/mcp#resources-to-dive-deeper)

## لمَ كل هذه الضجة حول MCP الآن (وليس في نوفمبر/تشرين الثاني الماضي)؟ {#why-is-mcp-making-waves-now-and-not-last-november}

أعلنت شركة Anthropic عن بروتوكول MCP وجعلته مفتوح المصدر لأول مرة في أواخر نوفمبر/تشرين الثاني 2024. كانت الفكرة مثيرة للاهتمام آنذاك، لكنها لم تحظَ باهتمام كبير أو تؤخذ على محمل الجد على نطاق واسع. ولكن مع بداية عام 2025، بدأ MCP يتردد بقوة في أوساط مجتمع الذكاء الاصطناعي. وهناك أسباب رئيسية عدة وراء هذا الاهتمام المتزايد مؤخرًا:

- **حلّ لمشكلة التكامل:** أصبحت مفاهيم "وكلاء الذكاء الاصطناعي" و"مسارات العمل الوكيلة" رائجة جدًا في 2023-2024، لكنها ظلت تعاني من نقطة ضعف أساسية: صعوبة دمج هذه الوكلاء مع أنظمة وبيانات الأعمال الواقعية. في البداية، انصبّ الاهتمام الأكبر على قدرات النماذج وتقنيات التلقين (prompt techniques)، وليس على التكامل. يأتي MCP ليعالج هذه الفجوة مباشرةً بتحديده "كيفية ربط مصادر البيانات القائمة" (مثل أنظمة الملفات وقواعد البيانات وواجهات برمجة التطبيقات) بمسارات عمل الذكاء الاصطناعي. ومع استيعاب المطورين لهذه الفكرة، بدأ يُنظر إلى MCP باعتباره الحلقة المفقودة اللازمة لبناء وكلاء ذكاء اصطناعي جادين وجاهزين للبيئات الإنتاجية. (وهذه إحدى الأفكار المطروحة في مؤتمر HumanX: ركزنا في السنوات الأخيرة بشكل أساسي على بناء نماذج ذكاء اصطناعي فردية، كلٌّ منها متخصص في مهام معينة. ولكن مع تزايد التعقيد والمتطلبات، نشهد تحولًا نحو الأنظمة المتكاملة — وهي عبارة عن تنسيق متناغم بين نماذج متخصصة متعددة ومكونات برمجية وواجهات برمجة تطبيقات ومصادر بيانات وواجهات تعمل معًا بتناسق).
- **المجتمع والتبنّي:** في غضون أشهر قليلة، تحوّل MCP من مجرد مفهوم إلى منظومة متنامية. كان من بين أوائل المتبنّين شركات مثل Block (Square) وApollo وZed وReplit وCodeium وSourcegraph، التي بدأت بدمج MCP لتحسين منصاتها. وبحلول عام 2025، شهدت هذه المنظومة نموًا هائلًا — ففي فبراير/شباط، كان هناك أكثر من 1000 خادم MCP (موصل) متاح قد بناه المجتمع. من الواضح أن MCP قد لاقى صدى واسعًا مع توجّه الصناعة نحو ذكاء اصطناعي أكثر تكاملًا ووعيًا بالسياق. وهذا "التأثير الشبكي" (network effect) يزيد من جاذبية MCP: فكلما زاد عدد الأدوات المتاحة عبر MCP، زادت فائدة اعتماد هذا المعيار.
- **زخم نحو اعتباره معيارًا فعليًا (De Facto Standard):** بخلاف كونه مجرد حزمة تطوير برمجيات (SDK) مملوكة أخرى أو إطار عمل مخصص لمشروع واحد، فإن MCP مفتوح المصدر ومستقل عن النموذج المُستخدم، كما أنه مدعوم من قِبَل لاعب رئيسي في مجال الذكاء الاصطناعي. وهذا يعني أن أي نموذج ذكاء اصطناعي (مثل Claude، أو GPT-4، أو نماذج اللغة الكبيرة مفتوحة المصدر) يمكنه استخدام MCP، وأن أي مطور أو شركة يمكنه إنشاء تكامل MCP دون الحاجة إلى إذن. يرى الكثيرون في المجتمع الآن أن MCP هو المرشح الأوفر حظًا للفوز في سباق توحيد طريقة اتصال أنظمة الذكاء الاصطناعي بالبيانات الخارجية (تمامًا كما أصبحت معايير مثل USB أو HTTP أو ODBC معايير شائعة كلٌّ في مجاله).
- **التطور السريع والتوعية:** لم تكتفِ Anthropic بإطلاق MCP وتركه؛ بل عملت بنشاط على تحسينه وتوعية المطورين بشأنه. فخلال قمة الذكاء الاصطناعي الأخيرة، قدّم ماهيش مورثي من Anthropic ورشة عمل لاقت انتشارًا واسعًا، مما سرّع من وتيرة تبنّي MCP. (تذكير: جميع الروابط لمصادر إضافية للتعلم مدرجة في نهاية المقال).

[![image/png](https://cdn-uploads.huggingface.co/production/uploads/64838b28c235ef76b63e4999/1Cap6UcizaqUIZZ4pANsT.png)](https://cdn-uploads.huggingface.co/production/uploads/64838b28c235ef76b63e4999/1Cap6UcizaqUIZZ4pANsT.png)

## إذًا، ما هو بروتوكول MCP وكيف يعمل؟ {#so-what-is-mcp-and-how-does-it-work}

يضع بروتوكول MCP قواعد واضحة لكيفية عثور الذكاء الاصطناعي على الأدوات الخارجية والاتصال بها واستخدامها — سواء كان ذلك استعلامًا عن قاعدة بيانات أو تنفيذ أمر ما. وهذا يتيح للنماذج تجاوز حدود بيانات تدريبها، مما يزيد من مرونتها ووعيها بالعالم المحيط.

**نظرة عامة فنية على MCP:**

[![image/png](https://cdn-uploads.huggingface.co/production/uploads/64838b28c235ef76b63e4999/DhpNOh6i8MO10QLQSzSBE.png)](https://cdn-uploads.huggingface.co/production/uploads/64838b28c235ef76b63e4999/DhpNOh6i8MO10QLQSzSBE.png)

[![image/png](https://cdn-uploads.huggingface.co/production/uploads/64838b28c235ef76b63e4999/zphXNImQZS3A_5Dh5GCxv.png)](https://cdn-uploads.huggingface.co/production/uploads/64838b28c235ef76b63e4999/zphXNImQZS3A_5Dh5GCxv.png)

إحدى الميزات البارزة هي قدرة MCP على **الاكتشاف الديناميكي** — حيث تكتشف وكلاء الذكاء الاصطناعي تلقائيًا خوادم MCP المتاحة وقدراتها، دون الحاجة إلى عمليات تكامل مبرمجة مسبقًا (hard-coded). على سبيل المثال، إذا قمت بتشغيل خادم MCP جديد (لأداة مثل نظام إدارة علاقات العملاء CRM)، يمكن للوكلاء التعرف عليه واستخدامه فورًا عبر واجهة برمجة تطبيقات موحدة، مما يوفر مرونة تفوق ما تتيحه الأساليب التقليدية.

**كيف أبدأ فعليًا باستخدام MCP؟**

أفضل نقطة انطلاق هي وثائق MCP الرسمية والمستودع الخاص به على GitHub. أتاحت Anthropic المواصفات كمصدر مفتوح وقدمت حزم تطوير البرمجيات (SDKs) بلغات مثل Python وحاليًا حتى Java. تتضمن الخطوات عادةً ما يلي:

- **شغّل أو ثبّت خادم MCP للأداة أو مصدر البيانات الذي تحتاجه.** لدى Anthropic مستودع مفتوح المصدر يحتوي على خوادم جاهزة للأنظمة الشائعة (مثل Google Drive، Slack، Git، قواعد البيانات، وغيرها). يمكنك تثبيت هذه الخوادم وضبط إعداداتها (غالبًا لا يتطلب الأمر سوى تنفيذ أمر برمجي مع توفير بيانات الاعتماد أو المفاتيح الخاصة بك).
- **أعِدّ عميل MCP في تطبيق الذكاء الاصطناعي الخاص بك.** إذا كنت تستخدم تطبيق Claude، يمكنك إضافة الخادم من خلال واجهة المستخدم. أما إذا كنت تبرمج وكيلك الخاص، فاستخدم حزمة MCP SDK للاتصال بالخادم (مع تزويده بالعنوان والمنفذ).
- **بمجرد تمكين خدمات MCP في عميلك، سيتعرّف العميل على الوظائف الإضافية المتاحة**: مثل الأدوات والموارد وقوالب التلقين الإضافية.
- **استدعِ الإجراءات وكرّر حسب الحاجة.** يمكن للنموذج/الوكيل الآن استدعاء إجراءات أدوات MCP عند اللزوم. تأكد من مراقبة السجلات للتحقق من أن الاستدعاءات للخوادم تتم بشكل صحيح. ستلاحظ وصول الطلبات إلى خادم MCP وعودة الاستجابات منه.

للبدء بسرعة، توصي Anthropic بتجربة تكامل Claude Desktop (إذا كان متاحًا لك) أو تشغيل الخوادم التجريبية (example servers) واستخدام دليل البدء السريع الذي توفره. المجتمع نشط جدًا أيضًا، وهناك قائمة متزايدة بسرعة من خوادم MCP المتاحة. تشمل بعض الخوادم الشائعة موصلات لخدمات Google (Drive، Gmail، Calendar)، وSlack (للوصول إلى المحادثات والملفات)، وGitHub/Git (لمستودعات الشيفرة البرمجية)، وقواعد بيانات مثل Postgres، ومتصفحات الويب أو Puppeteer (لتصفح صفحات الويب)، وغيرها الكثير. يمكنك العثور على العديد من هذه الخوادم في أدلة المجتمع (قام بعض المطورين بإنشاء مواقع لفهرستها). كما يستضيف مستودع MCP الرسمي على GitHub مجموعة من تطبيقات الموصلات كنماذج للبدء. وإذا كانت لديك أداة متخصصة لا يوجد لها موصل جاهز، فيمكنك بناء خادم MCP الخاص بك باستخدام حزمة SDK — وغالبًا ما يكون مجرد غلاف بسيط (wrapper) حول واجهة برمجة التطبيقات (API) الخاصة بتلك الأداة، يكشف عن وظائفها بتنسيق MCP.

_نتوجه بالشكر إلى Will Schenk لتوضيحه بعض النقاط حول MCP وكيفية البدء باستخدامه. وقد شارك هذا [الشرح العملي السريع](https://thefocus.ai/posts/exposing-services-with-mcp/) الذي يستخدم خدمة مراقبة سيارات Tesla من Tezlab ليُظهر آلية عمل MCP._

[![image/png](https://cdn-uploads.huggingface.co/production/uploads/64838b28c235ef76b63e4999/qSF_Rp3iOrJEpS-yqArwF.png)](https://www.youtube.com/watch?v=O3AZ0beYHFE)

## قبل MCP، كيف كانت أنظمة الذكاء الاصطناعي تتعامل مع السياق والوصول إلى الأدوات؟ {#before-mcp-how-were-ai-systems-handling-context-and-tool-access}

لنلقِ نظرة سريعة على الطرق التقليدية التي كانت تُستخدم لمنح الذكاء الاصطناعي قدرة الوصول إلى المعرفة الخارجية أو تنفيذ الإجراءات، ونرى كيف يختلف MCP عنها:

- **تكاملات API المخصصة (موصلات لكل حالة على حدة):** كانت الطريقة الأكثر شيوعًا هي كتابة شيفرة برمجية مخصصة أو استخدام حزم SDK لكل خدمة على حدة. على سبيل المثال، إذا أردت لوكيل الذكاء الاصطناعي الخاص بك الوصول إلى Google Drive وقاعدة بيانات SQL، لكان عليك دمج واجهة برمجة تطبيقات Google وبرنامج تشغيل (driver) قاعدة البيانات بشكل منفصل، ولكل منهما أسلوب المصادقة الخاص به، وتنسيق بياناته، وخصوصياته. أمر مزعج حقًا! في المقابل، يوفر MCP واجهة موحدة (بروتوكولًا) يمكنها التعامل مع العديد من الأدوات، كما يمكن إضافة خوادم MCP جديدة دون الحاجة لتعديل العميل.
- **ملحقات نماذج اللغة (مثل ملحقات OpenAI):** ظهر نهج آخر في عام 2023 تمثّل في تزويد النموذج بمواصفات ملحق (plugin) موحدة (غالبًا ما تكون مخطط OpenAPI)، بحيث يمكن للنموذج استدعاء واجهات برمجة التطبيقات الخارجية بطريقة مُتحكَّم بها (مثل نظام ملحقات ChatGPT). ورغم تشابه هذا المفهوم مع MCP (من حيث توحيد الوصول إلى الأدوات)، إلا أن هذه الملحقات كانت مملوكة (proprietary) ومحدودة النطاق — إذ كان لا يزال يتعين بناء كل ملحق واستضافته بشكل فردي، ولم يكن بالإمكان استخدامها إلا من خلال منصات معينة (مثل ChatGPT أو Bing Chat). كما ركزت الملحقات غالبًا على استرجاع البيانات باتجاه واحد (حيث يستدعي النموذج واجهة API ويحصل على معلومات) بدلًا من الحفاظ على جلسة تفاعلية مستمرة. يتميز MCP بكونه مفتوح المصدر وعالميًا (يمكن لأي شخص تنفيذه، وهو غير مرتبط بمزود ذكاء اصطناعي واحد)، وبدعمه لتفاعلات ثنائية الاتجاه وغنية بالبيانات. الأمر أشبه بحوار بين الذكاء الاصطناعي والأدوات، بينما كانت الملحقات غالبًا أشبه بعمليات سؤال وجواب منفصلة وعديمة الحالة (stateless).
- **استخدام الأدوات عبر أطر العمل (مثل أدوات LangChain والوكلاء):** ساهمت مكتبات تنسيق الوكلاء (agent orchestration libraries) مثل LangChain في نشر فكرة تزويد النماذج بـ"أدوات" (وظائف برمجية) مصحوبة بأوصاف. على سبيل المثال، قد يكون لديك أداة `search()` أو أداة `calculate()`، ويقرر الوكيل (بمساعدة نموذج اللغة الكبير) متى يستدعيها. ورغم فعالية هذا النهج، إلا أن كل أداة كانت لا تزال تتطلب تنفيذًا برمجيًا مخصصًا في الخلفية — فقد نمت مكتبة LangChain لتشمل أكثر من 500 أداة منفذة بواجهة متسقة، ومع ذلك كان لا يزال على المطورين ربط هذه الأدوات بأنظمتهم أو التأكد من ملاءمتها لاحتياجاتهم. يمكن النظر إلى MCP هنا كعنصر مكمل، إذ يوفر واجهة موحدة لتنفيذ هذه الأدوات. في الواقع، يمكنك اعتبار خوادم MCP بمثابة مكتبة من الأدوات الجاهزة التي يمكن لأي وكيل استخدامها. يكمن الاختلاف في موضع التوحيد القياسي: فقد أنشأت LangChain معيارًا موجهًا للمطور (واجهة فئة `Tool` الخاصة بها) لدمج الأدوات في شيفرة الوكيل البرمجية. أما MCP فينشئ معيارًا موجهًا للنموذج — حيث يستطيع وكيل الذكاء الاصطناعي قيد التشغيل اكتشاف واستخدام أي أداة معرّفة بواسطة MCP في وقت التشغيل (runtime). وهذا يعني أنه حتى لو لم تخصص شيفرة الوكيل البرمجية لأداة معينة، يمكن للنموذج دمجها مباشرة. عمليًا، تتقارب هذه الأفكار: فعلى سبيل المثال، عندما لاحظ فريق LangChain الانتشار الواسع لـ MCP، قاموا بتوفير محوّل (adapter) يتيح التعامل مع جميع خوادم MCP (الموصلات) كأدوات LangChain بسهولة. وبالتالي، يمكن لوكيل مبني باستخدام LangChain أو أطر عمل أخرى استدعاء أدوات MCP تمامًا مثل أي أداة أخرى، مستفيدًا من منظومة MCP المتنامية.
- **التوليد المعزز بالاسترجاع (RAG) وقواعد بيانات المتجهات:** من الطرق الشائعة لتزويد نماذج اللغة الكبيرة بالسياق استخدامُ "مسترجع" (retriever) يبحث في قاعدة معرفية (تحتوي على مستندات أو تضمينات embeddings) ثم "يحقن" أفضل النتائج في التلقين (prompt). يعالج هذا الأسلوب مشكلة محدودية المعرفة لدى النماذج (knowledge cutoff) أو ذاكرتها المحدودة. لكن RAG يتعامل عادةً مع مقتطفات نصية ثابتة ولا يتيح للنموذج بطبيعته تنفيذ إجراءات أو استعلامات تتجاوز ما هو مفهرس في قاعدة المعرفة. يمكن لبروتوكول MCP في الواقع أن يعمل جنبًا إلى جنب مع RAG؛ فعلى سبيل المثال، يمكن لخادم MCP أن يتكامل مع قاعدة بيانات متجهة أو محرك بحث، مما يسمح للنموذج بإصدار استعلامات بحث كـ"أداة" بدلًا من الاعتماد ضمنيًا على عملية الاسترجاع مع كل تلقين. يمكن القول إن MCP يمثل آلية أعمّ: فبينما يوفر RAG سياقًا "سلبيًا"، يتيح MCP للنموذج جلب السياق أو التصرف بناءً عليه بشكل "نشط" عبر قنوات محددة. في السيناريوهات التي تتطلب بيانات محدّثة أو تفاعلية (مثل الاستعلام عن قاعدة بيانات حية أو نشر تحديث)، يتجاوز MCP مجرد استرجاع النصوص، إذ يمكنه تفعيل عمليات (trigger operations).

## هل يُعدّ MCP حلًا سحريًا لجميع المشكلات؟ {#is-mcp-a-silver-bullet-and-solve-it-all}

بالطبع، لا يُعدّ MCP حلًا سحريًا، بل هو طبقة تكامل (integration layer) عملية جدًا. ولكن كأي تقنية ناشئة، فإنه يأتي مصحوبًا بمجموعة من التعقيدات والتحديات التي يجب على المطورين والمؤسسات أخذها في الحسبان قبل اعتماده على نطاق واسع. أحد أبرز هذه التحديات هو **العبء الإضافي الناتج عن إدارة خوادم أدوات متعددة**. فقد يكون تشغيل هذه الخوادم المحلية وصيانتها والحفاظ على الاتصال بها أمرًا مرهقًا، خاصة في بيئات الإنتاج حيث تُعدّ الجاهزية (uptime) والأمان وقابلية التوسع (scalability) عوامل بالغة الأهمية. صُمّم تطبيق MCP الأولي للاستخدام المحلي وعلى أجهزة سطح المكتب، مما يثير تساؤلات حول مدى ملاءمته للبنى التحتية السحابية (cloud-based architectures) وسيناريوهات الاستخدام متعدد المستخدمين. وقد اقترح المطورون جعل MCP أكثر استقلالية عن الحالة (stateless) وقابلية للتكيف مع البيئات الموزعة، لكن هذا لا يزال يمثل تحديًا قائمًا.
تكمن مشكلة أخرى في **مدى سهولة استخدام الأدوات**. فمجرد توسيع MCP لمجموعة أدوات نموذج الذكاء الاصطناعي لا يعني بالضرورة أن النموذج سيستخدم هذه الأدوات بفعالية. وقد أظهرت أطر العمل السابقة القائمة على الوكلاء أن نماذج الذكاء الاصطناعي قد تواجه صعوبة في اختيار الأداة المناسبة وتنفيذها. يحاول MCP التخفيف من هذه المشكلة عبر توفير أوصاف ومواصفات مهيكلة للأدوات، لكن النجاح يظل مرهونًا بجودة هذه الأوصاف وقدرة الذكاء الاصطناعي على تفسيرها بشكل صحيح. ويشير النهج المجتمعي (community-driven)، كما أوضح مؤسس LangChain هاريسون تشيس، إلى أن الأدوات الموثقة جيدًا يمكن أن تعزز سهولة الاستخدام، ولكن هذا الجانب لا يزال بحاجة إلى تحسين مستمر.
بالإضافة إلى تحديات التنفيذ، يُعدّ **مستوى نضج بروتوكول MCP عاملًا آخر يجب أخذه بالاعتبار**. فباعتباره تقنية جديدة نسبيًا، فإنه يخضع لتغييرات سريعة وتطور مستمر في المعايير. قد يؤدي ذلك إلى "تغييرات كاسرة للتوافق" (breaking changes)، مما يتطلب تحديثات متكررة للخوادم والعملاء. ورغم أن المفهوم الأساسي لـ MCP يبدو مستقرًا، يجب على المطورين توقع الحاجة إلى ترقيات للإصدارات ومواكبة أفضل الممارسات المتغيرة والاستعداد لذلك.
**يُعدّ التوافق عاملًا مقيدًا آخر.** حاليًا، يحظى MCP بدعم أساسي (first-class support) داخل منظومة Anthropic (مثل Claude)، لكن مدى تبنيه على نطاق أوسع لا يزال غير مؤكد. قد لا يدعم مقدمو خدمات الذكاء الاصطناعي الآخرون بروتوكول MCP بشكل أصيل (natively)، مما يتطلب استخدام محوّلات إضافية أو عمليات تكامل مخصصة. وإلى أن يحظى MCP بقبول أوسع عبر مختلف منصات الذكاء الاصطناعي، ستظل فائدته محدودة إلى حد ما.
- **قد يكون MCP خيارًا مبالغًا فيه (overkill) للتطبيقات البسيطة.** فإذا كان نموذج الذكاء الاصطناعي يحتاج فقط للوصول إلى واجهة أو اثنتين من واجهات برمجة التطبيقات (APIs) البسيطة، فقد تكون استدعاءات API المباشرة حلًا أكثر كفاءة من تطبيق MCP. كما أن منحنى التعلم المرتبط بنظام المراسلة الخاص بـ MCP وإعداد الخادم يعني ضرورة الموازنة بين فوائده والتعقيد الذي يضيفه.
- **يمثل الأمان والمراقبة أيضًا تحديات قائمة.** فنظرًا لأن MCP يعمل كوسيط، فإنه يتطلب آليات مصادقة قوية وضوابط صلاحيات صارمة لمنع الوصول غير المصرح به. وقد ظهرت مبادرات مفتوحة المصدر مثل MCP Guardian لمعالجة هذه المخاوف عبر تسجيل الطلبات وفرض السياسات، إلا أن تأمين MCP بشكل كامل في بيئات الشركات الكبرى لا يزال عملًا قيد التطوير.

بشكل عام، **لا يُشكّل أي من هذه القيود عائقًا مطلقًا، ولكن من الحكمة البدء بتطبيقات تجريبية أو غير حساسة للتعرف على البروتوكول عن كثب.** ومن أفضل ميزات MCP هو مجتمعه النشط؛ فلكونه مفتوح المصدر، يمكن مناقشة المشكلات التي تواجهها ومعالجتها بشكل جماعي.

## دور MCP في تنسيق الوكلاء ومكانته في مسار العمل الوكيلي {#mcp-in-agentic-orchestration-and-its-place-in-the-agentic-workflow}

في مقالات سابقة، استكشفنا المكونات الأساسية للوكلاء المستقلين (autonomous agents): التنميط (تحديد الهوية السياق)، والمعرفة، والذاكرة، والاستدلال/التخطيط، والتأمل (reflection)، والعمل (action). يحتاج الوكيل إلى مراقبة بيئته وفهمها (الملف الشخصي/المعرفة)، وتذكر التفاعلات السابقة (الذاكرة)، وتخطيط خطواته (الاستدلال)، واتخاذ الإجراءات (تنفيذ استدعاءات الأدوات أو إصدار المخرجات)، ثم التأمل والتعلم. فأين يندرج دور MCP في كل هذا؟

لا يُعدّ MCP بحد ذاته "إطار عمل للوكلاء" (agent framework)؛ بل هو بمثابة طبقة تكامل موحدة لهم. يتمحور دور MCP حول **مرحلة العمل (Action)** — وتحديدًا، منح الوكلاء طريقة موحدة لتنفيذ الإجراءات التي تتضمن بيانات أو أدوات خارجية. إنه يوفر البنية الأساسية (أو "الأنابيب" plumbing) التي تربط وكيل الذكاء الاصطناعي بالعالم الخارجي بطريقة آمنة ومنظمة. فبدون MCP (أو آلية مشابهة)، في كل مرة يحتاج فيها الوكيل إلى فعل شيء في العالم الخارجي — سواء جلب ملف، أو الاستعلام عن قاعدة بيانات، أو استدعاء واجهة API — سيضطر المطورون إلى بناء تكامل مخصص أو استخدام حلول مؤقتة لكل حالة. وهذا أشبه ببناء روبوت ثم الاضطرار إلى تصميم كل إصبع بشكل خاص ليمسك بأشياء مختلفة — عملية مضنية وغير قابلة للتوسع.

من المهم التأكيد مجددًا على أن MCP ليس محرك تنسيق (orchestration engine) أو "عقل" الوكيل بحد ذاته، بل هو طبقة تكامل ضمن البنية الوكيلية (agentic architecture). إنه يكمّل أدوات تنسيق الوكلاء مثل LangChain، أو LangGraph، أو CrewAI، أو LlamaIndex، حيث يعمل بمثابة "صندوق أدوات" موحد يمكن لوكلاء الذكاء الاصطناعي من خلاله استدعاء الإجراءات الخارجية. فبدلًا من أن يحلّ محل عملية التنسيق — التي تحدد متى ولماذا يستخدم الوكيل أداة ما — يحدد MCP كيفية استدعاء هذه الأدوات وتبادل المعلومات.

يمكن تشبيهه ببوابة API موحدة للوكلاء، مما يقلل تعقيد التكامل من مشكلة تتطلب (N × M) اتصالًا (لكل وكيل مع كل أداة) إلى مشكلة تتطلب (N + M) اتصالًا فقط (كل وكيل يتصل بالبوابة، وكل أداة تتصل بالبوابة)، وذلك عبر إتاحة التوافق الشامل بين العملاء (الوكلاء) والخوادم (الأدوات). وفي المحصلة، يبسّط MCP عملية دمج الوظائف الخارجية، مما يجعل الوكلاء أكثر مرونة وقدرة على التكيف وأقدر على أداء مهام معقدة ضمن سياقات متنوعة.

## إمكانيات جديدة يتيحها بروتوكول MCP {#new-possibilities-unlocked-by-mcp}

لا يزال بروتوكول MCP حديثًا، وما زلنا في بداية استكشاف إمكاناته الكاملة. تبدو الموجة الأولى من حالات الاستخدام واضحة: ربط بيانات الشركات بمساعدي المحادثة (chat assistants) أو تعزيز قدرات وكلاء البرمجة عبر منحهم إمكانية الوصول إلى مستودعات الشيفرة. لكن بعض التطبيقات الناشئة قد ترتقي بوكلاء الذكاء الاصطناعي إلى مستوى جديد كليًا.

- **مسارات عمل متعددة الخطوات وعبر الأنظمة:** غالبًا ما تحتاج الأنظمة الوكيلية إلى التنسيق بين منصات مختلفة. لنفترض مثلًا أن وكيل ذكاء اصطناعي يخطط لفعالية ما: فهو يتحقق من تقويمك، ويحجز مكانًا، ويرسل دعوات بالبريد الإلكتروني للضيوف، ويرتب إجراءات السفر، ويحدّث جدول الميزانية. حاليًا، يتطلب هذا ربط واجهات API متعددة يدويًا. أما مع MCP، فيمكن تنفيذ كل هذه الإجراءات عبر واجهة موحدة. حيث يستدعي الوكيل سلسلة من أدوات MCP (أداة لكل مهمة)، مع الحفاظ على سياق مشترك بينها — دون فقدان تسلسل العمل أو الحاجة إلى عمليات تكامل مخصصة.
- **وكلاء يفهمون بيئتهم (بما في ذلك الروبوتات):** بالإضافة إلى إتاحة الوصول للأدوات، يمكن لـ MCP تمكين وكلاء الذكاء الاصطناعي المدمجين في البيئات الذكية — سواء كان ذلك في منزل ذكي أو ضمن نظام تشغيل. يمكن لمساعد الذكاء الاصطناعي التفاعل مع المستشعرات (sensors) أو أجهزة إنترنت الأشياء (IoT) أو وظائف نظام التشغيل عبر خوادم MCP موحدة. وبدلًا من العمل بمعزل عن محيطه، يكتسب الذكاء الاصطناعي وعيًا بالبيئة في الوقت الفعلي، مما يتيح له تقديم مساعدة أكثر طبيعية واستباقية.
- **الوكلاء المتعاونون (مجتمعات الوكلاء Agent Societies):** — _وهذه نقطة تثير حماسي بشكل خاص_ — يمكن أن يعمل MCP أيضًا بمثابة مساحة عمل مشتركة للأنظمة متعددة الوكلاء (multi-agent systems). حيث يمكن لوكلاء الذكاء الاصطناعي المتخصصين — وكيل للبحث، وآخر للتخطيط، وثالث للتنفيذ — استخدام MCP لتبادل المعلومات وتنسيق المهام فيما بينهم بشكل ديناميكي. فمع MCP، لا يحتاج كل وكيل إلى تكاملات مباشرة مع الآخرين؛ بل يكفي أن يصلوا جميعًا إلى مجموعة أدوات مشتركة.
- **مساعدو ذكاء اصطناعي شخصيون بتكامل عميق:** قد يتيح MCP للمستخدمين ضبط إعدادات الذكاء الاصطناعي الخاص بهم ليتفاعل مع بياناتهم وتطبيقاتهم الشخصية بأمان. حيث يمكن لخادم MCP محلي أن يمنح وكيل الذكاء الاصطناعي صلاحية الوصول إلى رسائل البريد الإلكتروني والملاحظات والأجهزة الذكية دون كشف البيانات الحساسة لأطراف خارجية. وهذا قد يمهد الطريق لإنشاء مساعد ذكاء اصطناعي شخصي فائق التخصيص دون الاعتماد على الخدمات السحابية.
- **الحوكمة والأمن في المؤسسات:** بالنسبة للشركات، يوحد MCP طريقة وصول الذكاء الاصطناعي إلى الأدوات الداخلية، مما يقلل من عبء التكامل. كما أنه يتيح تطبيق الحوكمة (governance): حيث يمكن تسجيل تفاعلات الذكاء الاصطناعي ومراقبتها والتحكم فيها عبر طبقة إشرافية، مما يمنع الإجراءات غير المقصودة مع الحفاظ على الكفاءة.

هذه مجرد لمحات أولية عن إمكانيات MCP الهائلة. فمن خلال تمكين التفاعلات المرنة والواعية بالسياق ومتعددة الخطوات، فإنه يقرّب وكلاء الذكاء الاصطناعي خطوة أخرى نحو التنفيذ الحقيقي لمسارات العمل المستقلة.

## أفكار ختامية {#concluding-thoughts}

ينضج بروتوكول MCP بسرعة ليصبح معيارًا قويًا يحوّل الذكاء الاصطناعي من مجرد "عقل" معزول إلى "منفّذ" متعدد القدرات. وعبر تبسيط طريقة اتصال الوكلاء بالأنظمة الخارجية، فإنه يمهّد الطريق أمام مسارات عمل للذكاء الاصطناعي تكون أكثر قدرة وتفاعلية وسهولة في الاستخدام.

**الميزات الرئيسية القادمة** (بناءً على ورشة عمل ماهيش مورثي من Anthropic)

**الخوادم البعيدة (Remote Servers) وOAuth**

- استضافة بعيدة وسلسة باستخدام أحداث يرسلها الخادم (SSE).
- دعم مدمج لبروتوكول OAuth 2.0 للتكامل الآمن (مع خدمات مثل Slack).

**سجل MCP الرسمي (Official MCP Registry)**

- اكتشاف مركزي للخوادم والتحقق منها.
- ملائم للشركات: يمكن للمضيفين تشغيل سجلات خاصة بهم.

**نقاط النهاية المعروفة (Well-Known Endpoints)**

- استخدام ملفات `.well-known/mcp` الموحدة لاكتشاف خوادم الطرف الأول (first-party).

**تحسينات أخرى**

- دعم البث المباشر (streaming)، والاتصالات عديمة الحالة (stateless)، وسلوك الخادم الاستباقي (proactive server behavior)، وتحسين فضاءات الأسماء (name spacing).

كل تحديث من شأنه أن يجعل MCP أكثر متانة وقوة، مما يساعد وكلاء الذكاء الاصطناعي على الاندماج بشكل أعمق في مسارات العمل الواقعية. **إنه جهد يقوده المجتمع، لذا تابعوا خارطة الطريق، وشاركوا في النقاشات، وساهموا في تشكيل مستقبل التقاء الذكاء الاصطناعي بالبرمجيات.**

شهد بروتوكول MCP انتشارًا واسعًا لدرجة أننا اضطررنا لتغيير جدولنا التحريري لتغطيته. فقد كان هذا الموضوع بحاجة ماسة للشرح. وبدا من الطبيعي تمامًا تناوله بعد مناقشة **مرحلة العمل (Action)** في مسارات العمل الوكيلية. في المقال القادم، سنستكشف التواصل بين الإنسان والذكاء الاصطناعي وتكامل العنصر البشري في دورة العمل (Human-in-the-Loop - HITL)، ثم ننتقل إلى موضوع تعاون الوكلاء المتعددين (Multi-Agent Collaboration). **تابعونا.**

_مشاركة هذا المقال تساعدنا على النمو والوصول إلى المزيد من الأشخاص – شكرًا لك!_

## مصادر للتعمق أكثر: {#resources-to-dive-deeper}

- [تقديم بروتوكول سياق النموذج](https://www.anthropic.com/news/model-context-protocol) - مقال من Anthropic
- [وثائق بروتوكول سياق النموذج ودليل البدء السريع](https://modelcontextprotocol.io/introduction)
- [وثائق MCP](https://docs.anthropic.com/en/docs/agents-and-tools/mcp)
- [مستودع بروتوكول سياق النموذج](https://github.com/modelcontextprotocol) على GitHub
- [مجموعة خوادم لبروتوكول MCP](https://github.com/modelcontextprotocol/servers) على GitHub
- [بناء الوكلاء باستخدام بروتوكول سياق النموذج](https://www.youtube.com/watch?v=kQmXtrmQ5Zg) (خاصة جزء: ما الجديد في MCP؟) - ورشة عمل قدمها ماهيش مورثي من Anthropic في قمة هندسة الذكاء الاصطناعي (AI Engineering Summit)
- [لماذا تفوق MCP؟ (?Why MCP Won)](https://www.latent.space/p/why-mcp-won) - مقال بقلم swyx من Latent Space
- [تاريخ نجوم GitHub Star History](https://www.star-history.com/?l#modelcontextprotocol/servers&crewAIInc/crewAI&langchain-ai/langgraph&pydantic/pydantic-ai&openai/swarm&Div99/agent-protocol&meta-llama/llama-stack&Date) (رسوم بيانية)
- [بروتوكول MCP: هل هو مجرد صرعة أم معيار للمستقبل؟ (?MCP: Flash in the Pan or Future Standard)](https://blog.langchain.dev/mcp-fad-or-fixture/) - مقال من LangChain
- [مشروع MCP Guardian](https://github.com/eqtylab/mcp-guardian/) على GitHub
- [عرض الخدمات باستخدام MCP (Exposing Services with MCP)](https://thefocus.ai/posts/exposing-services-with-mcp/)
- [ردود الفعل الأولية على MCP](https://www.reddit.com/r/ClaudeAI/comments/1gzv8b9/anthropics_model_context_protocol_mcp_is_way/) - نقاش على Reddit

**مصادر من Turing Post**

- [🦸🏻#1: الانفتاح ووكلاء الذكاء الاصطناعي – مسار من الذكاء الاصطناعي التوليدي إلى الإبداعي؟](https://huggingface.co/blog/Kseniase/openendedness)
- [🦸🏻#5: المكونات الأساسية للأنظمة الوكيلية](https://huggingface.co/blog/Kseniase/buildingblocks)
- [🦸🏻#9: هل يتذكر الذكاء الاصطناعي؟ دور الذاكرة في مسارات العمل الوكيلية](https://huggingface.co/blog/Kseniase/memory)
- [🦸🏻#10: هل يقوم الذكاء الاصطناعي التوليدي الحالي بالاستدلال حقًا؟](https://huggingface.co/blog/Kseniase/agent10)
- [🦸🏻#11: كيف يخطط الوكلاء ويستدلون؟](https://huggingface.co/blog/Kseniase/reasonplan)
- [🦸🏻#12: كيف يتعلم الوكلاء من أخطائهم؟ دور التأمل في الذكاء الاصطناعي](https://huggingface.co/blog/Kseniase/reflection)
- [🦸🏻#13: العمل! كيف ينفذ وكلاء الذكاء الاصطناعي المهام باستخدام أدوات واجهة المستخدم وواجهة برمجة التطبيقات](https://huggingface.co/blog/Kseniase/action)

شكرًا لقراءتكم!
