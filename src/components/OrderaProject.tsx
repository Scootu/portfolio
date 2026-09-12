import React from 'react';
import { Workflow, Database, PhoneCall, Boxes } from 'lucide-react';
import { ProjectCaseStudy, type CaseStudyData } from './ProjectCaseStudy';

const data: CaseStudyData = {
  slug: 'ordera',
  accentVar: 'var(--color-teal)',
  year: '2026',
  tags: ['NestJS 11', 'PostgreSQL 17', 'React · Vite', 'Multi-tenant'],
  title: 'Ordera',
  subtitle: 'COD Order Automation — E-commerce',
  summary:
    'A production-grade SaaS that automates cash-on-delivery order confirmation and fulfilment for e-commerce merchants. Full-stack end to end: marketing site, merchant web app, a 118-endpoint REST API, background workers, and integrations with Shopify, YouCan, Google Sheets, Yalidine, and Chargily.',
  metrics: [
    { icon: <Workflow size={18} />, label: 'Pipeline', value: 'Ingest → confirm → ship' },
    { icon: <Database size={18} />, label: 'Backend', value: 'NestJS · Postgres RLS' },
    { icon: <PhoneCall size={18} />, label: 'Confirmation', value: 'Agent call cockpit' },
    { icon: <Boxes size={18} />, label: 'Scale', value: '118 endpoints · 61 tables' }
  ],
  whatItIs: [
    "In COD e-commerce, orders arrive from a storefront, a landing page, or even a Google Sheet — and someone has to call every customer to confirm before shipping. Ordera runs that entire pipeline: it pulls orders in from every source, gives agents a fast “call cockpit” to confirm them, pushes confirmed orders to the delivery company, tracks them to delivery, and gives the owner live analytics on money, confirmation rate, and returns.",
    'It ingests orders from Shopify, YouCan, Google Sheets, and custom landing-page webhooks; manages products and live stock with an immutable stock ledger; reserves stock the moment an order is confirmed so you never oversell; ships confirmed orders to Yalidine; and reports revenue, confirmation and return rates in real time. The Google Sheets connector works in both directions — a Sheet can be an order source and each new order can be registered back into a Sheet automatically.'
  ],
  tech: {
    intro:
      'A React + TypeScript merchant app on top of a NestJS/Fastify API and PostgreSQL with Row-Level Security, plus background workers and a queue for everything that shouldn’t block a request.',
    groups: [
      { label: '// frontend', items: ['React 18 · TypeScript', 'Vite 6 · Tailwind CSS 4', 'TanStack Query · Zustand', 'React Router 7 · Recharts'] },
      { label: '// backend', items: ['NestJS 11 on Fastify 5', 'PostgreSQL 17 · RLS', 'Argon2 · opaque sessions', 'Zod · RFC 9457'] },
      { label: '// async & realtime', items: ['BullMQ + Redis', 'Postgres durable-lease fallback', 'Server-Sent Events', 'Transactional outbox'] },
      { label: '// integrations & infra', items: ['YouCan · Shopify · Chargily', 'Yalidine shipping · Google Sheets', 'AES-256-GCM secrets', 'Docker · Prometheus · Sentry'] }
    ]
  },
  highlights: {
    intro: 'The parts that make it production-grade, not a prototype:',
    items: [
      {
        title: 'Multi-tenant by design',
        body: "Postgres Row-Level Security means one merchant can never see another's data, even if application code has a bug."
      },
      {
        title: 'Idempotent & crash-safe',
        body: 'Every mutation takes an idempotency key, and a transactional outbox guarantees no event is lost if a process dies mid-write.'
      },
      {
        title: 'Separate API / worker / scheduler',
        body: 'The web API stays fast while heavy work — syncing stores, creating shipments, exports — runs in the background and scales independently.'
      },
      {
        title: 'Two-way Google Sheets',
        body: 'A Sheet can be an order source (syncing every 15 minutes) and the outbound-webhook engine can register each new order back into a Sheet via Apps Script.'
      },
      {
        title: 'Encrypted secrets',
        body: 'Store tokens and webhook secrets are AES-256-GCM encrypted at rest, with CSRF-origin checks and Zod validation on every input.'
      },
      {
        title: 'Operable in production',
        body: 'Health checks, Prometheus metrics + alerts, structured logs, encrypted database backups with tested restore drills, and Docker images that run non-root on a read-only filesystem.'
      }
    ]
  },
  screenshots: {
    intro:
      'A walk through the merchant app: the dashboard, the single orders queue, the confirmation cockpit, products & stock, integrations, and business analytics.',
    items: [
      { title: 'Landing page', desc: 'Responsive marketing site: connect your stores once, confirm orders forever.', src: '/ordera/01-landing.png' },
      { title: 'Dashboard', desc: "The owner's home — live KPIs: orders to confirm, revenue in dinars, team performance, activity feed.", src: '/ordera/04-dashboard.png' },
      { title: 'Orders', desc: 'Every order from every channel in one searchable, filterable table — the single source of truth.', src: '/ordera/05-orders.png' },
      { title: 'Confirmation cockpit', desc: 'The call-center core: one order at a time — Confirm, No-answer, Callback, or open WhatsApp in a keypress.', src: '/ordera/06-cockpit.png', wide: true },
      { title: 'Products & stock', desc: 'SKUs, price, live available stock, reservations, low-stock alerts, CSV import/export.', src: '/ordera/07-products.png' },
      { title: 'Customers', desc: 'Customer directory with order history — repeat buyer or serial no-show at a glance.', src: '/ordera/08-customers.png' },
      { title: 'Shipments', desc: 'Confirmed orders become shipments sent to Yalidine and tracked to delivered / returned.', src: '/ordera/09-shipments.png' },
      { title: 'Analytics', desc: 'Revenue, confirmation rate, delivery/return rate, best products, wilayas, and hours to call.', src: '/ordera/10-analytics.png' },
      { title: 'Stores & integrations', desc: 'Shopify, YouCan, a Google Sheet syncing every 15 min, and a landing-page webhook — one queue.', src: '/ordera/11-stores.png' }
    ]
  },
  translations: {
    fr: {
      subtitle: 'Automatisation des commandes COD — E-commerce',
      summary:
        'Un SaaS de niveau production qui automatise la confirmation et la logistique des commandes en paiement à la livraison pour les marchands e-commerce. Full-stack de bout en bout : site marketing, application marchand, une API REST de 118 endpoints, des workers en arrière-plan et des intégrations avec Shopify, YouCan, Google Sheets, Yalidine et Chargily.',
      metrics: [
        { label: 'Pipeline', value: 'Réception → confirmation → expédition' },
        { label: 'Backend', value: 'NestJS · Postgres RLS' },
        { label: 'Confirmation', value: 'Cockpit d’appel agent' },
        { label: 'Échelle', value: '118 endpoints · 61 tables' }
      ],
      whatItIs: [
        'Dans l’e-commerce en paiement à la livraison, les commandes arrivent d’une boutique, d’une landing page ou même d’un Google Sheet — et quelqu’un doit appeler chaque client pour confirmer avant d’expédier. Ordera gère tout ce pipeline : il récupère les commandes de chaque source, offre aux agents un « cockpit d’appel » rapide pour les confirmer, transmet les commandes confirmées au transporteur, les suit jusqu’à la livraison, et donne au propriétaire des analyses en temps réel sur l’argent, le taux de confirmation et les retours.',
        'Il ingère les commandes depuis Shopify, YouCan, Google Sheets et des webhooks de landing pages personnalisées ; gère les produits et le stock en temps réel avec un registre de stock immuable ; réserve le stock dès qu’une commande est confirmée pour ne jamais survendre ; expédie les commandes confirmées vers Yalidine ; et rapporte le chiffre d’affaires, les taux de confirmation et de retour en temps réel. Le connecteur Google Sheets fonctionne dans les deux sens — une feuille peut être une source de commandes et chaque nouvelle commande peut y être réenregistrée automatiquement.'
      ],
      techIntro:
        'Une application marchand React + TypeScript au-dessus d’une API NestJS/Fastify et de PostgreSQL avec Row-Level Security, plus des workers en arrière-plan et une file d’attente pour tout ce qui ne doit pas bloquer une requête.',
      highlightsIntro: 'Les éléments qui en font un produit de niveau production, pas un prototype :',
      highlights: [
        { title: 'Multi-tenant par conception', body: 'La Row-Level Security de PostgreSQL garantit qu’un marchand ne peut jamais voir les données d’un autre, même en cas de bug dans le code applicatif.' },
        { title: 'Idempotent et résistant aux pannes', body: 'Chaque mutation prend une clé d’idempotence, et un transactional outbox garantit qu’aucun événement n’est perdu si un processus meurt en pleine écriture.' },
        { title: 'API / worker / scheduler séparés', body: 'L’API web reste rapide pendant que les tâches lourdes — synchronisation des boutiques, création d’expéditions, exports — s’exécutent en arrière-plan et montent en charge indépendamment.' },
        { title: 'Google Sheets bidirectionnel', body: 'Une feuille peut être une source de commandes (synchronisée toutes les 15 minutes) et le moteur de webhooks sortants peut réenregistrer chaque nouvelle commande dans une feuille via Apps Script.' },
        { title: 'Secrets chiffrés', body: 'Les tokens de boutique et les secrets de webhook sont chiffrés au repos en AES-256-GCM, avec vérification d’origine CSRF et validation Zod sur chaque entrée.' },
        { title: 'Exploitable en production', body: 'Health checks, métriques et alertes Prometheus, logs structurés, sauvegardes de base de données chiffrées avec restaurations testées, et images Docker qui tournent en non-root sur un système de fichiers en lecture seule.' }
      ],
      screenshotsIntro:
        'Une visite de l’application marchand : le tableau de bord, la file des commandes, le cockpit de confirmation, les produits et le stock, les intégrations et les analyses métier.',
      screenshots: [
        { title: 'Landing page', desc: 'Site marketing responsive : connectez vos boutiques une fois, confirmez les commandes pour toujours.' },
        { title: 'Tableau de bord', desc: 'L’accueil du propriétaire — KPIs en direct : commandes à confirmer, chiffre d’affaires en dinars, performance de l’équipe, fil d’activité.' },
        { title: 'Commandes', desc: 'Chaque commande de chaque canal dans un tableau unique, cherchable et filtrable — la source unique de vérité.' },
        { title: 'Cockpit de confirmation', desc: 'Le cœur du centre d’appels : une commande à la fois — Confirmer, Sans réponse, Rappeler ou ouvrir WhatsApp en une touche.' },
        { title: 'Produits et stock', desc: 'SKU, prix, stock disponible en direct, réservations, alertes de stock bas, import/export CSV.' },
        { title: 'Clients', desc: 'Répertoire clients avec historique des commandes — acheteur fidèle ou absent récurrent en un coup d’œil.' },
        { title: 'Expéditions', desc: 'Les commandes confirmées deviennent des expéditions envoyées à Yalidine et suivies jusqu’à livré / retourné.' },
        { title: 'Analyses', desc: 'Chiffre d’affaires, taux de confirmation, taux de livraison/retour, meilleurs produits, wilayas et heures d’appel.' },
        { title: 'Boutiques et intégrations', desc: 'Shopify, YouCan, un Google Sheet synchronisé toutes les 15 min, et un webhook de landing page — une seule file.' }
      ]
    },
    ar: {
      subtitle: 'أتمتة طلبات الدفع عند الاستلام — التجارة الإلكترونية',
      summary:
        'منصة SaaS بمستوى إنتاجي تُؤتمِت تأكيد ومعالجة طلبات الدفع عند الاستلام لتجّار التجارة الإلكترونية. Full-stack من الطرف إلى الطرف: موقع تسويقي، وتطبيق ويب للتاجر، وواجهة REST من 118 نقطة نهاية، وعمّال في الخلفية، وتكاملات مع Shopify وYouCan وGoogle Sheets وYalidine وChargily.',
      metrics: [
        { label: 'المسار', value: 'استقبال ← تأكيد ← شحن' },
        { label: 'الخلفية', value: 'NestJS · Postgres RLS' },
        { label: 'التأكيد', value: 'قمرة اتصال للوكيل' },
        { label: 'الحجم', value: '118 نقطة نهاية · 61 جدولًا' }
      ],
      whatItIs: [
        'في التجارة الإلكترونية بالدفع عند الاستلام، تصل الطلبات من متجر أو صفحة هبوط أو حتى من Google Sheet — وعلى أحدهم الاتصال بكل عميل للتأكيد قبل الشحن. تُدير Ordera هذا المسار بالكامل: تسحب الطلبات من كل مصدر، وتمنح الوكلاء «قمرة اتصال» سريعة لتأكيدها، وتدفع الطلبات المؤكَّدة إلى شركة التوصيل، وتتابعها حتى التسليم، وتمنح المالك تحليلات فورية عن المال ونسبة التأكيد والمرتجعات.',
        'تستقبل الطلبات من Shopify وYouCan وGoogle Sheets ومن webhooks لصفحات هبوط مخصّصة؛ وتدير المنتجات والمخزون الحيّ بسجلّ مخزون غير قابل للتعديل؛ وتحجز المخزون لحظة تأكيد الطلب حتى لا تبيع أكثر من المتوفّر؛ وتشحن الطلبات المؤكَّدة إلى Yalidine؛ وتُقدّم تقارير فورية عن الإيرادات ونِسب التأكيد والمرتجعات. ويعمل موصّل Google Sheets في الاتجاهين — يمكن أن تكون الورقة مصدرًا للطلبات، وكل طلب جديد يُسجَّل تلقائيًا في ورقة.'
      ],
      techIntro:
        'تطبيق تاجر بـ React + TypeScript فوق واجهة NestJS/Fastify وقاعدة PostgreSQL مع Row-Level Security، إضافة إلى عمّال في الخلفية وطابور لكل ما لا ينبغي أن يُعطّل الطلب.',
      highlightsIntro: 'الأجزاء التي تجعله منتجًا بمستوى إنتاجي لا نموذجًا أوّليًا:',
      highlights: [
        { title: 'متعدّد المستأجرين بالتصميم', body: 'تعني Row-Level Security في PostgreSQL أنّ تاجرًا لا يمكنه أبدًا رؤية بيانات تاجر آخر، حتى لو كان في شيفرة التطبيق خطأ.' },
        { title: 'مُحايد للتكرار وآمن ضد الأعطال', body: 'كل عملية تعديل تأخذ مفتاح idempotency، ويضمن transactional outbox عدم فقدان أي حدث إذا توقّفت العملية في منتصف الكتابة.' },
        { title: 'فصل الـ API والـ worker والـ scheduler', body: 'تبقى واجهة الويب سريعة بينما تعمل المهام الثقيلة — مزامنة المتاجر وإنشاء الشحنات والتصدير — في الخلفية وتتوسّع باستقلالية.' },
        { title: 'Google Sheets في الاتجاهين', body: 'يمكن أن تكون الورقة مصدرًا للطلبات (تُزامَن كل 15 دقيقة) ويمكن لمحرّك الـ webhooks الصادرة تسجيل كل طلب جديد في ورقة عبر Apps Script.' },
        { title: 'أسرار مُشفّرة', body: 'رموز المتاجر وأسرار الـ webhook مُشفّرة أثناء التخزين بـ AES-256-GCM، مع فحص أصل CSRF والتحقّق بـ Zod على كل مُدخل.' },
        { title: 'قابل للتشغيل في الإنتاج', body: 'فحوص صحّة، ومقاييس وتنبيهات Prometheus، وسجلّات مُهيكلة، ونُسخ احتياطية مُشفّرة لقاعدة البيانات مع تجارب استعادة مُختبَرة، وصور Docker تعمل بدون صلاحيات root على نظام ملفّات للقراءة فقط.' }
      ],
      screenshotsIntro:
        'جولة في تطبيق التاجر: لوحة التحكّم، وطابور الطلبات، وقمرة التأكيد، والمنتجات والمخزون، والتكاملات، وتحليلات الأعمال.',
      screenshots: [
        { title: 'صفحة الهبوط', desc: 'موقع تسويقي متجاوب: اربط متاجرك مرّة واحدة، وأكّد الطلبات إلى الأبد.' },
        { title: 'لوحة التحكّم', desc: 'الصفحة الرئيسية للمالك — مؤشّرات حيّة: طلبات بانتظار التأكيد، الإيرادات بالدينار، أداء الفريق، وسِجل النشاط.' },
        { title: 'الطلبات', desc: 'كل طلب من كل قناة في جدول واحد قابل للبحث والتصفية — مصدر الحقيقة الوحيد.' },
        { title: 'قمرة التأكيد', desc: 'قلب مركز الاتصال: طلب واحد في كل مرّة — تأكيد، لا ردّ، معاودة اتصال، أو فتح WhatsApp بضغطة واحدة.' },
        { title: 'المنتجات والمخزون', desc: 'رموز SKU، والسعر، والمخزون المتاح الحيّ، والحجوزات، وتنبيهات المخزون المنخفض، واستيراد/تصدير CSV.' },
        { title: 'العملاء', desc: 'دليل العملاء مع سجلّ الطلبات — مشترٍ متكرّر أو متغيّب دائم بنظرة واحدة.' },
        { title: 'الشحنات', desc: 'تتحوّل الطلبات المؤكَّدة إلى شحنات تُرسَل إلى Yalidine وتُتابَع حتى التسليم / الإرجاع.' },
        { title: 'التحليلات', desc: 'الإيرادات، ونسبة التأكيد، ونسبة التسليم/الإرجاع، وأفضل المنتجات، والولايات، وأفضل ساعات الاتصال.' },
        { title: 'المتاجر والتكاملات', desc: 'Shopify وYouCan وGoogle Sheet يُزامَن كل 15 دقيقة، وwebhook لصفحة هبوط — طابور واحد.' }
      ]
    }
  }
};

export const OrderaProject: React.FC = () => <ProjectCaseStudy data={data} />;
