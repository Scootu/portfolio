import React from 'react';
import { Nfc, Layers, ShieldCheck, Languages } from 'lucide-react';
import { ProjectCaseStudy, type CaseStudyData } from './ProjectCaseStudy';

const data: CaseStudyData = {
  slug: 'linqo',
  accentVar: 'var(--color-purple)',
  year: '2026',
  tags: ['Next.js 16', 'TypeScript', 'Supabase', 'Trilingual · RTL'],
  title: 'Linqo',
  subtitle: 'Smart NFC Business Cards — Algeria',
  summary:
    'A full-stack SaaS that turns one NFC tap (or QR scan) into a complete, always-up-to-date digital profile — WhatsApp-first, no app required. Built for Algeria: DZD pricing, cash-on-delivery, delivery to all 58 wilayas, and a fully trilingual UI (FR · EN · العربية with RTL).',
  liveUrl: { href: 'https://linqo.tech', label: 'Open live site' },
  metrics: [
    { icon: <Nfc size={18} />, label: 'Product', value: 'NFC + QR profiles' },
    { icon: <Layers size={18} />, label: 'Framework', value: 'Next.js 16 · RSC' },
    { icon: <ShieldCheck size={18} />, label: 'Security', value: 'Postgres RLS + RBAC' },
    { icon: <Languages size={18} />, label: 'Localization', value: 'FR / EN / AR (RTL)' }
  ],
  whatItIs: [
    'Paper business cards get lost, go stale the moment your number changes, and give you zero feedback. In Algeria most business happens over WhatsApp — but there was no localized, no-app-required way to hand someone your whole digital presence in a single tap.',
    "Linqo solves that with a physical NFC/QR card linked to an editable online profile. Tap the card on any phone (iPhone or Android, no app) and the visitor instantly gets a WhatsApp-first profile with one-tap “save contact” (vCard), all your links, a map, and — on higher tiers — a product catalog and lead-capture forms. Update the profile any time; the same card always shows the latest version.",
    'I built the whole product end to end: a trilingual marketing site, a guided 5-step onboarding wizard with a live phone preview, a creator dashboard (links, appearance & themes, business showcase, branded QR studio, card orders), the public profile surface, a wilaya-aware order flow for physical PVC cards, and a super-admin console — all gated by tiered Free / Pro / Business entitlements.'
  ],
  tech: {
    intro:
      'A Next.js 16 App Router app (Server Components + Route Handlers) in strict TypeScript, backed entirely by Supabase with Postgres Row-Level Security, and a typed FR/EN/AR dictionary driving full RTL.',
    groups: [
      { label: '// framework & language', items: ['Next.js 16 (App Router)', 'React 19', 'TypeScript (strict)', 'Turbopack'] },
      { label: '// backend & data', items: ['Supabase Postgres', 'Row-Level Security', 'Supabase Auth (@supabase/ssr)', 'Cloudinary media'] },
      { label: '// ui & viz', items: ['Tailwind CSS v4', 'lucide-react', 'Recharts', 'react-qr-code'] },
      { label: '// hardening & tooling', items: ['hCaptcha', 'OpenStreetMap', 'Vitest', 'ESLint 9 · Netlify'] }
    ]
  },
  highlights: {
    intro: "A few things I'm proud of under the hood:",
    items: [
      {
        title: 'Multi-tenant security (RLS + RBAC)',
        body: 'Every table is protected by Postgres Row-Level Security so users only touch their own data. Admin routes are gated server-side by an is_super_admin RPC and redirect before any data is fetched; public profiles are served through an explicitly column-scoped query, never select *.'
      },
      {
        title: 'Graceful, migration-safe data layer',
        body: "The data layer transparently handles a database that hasn't run the latest migration yet — falling back to a legacy query instead of erroring — so deploys never take profiles offline."
      },
      {
        title: 'Consistent entitlements',
        body: 'A single PLAN_ENTITLEMENTS source drives feature gating (link caps, images, catalog, lead forms) identically on the client and the server, and the public profile only queries premium data when the plan allows it.'
      },
      {
        title: 'Abuse protection',
        body: 'Public write endpoints (leads, tracking, uploads) are rate-limited on a hashed endpoint:ip:subject key with standard Retry-After / X-RateLimit headers and honeypot fields. The core limiter is unit-tested.'
      },
      {
        title: 'Privacy-respecting analytics',
        body: 'Views and link clicks are recorded with navigator.sendBeacon and de-duplicated per session — analytics can never block or break the public profile.'
      },
      {
        title: 'Real i18n, including RTL',
        body: 'A typed dictionary powers FR/EN/AR with correct direction, locale-aware number/currency formatting, and RTL-aware layout utilities. Print-ready branded QR codes export as both high-res PNG and vector SVG, entirely on the client.'
      }
    ]
  },
  screenshots: {
    intro:
      "Captured in the app's zero-config demo mode — the trilingual landing (English + Arabic RTL), the public profile, the onboarding wizard, and the creator dashboard.",
    items: [
      { title: 'Landing — English', desc: 'Trilingual marketing landing with DZD pricing, FAQ, and an NFC card storefront.', src: '/linqo/01-landing-desktop.png' },
      { title: 'Landing — العربية (RTL)', desc: 'Selecting Arabic flips the entire layout to right-to-left via document.documentElement.dir.', src: '/linqo/03-landing-arabic-rtl.png' },
      { title: 'Public profile (mobile)', desc: "The product's core surface — mobile-first, WhatsApp-first, one-tap vCard, tracked link taps.", src: '/linqo/04-public-profile-mobile.png' },
      { title: 'Onboarding wizard', desc: 'An adaptive 5-step wizard that recommends a plan, template, and starter links — with a live phone preview.', src: '/linqo/05-onboarding-desktop.png' },
      { title: 'Dashboard overview', desc: 'The creator home: profile status, analytics, and quick actions.', src: '/linqo/06-dashboard-overview.png' },
      { title: 'Link management', desc: 'Reorder, hide, and read per-link click stats.', src: '/linqo/07-dashboard-links.png' },
      { title: 'Appearance & themes', desc: 'Profile templates and palettes, gated by plan.', src: '/linqo/08-dashboard-appearance.png' },
      { title: 'QR code studio', desc: 'Branded, print-ready QR export in PNG and SVG.', src: '/linqo/09-dashboard-qr.png' },
      { title: 'Order an NFC card', desc: 'Wilaya-aware checkout for physical PVC cards — cash-on-delivery or BaridiMob.', src: '/linqo/10-order-desktop.png', wide: true }
    ]
  },
  translations: {
    fr: {
      subtitle: 'Cartes de visite NFC intelligentes — Algérie',
      summary:
        'Un SaaS full-stack qui transforme un simple contact NFC (ou un scan QR) en un profil numérique complet et toujours à jour — pensé pour WhatsApp, sans aucune application. Conçu pour l’Algérie : prix en DZD, paiement à la livraison, livraison dans les 58 wilayas, et une interface entièrement trilingue (FR · EN · العربية avec RTL).',
      liveUrlLabel: 'Ouvrir le site',
      metrics: [
        { label: 'Produit', value: 'Profils NFC + QR' },
        { label: 'Framework', value: 'Next.js 16 · RSC' },
        { label: 'Sécurité', value: 'Postgres RLS + RBAC' },
        { label: 'Localisation', value: 'FR / EN / AR (RTL)' }
      ],
      whatItIs: [
        'Les cartes de visite en papier se perdent, deviennent obsolètes dès que votre numéro change, et ne vous donnent aucun retour. En Algérie, l’essentiel des échanges se fait sur WhatsApp — mais il n’existait aucun moyen localisé et sans application de transmettre toute sa présence numérique en un seul contact.',
        'Linqo résout cela avec une carte physique NFC/QR liée à un profil en ligne modifiable. Approchez la carte de n’importe quel téléphone (iPhone ou Android, sans application) et le visiteur obtient aussitôt un profil pensé pour WhatsApp, avec un « enregistrer le contact » en un tap (vCard), tous vos liens, une carte, et — sur les offres supérieures — un catalogue de produits et des formulaires de capture de prospects. Modifiez le profil à tout moment ; la même carte affiche toujours la dernière version.',
        'J’ai construit tout le produit de bout en bout : un site marketing trilingue, un assistant d’intégration guidé en 5 étapes avec aperçu téléphone en direct, un tableau de bord créateur (liens, apparence et thèmes, vitrine business, studio QR de marque, commandes de cartes), la surface publique du profil, un flux de commande adapté aux wilayas pour les cartes PVC physiques, et une console super-admin — le tout selon des droits par offre Free / Pro / Business.'
      ],
      techIntro:
        'Une application Next.js 16 (App Router : Server Components + Route Handlers) en TypeScript strict, entièrement adossée à Supabase avec Row-Level Security PostgreSQL, et un dictionnaire typé FR/EN/AR pilotant un RTL complet.',
      highlightsIntro: 'Quelques éléments dont je suis fier sous le capot :',
      highlights: [
        { title: 'Sécurité multi-tenant (RLS + RBAC)', body: 'Chaque table est protégée par la Row-Level Security de PostgreSQL, de sorte que les utilisateurs n’accèdent qu’à leurs propres données. Les routes admin sont verrouillées côté serveur par un RPC is_super_admin et redirigent avant toute récupération de données ; les profils publics passent par une requête aux colonnes explicitement limitées, jamais un select *.' },
        { title: 'Couche de données sûre aux migrations', body: 'La couche de données gère de façon transparente une base qui n’a pas encore exécuté la dernière migration — en repli sur une requête historique au lieu d’échouer — afin qu’un déploiement ne mette jamais les profils hors ligne.' },
        { title: 'Droits cohérents', body: 'Une source unique PLAN_ENTITLEMENTS pilote le verrouillage des fonctionnalités (plafonds de liens, images, catalogue, formulaires de prospects) de façon identique côté client et serveur, et le profil public n’interroge les données premium que si l’offre l’autorise.' },
        { title: 'Protection contre les abus', body: 'Les endpoints d’écriture publics (prospects, tracking, uploads) sont limités en débit sur une clé hachée endpoint:ip:subject, avec en-têtes standard Retry-After / X-RateLimit et champs honeypot. Le limiteur central est couvert par des tests unitaires.' },
        { title: 'Analytics respectueux de la vie privée', body: 'Les vues et les clics sur les liens sont enregistrés via navigator.sendBeacon et dédupliqués par session — l’analytics ne peut jamais bloquer ni casser le profil public.' },
        { title: 'Un vrai i18n, RTL compris', body: 'Un dictionnaire typé alimente FR/EN/AR avec la bonne direction, un formatage des nombres et devises selon la locale, et des utilitaires de mise en page adaptés au RTL. Les QR codes de marque prêts à imprimer s’exportent en PNG haute résolution et en SVG vectoriel, entièrement côté client.' }
      ],
      screenshotsIntro:
        'Capturé dans le mode démo sans configuration de l’application — la landing trilingue (anglais + arabe RTL), le profil public, l’assistant d’intégration et le tableau de bord créateur.',
      screenshots: [
        { title: 'Landing — Anglais', desc: 'Landing marketing trilingue avec prix en DZD, FAQ et boutique de cartes NFC.' },
        { title: 'Landing — العربية (RTL)', desc: 'Choisir l’arabe bascule toute la mise en page en droite-à-gauche via document.documentElement.dir.' },
        { title: 'Profil public (mobile)', desc: 'La surface centrale du produit — mobile d’abord, WhatsApp d’abord, vCard en un tap, clics de liens suivis.' },
        { title: 'Assistant d’intégration', desc: 'Un assistant adaptatif en 5 étapes qui recommande une offre, un modèle et des liens de départ — avec aperçu téléphone en direct.' },
        { title: 'Vue d’ensemble du tableau de bord', desc: 'L’accueil créateur : statut du profil, analytics et actions rapides.' },
        { title: 'Gestion des liens', desc: 'Réorganisez, masquez et consultez les statistiques de clics par lien.' },
        { title: 'Apparence et thèmes', desc: 'Modèles et palettes de profil, selon l’offre.' },
        { title: 'Studio QR code', desc: 'Export QR de marque, prêt à imprimer, en PNG et SVG.' },
        { title: 'Commander une carte NFC', desc: 'Paiement adapté aux wilayas pour les cartes PVC physiques — à la livraison ou par BaridiMob.' }
      ]
    },
    ar: {
      subtitle: 'بطاقات عمل NFC ذكية — الجزائر',
      summary:
        'منصة SaaS متكاملة تحوّل لمسة NFC واحدة (أو مسح رمز QR) إلى ملف رقمي كامل ومحدَّث دائمًا — يركّز على WhatsApp، دون الحاجة إلى أي تطبيق. مبنيّ للجزائر: أسعار بالدينار، والدفع عند الاستلام، والتوصيل إلى الولايات الـ58، وواجهة ثلاثية اللغة بالكامل (FR · EN · العربية مع دعم RTL).',
      liveUrlLabel: 'فتح الموقع',
      metrics: [
        { label: 'المنتج', value: 'ملفات NFC + QR' },
        { label: 'الإطار', value: 'Next.js 16 · RSC' },
        { label: 'الأمان', value: 'Postgres RLS + RBAC' },
        { label: 'التوطين', value: 'FR / EN / AR (RTL)' }
      ],
      whatItIs: [
        'البطاقات الورقية تُفقَد، وتتقادم لحظة تغيّر رقمك، ولا تمنحك أي تغذية راجعة. في الجزائر يجري معظم العمل عبر WhatsApp — لكن لم تكن هناك طريقة محلية بلا تطبيق لتسليم حضورك الرقمي كاملًا بلمسة واحدة.',
        'تحلّ Linqo ذلك ببطاقة NFC/QR مادية مرتبطة بملف إلكتروني قابل للتعديل. المس البطاقة بأي هاتف (iPhone أو Android، دون تطبيق) فيحصل الزائر فورًا على ملف يركّز على WhatsApp مع «حفظ جهة الاتصال» بلمسة واحدة (vCard)، وكل روابطك، وخريطة، وفي الباقات الأعلى كتالوج منتجات ونماذج لالتقاط العملاء المحتملين. عدّل الملف في أي وقت؛ البطاقة نفسها تعرض دائمًا أحدث نسخة.',
        'بنيتُ المنتج بالكامل من الطرف إلى الطرف: موقع تسويقي ثلاثي اللغة، ومعالج إعداد موجّه من 5 خطوات مع معاينة حيّة على هيئة هاتف، ولوحة تحكّم للمُنشئ (الروابط، والمظهر والسمات، وواجهة عرض الأعمال، واستوديو QR بعلامتك، وطلبات البطاقات)، وواجهة الملف العامة، وتدفّق طلب يراعي الولاية لبطاقات PVC المادية، ولوحة تحكّم للمشرف الأعلى — كل ذلك محكوم بصلاحيات باقات Free / Pro / Business.'
      ],
      techIntro:
        'تطبيق Next.js 16 (App Router: مكوّنات الخادم + معالجات المسارات) بـ TypeScript صارم، مدعوم بالكامل بـ Supabase مع Row-Level Security على PostgreSQL، وقاموس مُنمَّط FR/EN/AR يقود دعم RTL كاملًا.',
      highlightsIntro: 'بعض ما أفخر به تحت الغطاء:',
      highlights: [
        { title: 'أمان متعدّد المستأجرين (RLS + RBAC)', body: 'كل جدول محميّ بـ Row-Level Security في PostgreSQL بحيث لا يصل المستخدمون إلا إلى بياناتهم. مسارات الإدارة محمية من جهة الخادم عبر دالة is_super_admin وتعيد التوجيه قبل جلب أي بيانات؛ وتُقدَّم الملفات العامة عبر استعلام محدود الأعمدة صراحةً، لا select * أبدًا.' },
        { title: 'طبقة بيانات آمنة تجاه الترحيلات', body: 'تتعامل طبقة البيانات بشفافية مع قاعدة لم تُشغِّل أحدث ترحيل بعد — بالرجوع إلى استعلام قديم بدل إطلاق خطأ — حتى لا يُخرج أي نشرٍ الملفات عن الخدمة.' },
        { title: 'صلاحيات متسقة', body: 'مصدر واحد PLAN_ENTITLEMENTS يقود التحكّم بالميزات (حدود الروابط، الصور، الكتالوج، نماذج العملاء) بشكل متطابق على العميل والخادم، ولا يستعلم الملف العام عن بيانات premium إلا إذا سمحت الباقة.' },
        { title: 'حماية من الإساءة', body: 'نقاط الكتابة العامة (العملاء المحتملون، التتبّع، الرفع) محدودة المعدّل عبر مفتاح مُجزّأ endpoint:ip:subject مع ترويسات Retry-After / X-RateLimit القياسية وحقول honeypot. ومحدِّد المعدّل الأساسي مُغطّى باختبارات وحدة.' },
        { title: 'تحليلات تحترم الخصوصية', body: 'تُسجَّل المشاهدات ونقرات الروابط عبر navigator.sendBeacon وتُزال تكراراتها لكل جلسة — لا يمكن للتحليلات أبدًا أن تعطّل الملف العام أو تكسره.' },
        { title: 'i18n حقيقي، بما في ذلك RTL', body: 'قاموس مُنمَّط يشغّل FR/EN/AR بالاتجاه الصحيح، وتنسيق للأرقام والعملات حسب اللغة، وأدوات تخطيط تراعي RTL. وتُصدَّر رموز QR بعلامتك الجاهزة للطباعة بصيغتَي PNG عالية الدقة وSVG المتجهي، بالكامل من جهة العميل.' }
      ],
      screenshotsIntro:
        'مُلتقَطة في وضع العرض التوضيحي بلا إعداد داخل التطبيق — الصفحة الرئيسية ثلاثية اللغة (الإنجليزية + العربية RTL)، والملف العام، ومعالج الإعداد، ولوحة تحكّم المُنشئ.',
      screenshots: [
        { title: 'الصفحة الرئيسية — الإنجليزية', desc: 'صفحة تسويقية ثلاثية اللغة مع أسعار بالدينار وأسئلة شائعة ومتجر بطاقات NFC.' },
        { title: 'الصفحة الرئيسية — العربية (RTL)', desc: 'اختيار العربية يقلب التخطيط بالكامل إلى اليمين-لليسار عبر document.documentElement.dir.' },
        { title: 'الملف العام (جوال)', desc: 'الواجهة الأساسية للمنتج — الجوال أولًا، وWhatsApp أولًا، وvCard بلمسة واحدة، ونقرات روابط مُتتبَّعة.' },
        { title: 'معالج الإعداد', desc: 'معالج تكيّفي من 5 خطوات يوصي بباقة وقالب وروابط بداية — مع معاينة حيّة على هيئة هاتف.' },
        { title: 'نظرة عامة على لوحة التحكّم', desc: 'الصفحة الرئيسية للمُنشئ: حالة الملف، والتحليلات، والإجراءات السريعة.' },
        { title: 'إدارة الروابط', desc: 'أعد الترتيب، وأخفِ، واطّلع على إحصاءات النقر لكل رابط.' },
        { title: 'المظهر والسمات', desc: 'قوالب وألوان الملف، محكومة بالباقة.' },
        { title: 'استوديو رمز QR', desc: 'تصدير QR بعلامتك جاهز للطباعة بصيغتَي PNG وSVG.' },
        { title: 'اطلب بطاقة NFC', desc: 'دفع يراعي الولاية لبطاقات PVC المادية — عند الاستلام أو عبر BaridiMob.' }
      ]
    }
  }
};

export const LinqoProject: React.FC = () => <ProjectCaseStudy data={data} />;
