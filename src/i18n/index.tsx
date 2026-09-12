/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'en' | 'fr' | 'ar';
export type Dir = 'ltr' | 'rtl';

export const LANGS: { code: Lang; label: string; dir: Dir }[] = [
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'fr', label: 'FR', dir: 'ltr' },
  { code: 'ar', label: 'AR', dir: 'rtl' }
];

// --- English (source of truth) ---
const en = {
  nav: { home: 'home', about: 'about', work: 'work', services: 'services', writing: 'writing', reachOut: 'reach out' },
  hero: {
    badge: 'AVAILABLE FOR OPPORTUNITIES',
    name: 'Anes Hamdaoui',
    subtitlePre: 'Full Stack Developer',
    subtitlePost: 'Building Systems that Scale',
    description:
      'I am a Full Stack Developer specializing in robust backend architectures using C#, ASP.NET Core, and Clean Architecture combined with responsive frontends built in React and TypeScript. I focus on writing clean, maintainable systems, optimization, and solving complex engineering challenges.',
    downloadCv: 'Download CV',
    viewWork: 'View Work',
    coreStack: 'CORE STACK'
  },
  problem: {
    title: 'The Problem',
    lede: 'Product code does not become messy all at once. It piles up quietly until every release feels slower than the last one.',
    note: 'I help turn that pressure into structure: clearer domains, cleaner APIs, predictable interfaces, and systems that are easier to keep shipping.',
    issues: [
      { title: 'Features take longer than they should', desc: 'Change one flow, and five other places need attention. The system starts charging interest on every new feature.' },
      { title: 'Backend rules live in too many places', desc: 'Validation, scheduling, permissions, and data access become hard to reason about when boundaries are unclear.' },
      { title: 'Frontend and API contracts drift', desc: 'Screens work until the data shape changes. Then fixes become reactive instead of designed.' },
      { title: 'Performance gets noticed late', desc: 'Queries, payloads, and rendering paths slowly get heavier until users feel it first.' }
    ]
  },
  about: {
    title: 'Who I Am',
    body: 'I build full-stack systems with clear backend rules, practical database design, and React interfaces that stay fast enough to feel calm. I like turning messy product logic into code your team can actually reason about.',
    moreAboutMe: 'More about me',
    stats: [
      { label: 'full-stack systems', detail: 'healthcare, workflow, portfolio' },
      { label: 'core technologies', detail: '.NET, React, SQL, Docker' },
      { label: 'backend focus', detail: 'architecture and data flow' },
      { label: 'computer science', detail: 'B.Sc. graduation track' }
    ]
  },
  philosophy: {
    title: 'Thinking In Systems',
    principles: [
      { tag: 'SYSTEM DESIGN', title: 'Clean Architecture & SOLID', desc: 'Advocate for clean code principles. I structure backend applications using Clean Architecture and DDD (Domain Driven Design), ensuring separation of concerns, complete testability, and painless maintenance.' },
      { tag: 'API ENGINEERING', title: 'Performance & Optimization', desc: 'Optimizing data access paths using EF Core, specialized database schemas, CQRS with MediatR, caching, and robust security protocols like JWT authentication and role-based access control.' },
      { tag: 'PRODUCT EXECUTION', title: 'Reliability & Extensibility', desc: 'Writing code that is meant to grow. Designing systems with scheduling conflict prevention, validating core business rules, preventing double-bookings, and ensuring fail-safe deployments via Docker.' }
    ]
  },
  services: {
    title: 'Technical Offerings',
    items: [
      { title: 'Full-Stack Web Apps', desc: 'Building cohesive, end-to-end web products. I leverage robust backend web APIs in C#/.NET and bind them with interactive, fast frontends using React and TypeScript.' },
      { title: 'API & Backend Design', desc: 'Architecting high-concurrency RESTful APIs under Clean Architecture guidelines, incorporating CQRS patterns with MediatR, JWT authentication, and structured logging.' },
      { title: 'Database & Systems', desc: 'Database modeling and query tuning in SQL Server, PostgreSQL, and MySQL. Integrating ORMs like Entity Framework Core and ensuring data integrity with strict transaction scopes.' }
    ]
  },
  projects: {
    title: 'Featured Work',
    cta: 'Talk about a project',
    viewCaseStudy: 'View case study'
  },
  caseStudy: {
    allProjects: 'All Projects',
    whatItIs: 'What It Is',
    technologies: 'Technologies',
    highlights: 'Engineering Highlights',
    screenshots: 'Product Screenshots',
    viewShot: 'View'
  },
  writing: {
    title: 'Latest Writing',
    readMore: 'Read more',
    posts: [
      { title: 'Clean Architecture for Small Teams: What Actually Helps', desc: 'Where boundaries, CQRS, and validation rules pay off in real full-stack products.' },
      { title: 'Designing React Screens Around API Contracts', desc: 'A practical note on keeping frontend state, request shapes, and backend rules aligned.' }
    ]
  },
  proof: {
    title: 'What Others Say',
    quotes: [
      { quote: 'Anes brings the kind of persistence you want on a technical product: he keeps tracing the issue until the system makes sense again.', person: 'Project Collaborator', role: 'Full-stack build review' },
      { quote: 'He thinks about backend structure, data flow, and interface behavior together. That makes the work easier to understand and easier to extend.', person: 'Peer Developer', role: 'Architecture feedback' }
    ]
  },
  contact: {
    title: "Let's Talk",
    body: 'I am open to developer roles, collaborations, and projects that need clear backend structure with a polished React frontend.',
    availability: 'Limited availability — accepting select projects for 2026',
    cta: 'Tell me what you are building',
    location: 'Algeria'
  },
  footer: {
    tagline: 'built with structure. tuned for momentum.',
    madeIn: 'Made in Algeria //',
    links: { home: 'home', about: 'about', work: 'work', services: 'services', writing: 'writing', contact: 'contact' }
  },
  contactPage: {
    title: 'Contact',
    intro: 'I read every message. I will get back to you within 2-3 business days.',
    availability: 'Limited availability — accepting select projects for 2026',
    reachTitle: 'How to Reach Me',
    reachLede: 'Email works best. Tell me what is going on and I will take it from there.',
    formTitle: 'Send a message',
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Your email *',
    emailPlaceholder: 'you@example.com',
    phone: 'Phone *',
    phonePlaceholder: '+213 ...',
    subject: 'Subject *',
    subjectPlaceholder: 'What is this about?',
    message: 'Message *',
    messagePlaceholder: 'Tell me what you are building...',
    send: 'Send message',
    sending: 'Sending...',
    error: 'Something went wrong. Please email me directly at',
    emailPreferred: 'Email (Preferred)',
    sendEmail: 'Send email',
    copy: 'copy',
    copied: 'copied',
    linkedin: 'LinkedIn',
    viewProfile: 'View profile',
    allLinks: 'All Links',
    allLinksValue: 'GitHub, projects, and more',
    viewAll: 'View all',
    processTitle: 'What Happens Next',
    steps: [
      { title: 'I review and respond', desc: 'I will get back to you within 2-3 business days with my thoughts or a few questions.' },
      { title: 'We schedule a call', desc: 'If it looks like a fit, we hop on a 30-minute call to talk it through.' },
      { title: 'Proposal or referral', desc: 'I will send a proposal if we are a match. If not, I will point you somewhere that makes more sense.' }
    ],
    successTitle: 'Message sent',
    successThanks: 'Thanks for reaching out',
    successRest: 'your message is on its way. I will get back to you within 2-3 business days.',
    done: 'Done'
  }
};

export type Dict = typeof en;

// --- Français ---
const fr: Dict = {
  nav: { home: 'accueil', about: 'à propos', work: 'projets', services: 'services', writing: 'articles', reachOut: 'me contacter' },
  hero: {
    badge: 'DISPONIBLE POUR DE NOUVELLES OPPORTUNITÉS',
    name: 'Anes Hamdaoui',
    subtitlePre: 'Développeur Full Stack',
    subtitlePost: 'Je construis des systèmes qui passent à l’échelle',
    description:
      'Je suis développeur Full Stack, spécialisé dans les architectures backend robustes en C#, ASP.NET Core et Clean Architecture, associées à des interfaces réactives développées en React et TypeScript. Je me concentre sur des systèmes propres et maintenables, l’optimisation et la résolution de défis d’ingénierie complexes.',
    downloadCv: 'Télécharger le CV',
    viewWork: 'Voir les projets',
    coreStack: 'STACK PRINCIPALE'
  },
  problem: {
    title: 'Le Problème',
    lede: 'Le code d’un produit ne devient pas désordonné d’un coup. Il s’accumule discrètement jusqu’à ce que chaque livraison paraisse plus lente que la précédente.',
    note: 'J’aide à transformer cette pression en structure : des domaines plus clairs, des API plus propres, des interfaces prévisibles et des systèmes plus faciles à faire évoluer.',
    issues: [
      { title: 'Les fonctionnalités prennent plus de temps que prévu', desc: 'Modifiez un flux, et cinq autres endroits demandent votre attention. Le système facture des intérêts sur chaque nouvelle fonctionnalité.' },
      { title: 'Les règles backend sont éparpillées', desc: 'La validation, la planification, les permissions et l’accès aux données deviennent difficiles à raisonner quand les frontières sont floues.' },
      { title: 'Le frontend et les contrats d’API divergent', desc: 'Les écrans fonctionnent jusqu’à ce que la forme des données change. Les correctifs deviennent alors réactifs plutôt que pensés.' },
      { title: 'Les problèmes de performance sont vus trop tard', desc: 'Les requêtes, les charges utiles et les rendus s’alourdissent lentement, jusqu’à ce que les utilisateurs le ressentent en premier.' }
    ]
  },
  about: {
    title: 'Qui Je Suis',
    body: 'Je construis des systèmes full-stack avec des règles backend claires, une conception de base de données pragmatique et des interfaces React assez rapides pour rester agréables. J’aime transformer une logique produit désordonnée en un code que votre équipe peut réellement comprendre.',
    moreAboutMe: 'En savoir plus sur moi',
    stats: [
      { label: 'systèmes full-stack', detail: 'santé, workflow, portfolio' },
      { label: 'technologies clés', detail: '.NET, React, SQL, Docker' },
      { label: 'axé backend', detail: 'architecture et flux de données' },
      { label: 'informatique', detail: 'parcours de licence (B.Sc.)' }
    ]
  },
  philosophy: {
    title: 'Penser en Systèmes',
    principles: [
      { tag: 'CONCEPTION SYSTÈME', title: 'Clean Architecture & SOLID', desc: 'Défenseur des principes de code propre. Je structure les applications backend avec la Clean Architecture et le DDD (Domain Driven Design), garantissant la séparation des responsabilités, une testabilité complète et une maintenance sans douleur.' },
      { tag: 'INGÉNIERIE D’API', title: 'Performance & Optimisation', desc: 'Optimisation des accès aux données avec EF Core, schémas de base de données spécialisés, CQRS avec MediatR, mise en cache et protocoles de sécurité robustes comme l’authentification JWT et le contrôle d’accès par rôles.' },
      { tag: 'EXÉCUTION PRODUIT', title: 'Fiabilité & Extensibilité', desc: 'Écrire du code destiné à évoluer. Concevoir des systèmes qui préviennent les conflits de planification, valident les règles métier essentielles, évitent les doubles réservations et assurent des déploiements fiables via Docker.' }
    ]
  },
  services: {
    title: 'Offres Techniques',
    items: [
      { title: 'Applications Web Full-Stack', desc: 'Construire des produits web cohérents, de bout en bout. Je m’appuie sur des API backend robustes en C#/.NET et les relie à des frontends interactifs et rapides en React et TypeScript.' },
      { title: 'Conception d’API & Backend', desc: 'Concevoir des API RESTful à forte concurrence selon les principes de la Clean Architecture, avec des patterns CQRS via MediatR, l’authentification JWT et une journalisation structurée.' },
      { title: 'Bases de Données & Systèmes', desc: 'Modélisation de bases de données et optimisation de requêtes sur SQL Server, PostgreSQL et MySQL. Intégration d’ORM comme Entity Framework Core et intégrité des données garantie par des transactions strictes.' }
    ]
  },
  projects: {
    title: 'Projets en Vedette',
    cta: 'Parlons d’un projet',
    viewCaseStudy: 'Voir l’étude de cas'
  },
  caseStudy: {
    allProjects: 'Tous les projets',
    whatItIs: 'Ce que c’est',
    technologies: 'Technologies',
    highlights: 'Points techniques',
    screenshots: 'Captures du produit',
    viewShot: 'Voir'
  },
  writing: {
    title: 'Derniers Articles',
    readMore: 'Lire plus',
    posts: [
      { title: 'La Clean Architecture pour les petites équipes : ce qui aide vraiment', desc: 'Là où les frontières, le CQRS et les règles de validation portent leurs fruits dans de vrais produits full-stack.' },
      { title: 'Concevoir des écrans React autour des contrats d’API', desc: 'Une note pratique pour garder l’état du frontend, la forme des requêtes et les règles backend alignés.' }
    ]
  },
  proof: {
    title: 'Ce Qu’On Dit',
    quotes: [
      { quote: 'Anes fait preuve de la persévérance qu’on attend sur un produit technique : il remonte le problème jusqu’à ce que le système reprenne tout son sens.', person: 'Collaborateur de projet', role: 'Revue de build full-stack' },
      { quote: 'Il pense la structure backend, le flux de données et le comportement de l’interface ensemble. Cela rend le travail plus facile à comprendre et à étendre.', person: 'Développeur pair', role: 'Retour d’architecture' }
    ]
  },
  contact: {
    title: 'Discutons',
    body: 'Je suis ouvert aux postes de développeur, aux collaborations et aux projets qui ont besoin d’une structure backend claire avec un frontend React soigné.',
    availability: 'Disponibilité limitée — quelques projets acceptés pour 2026',
    cta: 'Dites-moi ce que vous construisez',
    location: 'Algérie'
  },
  footer: {
    tagline: 'construit avec structure. réglé pour l’élan.',
    madeIn: 'Fait en Algérie //',
    links: { home: 'accueil', about: 'à propos', work: 'projets', services: 'services', writing: 'articles', contact: 'contact' }
  },
  contactPage: {
    title: 'Contact',
    intro: 'Je lis chaque message. Je vous réponds sous 2 à 3 jours ouvrés.',
    availability: 'Disponibilité limitée — quelques projets acceptés pour 2026',
    reachTitle: 'Comment Me Joindre',
    reachLede: 'L’e-mail reste le meilleur moyen. Dites-moi ce qu’il en est et je prends le relais.',
    formTitle: 'Envoyer un message',
    name: 'Nom',
    namePlaceholder: 'Votre nom',
    email: 'Votre e-mail *',
    emailPlaceholder: 'vous@exemple.com',
    phone: 'Téléphone *',
    phonePlaceholder: '+213 ...',
    subject: 'Objet *',
    subjectPlaceholder: 'De quoi s’agit-il ?',
    message: 'Message *',
    messagePlaceholder: 'Dites-moi ce que vous construisez...',
    send: 'Envoyer le message',
    sending: 'Envoi...',
    error: 'Une erreur est survenue. Écrivez-moi directement à',
    emailPreferred: 'E-mail (Préféré)',
    sendEmail: 'Envoyer un e-mail',
    copy: 'copier',
    copied: 'copié',
    linkedin: 'LinkedIn',
    viewProfile: 'Voir le profil',
    allLinks: 'Tous les liens',
    allLinksValue: 'GitHub, projets et plus',
    viewAll: 'Voir tout',
    processTitle: 'Et Ensuite',
    steps: [
      { title: 'Je lis et je réponds', desc: 'Je reviens vers vous sous 2 à 3 jours ouvrés avec mon avis ou quelques questions.' },
      { title: 'On planifie un appel', desc: 'Si ça semble correspondre, on fait un appel de 30 minutes pour en discuter.' },
      { title: 'Proposition ou orientation', desc: 'Je vous envoie une proposition si nous sommes faits pour travailler ensemble. Sinon, je vous oriente vers ce qui a plus de sens.' }
    ],
    successTitle: 'Message envoyé',
    successThanks: 'Merci de m’avoir écrit',
    successRest: 'votre message est en route. Je vous réponds sous 2 à 3 jours ouvrés.',
    done: 'Terminé'
  }
};

// --- العربية ---
const ar: Dict = {
  nav: { home: 'الرئيسية', about: 'من أنا', work: 'الأعمال', services: 'الخدمات', writing: 'مقالات', reachOut: 'تواصل معي' },
  hero: {
    badge: 'متاح لفرص العمل',
    name: 'أنس حمداوي',
    subtitlePre: 'مطوّر Full Stack',
    subtitlePost: 'أبني أنظمة قابلة للتوسّع',
    description:
      'أنا مطوّر Full Stack متخصّص في بناء معماريات خلفية قوية باستخدام C# وASP.NET Core وClean Architecture، مع واجهات أمامية سريعة الاستجابة مبنية بـ React وTypeScript. أركّز على كتابة أنظمة نظيفة وقابلة للصيانة، وعلى التحسين وحلّ التحدّيات الهندسية المعقّدة.',
    downloadCv: 'تحميل السيرة الذاتية',
    viewWork: 'عرض الأعمال',
    coreStack: 'التقنيات الأساسية'
  },
  problem: {
    title: 'المشكلة',
    lede: 'شيفرة المنتج لا تصبح فوضوية دفعة واحدة، بل تتراكم بهدوء حتى يبدو كل إصدار أبطأ من سابقه.',
    note: 'أساعد على تحويل هذا الضغط إلى بنية منظّمة: مجالات أوضح، وواجهات برمجية أنظف، وواجهات متوقّعة السلوك، وأنظمة يسهل الاستمرار في تطويرها.',
    issues: [
      { title: 'الميزات تستغرق وقتًا أطول مما ينبغي', desc: 'تُعدّل مسارًا واحدًا فتحتاج خمسة مواضع أخرى إلى الاهتمام. يبدأ النظام في فرض «فائدة» على كل ميزة جديدة.' },
      { title: 'قواعد الخلفية موزّعة في أماكن كثيرة', desc: 'يصبح التحقّق والجدولة والصلاحيات والوصول إلى البيانات صعب الفهم عندما تكون الحدود غير واضحة.' },
      { title: 'انحراف بين الواجهة الأمامية وعقود الـ API', desc: 'تعمل الشاشات حتى يتغيّر شكل البيانات، فتصبح الإصلاحات ردّ فعل بدل أن تكون مُصمَّمة.' },
      { title: 'مشاكل الأداء تُكتشف متأخّرًا', desc: 'تزداد الاستعلامات والحمولات ومسارات العرض ثِقلًا ببطء حتى يشعر بها المستخدمون أولًا.' }
    ]
  },
  about: {
    title: 'من أنا',
    body: 'أبني أنظمة Full-Stack بقواعد خلفية واضحة، وتصميم عملي لقواعد البيانات، وواجهات React سريعة بما يكفي لتبقى مريحة. أحبّ تحويل منطق المنتج المتشابك إلى شيفرة يستطيع فريقك فهمها فعلًا.',
    moreAboutMe: 'المزيد عنّي',
    stats: [
      { label: 'أنظمة Full-Stack', detail: 'صحّة، سير عمل، بورتفوليو' },
      { label: 'تقنيات أساسية', detail: '.NET، React، SQL، Docker' },
      { label: 'تركيز على الخلفية', detail: 'المعمارية وتدفّق البيانات' },
      { label: 'علوم الحاسوب', detail: 'مسار إجازة (B.Sc.)' }
    ]
  },
  philosophy: {
    title: 'التفكير بالأنظمة',
    principles: [
      { tag: 'تصميم الأنظمة', title: 'Clean Architecture و SOLID', desc: 'مؤمن بمبادئ الشيفرة النظيفة. أبني تطبيقات الخلفية باستخدام Clean Architecture وDDD (التصميم الموجّه بالمجال)، بما يضمن فصل المسؤوليات وقابلية اختبار كاملة وصيانة سهلة.' },
      { tag: 'هندسة الـ API', title: 'الأداء والتحسين', desc: 'تحسين مسارات الوصول إلى البيانات باستخدام EF Core ومخطّطات قواعد بيانات متخصّصة وCQRS مع MediatR والتخزين المؤقّت وبروتوكولات أمان قوية مثل مصادقة JWT والتحكّم بالوصول حسب الأدوار.' },
      { tag: 'تنفيذ المنتج', title: 'الموثوقية وقابلية التوسّع', desc: 'كتابة شيفرة مُعدّة للنموّ. تصميم أنظمة تمنع تعارض الجدولة، وتتحقّق من قواعد العمل الأساسية، وتمنع الحجز المزدوج، وتضمن نشرًا آمنًا عبر Docker.' }
    ]
  },
  services: {
    title: 'الخدمات التقنية',
    items: [
      { title: 'تطبيقات ويب Full-Stack', desc: 'بناء منتجات ويب متكاملة من الطرف إلى الطرف. أعتمد على واجهات برمجية خلفية قوية بـ C#/.NET وأربطها بواجهات أمامية تفاعلية وسريعة بـ React وTypeScript.' },
      { title: 'تصميم الـ API والخلفية', desc: 'تصميم واجهات RESTful عالية التزامن وفق مبادئ Clean Architecture، مع أنماط CQRS عبر MediatR ومصادقة JWT وتسجيل مُهيكل.' },
      { title: 'قواعد البيانات والأنظمة', desc: 'نمذجة قواعد البيانات وضبط الاستعلامات في SQL Server وPostgreSQL وMySQL. دمج أدوات ORM مثل Entity Framework Core وضمان سلامة البيانات عبر نطاقات معاملات صارمة.' }
    ]
  },
  projects: {
    title: 'أعمال مختارة',
    cta: 'لنتحدّث عن مشروع',
    viewCaseStudy: 'عرض دراسة الحالة'
  },
  caseStudy: {
    allProjects: 'كل المشاريع',
    whatItIs: 'ما هو المشروع',
    technologies: 'التقنيات',
    highlights: 'أبرز الجوانب الهندسية',
    screenshots: 'لقطات من المنتج',
    viewShot: 'عرض'
  },
  writing: {
    title: 'أحدث المقالات',
    readMore: 'اقرأ المزيد',
    posts: [
      { title: 'Clean Architecture للفرق الصغيرة: ما الذي يفيد فعلًا', desc: 'أين تؤتي الحدود وCQRS وقواعد التحقّق ثمارها في منتجات Full-Stack حقيقية.' },
      { title: 'تصميم شاشات React حول عقود الـ API', desc: 'ملاحظة عملية للحفاظ على تناسق حالة الواجهة وأشكال الطلبات وقواعد الخلفية.' }
    ]
  },
  proof: {
    title: 'ماذا يقول الآخرون',
    quotes: [
      { quote: 'يتمتّع أنس بالمثابرة التي تريدها في منتج تقني: يتتبّع المشكلة حتى يعود النظام منطقيًا من جديد.', person: 'زميل في المشروع', role: 'مراجعة بناء Full-Stack' },
      { quote: 'يفكّر في بنية الخلفية وتدفّق البيانات وسلوك الواجهة معًا، ما يجعل العمل أسهل فهمًا وأسهل توسّعًا.', person: 'مطوّر زميل', role: 'ملاحظات معمارية' }
    ]
  },
  contact: {
    title: 'لنتحدّث',
    body: 'أنا منفتح على أدوار التطوير والتعاونات والمشاريع التي تحتاج إلى بنية خلفية واضحة مع واجهة React متقنة.',
    availability: 'توفّر محدود — أقبل مشاريع مختارة لعام 2026',
    cta: 'أخبرني بما تبنيه',
    location: 'الجزائر'
  },
  footer: {
    tagline: 'مبنيّ بهيكلة. مضبوط للانطلاق.',
    madeIn: 'صُنع في الجزائر //',
    links: { home: 'الرئيسية', about: 'من أنا', work: 'الأعمال', services: 'الخدمات', writing: 'مقالات', contact: 'تواصل' }
  },
  contactPage: {
    title: 'تواصل',
    intro: 'أقرأ كل رسالة. سأردّ عليك خلال يومين إلى ثلاثة أيام عمل.',
    availability: 'توفّر محدود — أقبل مشاريع مختارة لعام 2026',
    reachTitle: 'كيف تصل إليّ',
    reachLede: 'البريد الإلكتروني هو الأفضل. أخبرني بما يجري وسأتولّى الأمر من هناك.',
    formTitle: 'أرسل رسالة',
    name: 'الاسم',
    namePlaceholder: 'اسمك',
    email: 'بريدك الإلكتروني *',
    emailPlaceholder: 'you@example.com',
    phone: 'الهاتف *',
    phonePlaceholder: '... 213+',
    subject: 'الموضوع *',
    subjectPlaceholder: 'ما هذا الموضوع؟',
    message: 'الرسالة *',
    messagePlaceholder: 'أخبرني بما تبنيه...',
    send: 'إرسال الرسالة',
    sending: 'جارٍ الإرسال...',
    error: 'حدث خطأ ما. راسلني مباشرةً على',
    emailPreferred: 'البريد الإلكتروني (المفضّل)',
    sendEmail: 'إرسال بريد',
    copy: 'نسخ',
    copied: 'تم النسخ',
    linkedin: 'LinkedIn',
    viewProfile: 'عرض الملف',
    allLinks: 'كل الروابط',
    allLinksValue: 'GitHub والمشاريع والمزيد',
    viewAll: 'عرض الكل',
    processTitle: 'ماذا يحدث بعد ذلك',
    steps: [
      { title: 'أراجع وأردّ', desc: 'سأعود إليك خلال يومين إلى ثلاثة أيام عمل برأيي أو ببعض الأسئلة.' },
      { title: 'نحدّد موعد مكالمة', desc: 'إذا بدا الأمر مناسبًا، نجري مكالمة مدّتها 30 دقيقة لمناقشته.' },
      { title: 'عرض أو توجيه', desc: 'سأرسل عرضًا إذا كنّا متوافقين. وإن لم يكن كذلك، سأوجّهك إلى ما هو أنسب.' }
    ],
    successTitle: 'تم إرسال الرسالة',
    successThanks: 'شكرًا لتواصلك',
    successRest: 'رسالتك في طريقها إليّ. سأردّ عليك خلال يومين إلى ثلاثة أيام عمل.',
    done: 'تم'
  }
};

const dictionaries: Record<Lang, Dict> = { en, fr, ar };

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: Dir;
  t: Dict;
}

const I18nContext = createContext<I18nValue | null>(null);

const getInitialLang = (): Lang => {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'fr' || saved === 'ar') return saved;
  } catch {
    /* ignore */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2).toLowerCase() : 'en';
  if (nav === 'fr') return 'fr';
  if (nav === 'ar') return 'ar';
  return 'en';
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const dir: Dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo<I18nValue>(() => ({ lang, setLang, dir, t: dictionaries[lang] }), [lang, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider');
  return ctx;
};
