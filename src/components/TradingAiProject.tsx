import React from 'react';
import { Send, TrendingUp, ShieldCheck, Layers } from 'lucide-react';
import { ProjectCaseStudy, type CaseStudyData } from './ProjectCaseStudy';

const data: CaseStudyData = {
  slug: 'trading-system',
  accentVar: 'var(--color-amber)',
  year: '2026',
  tags: ['Python · FastAPI', 'React · Vite', 'MetaTrader 5', 'Read-only'],
  title: 'Shark-32 & ARROW',
  subtitle: 'Trading-Signal Detection System — XAUUSD',
  summary:
    'A read-only pattern-detection and alerting engine for gold (XAUUSD). It finds Shark-32 candlestick compression patterns, confirms ARROW breakouts, computes entry / stop-loss / take-profit from published rules, backtests them, and pushes bilingual Telegram alerts the moment a setup fires — without ever connecting to a trading account or placing an order.',
  metrics: [
    { icon: <Send size={18} />, label: 'Alerts', value: 'Telegram (AR / EN)' },
    { icon: <TrendingUp size={18} />, label: 'Market', value: 'Gold · XAUUSD' },
    { icon: <ShieldCheck size={18} />, label: 'Scope', value: 'Read-only, no orders' },
    { icon: <Layers size={18} />, label: 'Design', value: 'Pluggable strategies' }
  ],
  whatItIsTitle: 'What It Does',
  whatItIs: [
    "A discretionary gold trader was manually flipping through charts looking for one setup — a three-candle “compression” that then breaks out — and wanted to be alerted when it appeared instead of watching screens all day. The hard constraints: alerts only and never auto-execution, every threshold adjustable in config without touching code, extensible to more strategies later, and detection rules that trace back to a published, verifiable definition rather than a guessed heuristic.",
    "The engine detects the Shark-32 three-candle telescoping compression zone, confirms the ARROW close-through breakout, and computes trade levels from Bulkowski's measure rule — entry at the next-bar open, a stop buffered beyond the zone, and a target of the zone edge ± twice the zone height. It backtests those signals (win rate, average R-multiple, max drawdown), scans many symbols × timeframes for setups that are forming or firing, and pushes a bilingual Arabic/English Telegram alert the instant a fresh signal appears on a closed bar.",
    "It pulls real XAUUSD from a MetaTrader 5 terminal and transparently falls back to a synthetic gold generator when MT5 isn't reachable — so the whole pipeline is demoable on any machine, with the data source clearly labelled on every screen."
  ],
  tech: {
    intro:
      "A Python/FastAPI detection engine with a React dashboard, layered so every piece depends only on the abstraction below it — which turns “swap the data feed” and “add a strategy” into additions, not rewrites.",
    groups: [
      { label: '// backend', items: ['Python 3', 'FastAPI · Uvicorn', 'pandas · NumPy', 'PyYAML config'] },
      { label: '// data', items: ['MetaTrader 5 (live XAUUSD)', 'Synthetic OHLC generator', 'AutoSource fallback'] },
      { label: '// frontend', items: ['React 18 · Vite', 'TradingView lightweight-charts', 'matplotlib (annotated chart)'] },
      { label: '// alerts', items: ['Telegram Bot API', 'stdlib urllib (zero deps)', 'Bilingual AR / EN'] }
    ]
  },
  highlights: {
    intro: "Engineering decisions I'm proud of:",
    items: [
      {
        title: 'A strategy is a folder, not a fork',
        body: 'Adding an algorithm is a new TradingStrategy subclass plus one line in the registry; the engine, API, and frontend render it unchanged because every strategy emits the same pattern shape. A committed TOM placeholder proves the seam holds.'
      },
      {
        title: 'No repainting',
        body: 'Detection runs on closed bars only, everywhere — so the dashboard, the scanner, and the Telegram alert can never disagree about what happened. New signals are de-duplicated through a persisted “already-alerted” set that survives restarts.'
      },
      {
        title: 'Validated against the reference',
        body: "The detector reproduces the worked example in Bulkowski's public Shark-32 definition — zone height and measure-rule target — to the cent, so the rules are sourced, not guessed."
      },
      {
        title: 'Graceful degradation, per request',
        body: 'Each API request gets its own feed object, so a momentary MT5 outage degrades that one request to clearly-labelled synthetic data instead of pinning the whole server into a bad state.'
      },
      {
        title: 'The scanner never lies',
        body: 'Every number in a result row was computed by the engine from candles — it selects and ranks, it never estimates. One dead symbol is isolated and reported, never allowed to take down the scan cycle.'
      },
      {
        title: 'Honest scope by construction',
        body: "There is no order-placement code path to misconfigure. The system reads market data and sends messages — that's the whole surface area."
      }
    ]
  },
  screenshots: {
    intro:
      'The detection dashboard running on the synthetic feed (clearly labelled): a candlestick chart with detected compression zones, breakout arrows, entry/stop/target overlays, an outcome-statistics panel, and a detected-patterns table.',
    items: [
      { title: 'Detection dashboard', desc: 'Candlestick chart with compression zones, breakout arrows, level overlays, a stats panel, and the patterns table.', src: '/trading-ai/dashboard_full.png', wide: true },
      { title: 'Chart detail', desc: 'A zoomed compression zone with the ARROW breakout and the entry / stop / target levels drawn in.', src: '/trading-ai/dashboard_chart_zoom.png' },
      { title: 'Live analysis view', desc: 'The tunable surface — symbol, timeframe, candle count, target multiple, and stop buffer all re-analyse live.', src: '/trading-ai/dashboard_screenshot.png' }
    ]
  },
  translations: {
    fr: {
      subtitle: 'Système de détection de signaux de trading — XAUUSD',
      summary:
        'Un moteur de détection de motifs et d’alertes en lecture seule pour l’or (XAUUSD). Il repère les motifs de compression Shark-32 en chandeliers, confirme les cassures ARROW, calcule entrée / stop-loss / take-profit à partir de règles publiées, les backteste, et envoie des alertes Telegram bilingues dès qu’une configuration se déclenche — sans jamais se connecter à un compte de trading ni passer d’ordre.',
      metrics: [
        { label: 'Alertes', value: 'Telegram (AR / EN)' },
        { label: 'Marché', value: 'Or · XAUUSD' },
        { label: 'Portée', value: 'Lecture seule, aucun ordre' },
        { label: 'Conception', value: 'Stratégies enfichables' }
      ],
      whatItIsTitle: 'Ce qu’il fait',
      whatItIs: [
        'Un trader discrétionnaire sur l’or feuilletait manuellement les graphiques à la recherche d’une seule configuration — une « compression » de trois chandeliers qui casse ensuite — et voulait être alerté à son apparition plutôt que de surveiller les écrans toute la journée. Les contraintes fortes : des alertes uniquement et jamais d’exécution automatique, chaque seuil ajustable en configuration sans toucher au code, extensible à d’autres stratégies plus tard, et des règles de détection qui renvoient à une définition publiée et vérifiable plutôt qu’à une heuristique devinée.',
        'Le moteur détecte la zone de compression télescopique à trois chandeliers Shark-32, confirme la cassure de clôture ARROW, et calcule les niveaux à partir de la règle de mesure de Bulkowski — entrée à l’ouverture de la bougie suivante, un stop décalé au-delà de la zone, et un objectif égal au bord de la zone ± deux fois sa hauteur. Il backteste ces signaux (taux de réussite, multiple R moyen, drawdown maximal), scanne de nombreux symboles × unités de temps pour repérer les configurations en formation ou déclenchées, et envoie une alerte Telegram bilingue arabe/anglais dès qu’un signal frais apparaît sur une bougie clôturée.',
        'Il récupère le XAUUSD réel depuis un terminal MetaTrader 5 et bascule de façon transparente sur un générateur d’or synthétique quand MT5 est injoignable — tout le pipeline est ainsi démontrable sur n’importe quelle machine, la source de données étant clairement indiquée sur chaque écran.'
      ],
      techIntro:
        'Un moteur de détection Python/FastAPI avec un tableau de bord React, structuré en couches où chaque élément ne dépend que de l’abstraction inférieure — ce qui transforme « changer de flux de données » et « ajouter une stratégie » en ajouts, pas en réécritures.',
      highlightsIntro: 'Des choix d’ingénierie dont je suis fier :',
      highlights: [
        { title: 'Une stratégie est un dossier, pas un fork', body: 'Ajouter un algorithme, c’est une nouvelle sous-classe TradingStrategy plus une ligne dans le registre ; le moteur, l’API et le frontend l’affichent sans changement car chaque stratégie émet la même forme de motif. Un placeholder TOM commité prouve que la couture tient.' },
        { title: 'Aucun repaint', body: 'La détection s’exécute uniquement sur des bougies clôturées, partout — de sorte que le tableau de bord, le scanner et l’alerte Telegram ne peuvent jamais diverger sur ce qui s’est passé. Les nouveaux signaux sont dédupliqués via un ensemble « déjà alerté » persistant qui survit aux redémarrages.' },
        { title: 'Validé face à la référence', body: 'Le détecteur reproduit l’exemple travaillé de la définition publique Shark-32 de Bulkowski — hauteur de zone et objectif de la règle de mesure — au centime près, donc les règles sont sourcées, pas devinées.' },
        { title: 'Dégradation gracieuse, par requête', body: 'Chaque requête API obtient son propre objet de flux, si bien qu’une panne momentanée de MT5 dégrade cette seule requête vers des données synthétiques clairement étiquetées, au lieu de bloquer tout le serveur dans un mauvais état.' },
        { title: 'Le scanner ne ment jamais', body: 'Chaque nombre d’une ligne de résultat a été calculé par le moteur à partir des bougies — il sélectionne et classe, il n’estime jamais. Un symbole défaillant est isolé et signalé, jamais autorisé à faire tomber le cycle de scan.' },
        { title: 'Un périmètre honnête par construction', body: 'Il n’existe aucun chemin de code de passage d’ordre à mal configurer. Le système lit les données de marché et envoie des messages — c’est toute sa surface.' }
      ],
      screenshotsIntro:
        'Le tableau de bord de détection tournant sur le flux synthétique (clairement étiqueté) : un graphique en chandeliers avec les zones de compression détectées, les flèches de cassure, les superpositions entrée/stop/objectif, un panneau de statistiques de résultats et un tableau des motifs détectés.',
      screenshots: [
        { title: 'Tableau de bord de détection', desc: 'Graphique en chandeliers avec zones de compression, flèches de cassure, superpositions de niveaux, un panneau de stats et le tableau des motifs.' },
        { title: 'Détail du graphique', desc: 'Une zone de compression zoomée avec la cassure ARROW et les niveaux entrée / stop / objectif tracés.' },
        { title: 'Vue d’analyse en direct', desc: 'La surface réglable — symbole, unité de temps, nombre de bougies, multiple d’objectif et marge de stop se réanalysent en direct.' }
      ]
    },
    ar: {
      subtitle: 'نظام كشف إشارات التداول — XAUUSD',
      summary:
        'محرّك كشف أنماط وتنبيه للقراءة فقط لأجل الذهب (XAUUSD). يرصد أنماط الانضغاط Shark-32 في الشموع، ويؤكّد اختراقات ARROW، ويحسب الدخول / وقف الخسارة / جني الأرباح وفق قواعد منشورة، ويختبرها رجعيًا، ويرسل تنبيهات Telegram ثنائية اللغة لحظة تكوّن الإعداد — دون الاتصال إطلاقًا بحساب تداول أو تنفيذ أمر.',
      metrics: [
        { label: 'التنبيهات', value: 'Telegram (AR / EN)' },
        { label: 'السوق', value: 'الذهب · XAUUSD' },
        { label: 'النطاق', value: 'قراءة فقط، بلا أوامر' },
        { label: 'التصميم', value: 'استراتيجيات قابلة للإضافة' }
      ],
      whatItIsTitle: 'ماذا يفعل',
      whatItIs: [
        'كان متداول ذهب يعتمد التقدير يقلّب الرسوم البيانية يدويًا بحثًا عن إعداد واحد — «انضغاط» من ثلاث شموع يخترق بعدها — وأراد أن يُنبَّه عند ظهوره بدل مراقبة الشاشات طوال اليوم. القيود الصارمة: تنبيهات فقط دون تنفيذ آلي أبدًا، وكل عتبة قابلة للضبط في الإعداد دون لمس الشيفرة، وقابلية التوسّع لاستراتيجيات أخرى لاحقًا، وقواعد كشف تعود إلى تعريف منشور قابل للتحقّق لا إلى تخمين.',
        'يكشف المحرّك منطقة الانضغاط التلسكوبية من ثلاث شموع Shark-32، ويؤكّد اختراق الإغلاق ARROW، ويحسب مستويات الصفقة وفق قاعدة القياس لدى Bulkowski — الدخول عند افتتاح الشمعة التالية، ووقف بهامش خلف المنطقة، وهدف عند حافة المنطقة ± ضعف ارتفاعها. ويختبر هذه الإشارات رجعيًا (نسبة الربح، ومتوسط مضاعف R، وأقصى تراجع)، ويمسح رموزًا وأطرًا زمنية عديدة بحثًا عن إعدادات قيد التكوّن أو مُتحقّقة، ويرسل تنبيه Telegram ثنائي اللغة عربي/إنجليزي لحظة ظهور إشارة جديدة على شمعة مغلقة.',
        'يسحب XAUUSD الحقيقي من طرفية MetaTrader 5 ويتحوّل بشفافية إلى مولّد ذهب اصطناعي عند تعذّر الوصول إلى MT5 — فيصبح المسار كله قابلًا للعرض على أي جهاز، مع تسمية مصدر البيانات بوضوح في كل شاشة.'
      ],
      techIntro:
        'محرّك كشف بـ Python/FastAPI مع لوحة React، مُقسَّم إلى طبقات بحيث يعتمد كل جزء على التجريد الذي تحته فقط — ما يحوّل «تبديل مصدر البيانات» و«إضافة استراتيجية» إلى إضافات لا إعادة كتابة.',
      highlightsIntro: 'قرارات هندسية أفخر بها:',
      highlights: [
        { title: 'الاستراتيجية مجلّد لا فرع', body: 'إضافة خوارزمية تعني صنفًا فرعيًا جديدًا من TradingStrategy وسطرًا واحدًا في السجلّ؛ ويعرضها المحرّك وواجهة الـ API والواجهة الأمامية دون تغيير لأن كل استراتيجية تُصدر الشكل نفسه للنمط. ويثبت عنصر TOM النائب المُودَع أن الوصلة صامدة.' },
        { title: 'بلا إعادة رسم', body: 'يعمل الكشف على الشموع المغلقة فقط في كل مكان — فلا يمكن للوحة والماسح وتنبيه Telegram أن يختلفوا أبدًا حول ما حدث. وتُزال تكرارات الإشارات الجديدة عبر مجموعة «سبق التنبيه بها» محفوظة تصمد أمام إعادة التشغيل.' },
        { title: 'مُتحقَّق منه مقابل المرجع', body: 'يعيد الكاشف إنتاج المثال المحلول في تعريف Shark-32 العلني لدى Bulkowski — ارتفاع المنطقة وهدف قاعدة القياس — بدقّة السنت، فالقواعد مُوثَّقة المصدر لا مُخمَّنة.' },
        { title: 'تدهور رشيق، لكل طلب', body: 'يحصل كل طلب API على كائن تغذية خاص به، فيؤدّي انقطاع لحظي في MT5 إلى تدهور ذلك الطلب وحده إلى بيانات اصطناعية موسومة بوضوح، بدل تثبيت الخادم كله في حالة سيئة.' },
        { title: 'الماسح لا يكذب', body: 'كل رقم في صف نتيجة حسبه المحرّك من الشموع — يختار ويرتّب، ولا يُقدّر أبدًا. ويُعزَل الرمز المتعطّل ويُبلَّغ عنه، ولا يُسمح له أبدًا بإسقاط دورة المسح.' },
        { title: 'نطاق صادق بالتصميم', body: 'لا يوجد مسار شيفرة لتنفيذ الأوامر لإساءة ضبطه. يقرأ النظام بيانات السوق ويرسل رسائل — تلك هي كامل مساحته.' }
      ],
      screenshotsIntro:
        'لوحة الكشف تعمل على التغذية الاصطناعية (موسومة بوضوح): رسم شموع مع مناطق الانضغاط المكتشفة، وأسهم الاختراق، وطبقات الدخول/الوقف/الهدف، ولوحة إحصاءات النتائج، وجدول الأنماط المكتشفة.',
      screenshots: [
        { title: 'لوحة الكشف', desc: 'رسم شموع مع مناطق انضغاط وأسهم اختراق وطبقات مستويات ولوحة إحصاءات وجدول الأنماط.' },
        { title: 'تفاصيل الرسم', desc: 'منطقة انضغاط مُكبَّرة مع اختراق ARROW ومستويات الدخول / الوقف / الهدف مرسومة.' },
        { title: 'عرض التحليل الحيّ', desc: 'الواجهة القابلة للضبط — الرمز، والإطار الزمني، وعدد الشموع، ومضاعف الهدف، وهامش الوقف تُعاد تحليلها حيًّا.' }
      ]
    }
  }
};

export const TradingAiProject: React.FC = () => <ProjectCaseStudy data={data} />;
