/**
 * Dictionnaires de traduction du site (runtime, basé sur les signals).
 *
 * Le français sert de référence de structure : les autres langues sont typées
 * contre `Dict`, donc toute clé manquante déclenche une erreur de compilation.
 *
 * Les icônes (glyphes/SVG) et les noms propres (marque, réseaux) restent dans
 * les composants : seul le texte traduisible vit ici.
 */

export type Lang = 'fr' | 'en' | 'ar' | 'es';

export const LANGS: { code: Lang; label: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'es', label: 'Español', dir: 'ltr' },
];

export interface Dict {
  nav: {
    home: string;
    services: string;
    about: string;
    portfolio: string;
    demos: string;
    contact: string;
    contactCta: string;
  };
  hero: {
    eyebrow: string;
    lead: string;
    domains: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    items: { title: string; description: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    photoTag: string;
    tagline: string;
    intro: string;
    approach: string;
    values: { title: string; subtitle: string }[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    lead: string;
    prev: string;
    next: string;
    projects: { tag: string; title: string; description: string; alt: string }[];
  };
  demos: {
    eyebrow: string;
    title: string;
    lead: string;
    prev: string;
    next: string;
    play: string;
    items: { tag: string; title: string; description: string; ariaLabel: string }[];
  };
  stats: {
    eyebrow: string;
    title: string;
    items: { value: string; label: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    location: string;
    availability: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    serviceLabel: string;
    budgetLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    serviceOptions: string[];
    budgetOptions: string[];
    notes: { idle: string; draftOpened: string; error: string };
    errors: {
      required: string;
      messageRequired: string;
      email: string;
      minlength: string;
      invalid: string;
    };
  };
  footer: {
    rights: string;
    backToTop: string;
  };
  social: {
    email: string;
  };
  player: {
    close: string;
  };
  /** Noms des langues, localisés dans la langue courante (affichés dans le sélecteur). */
  langNames: Record<Lang, string>;
}

const fr: Dict = {
  nav: {
    home: 'Accueil',
    services: 'Services',
    about: 'À propos',
    portfolio: 'Portfolio',
    demos: 'Démos de sites web',
    contact: 'Contact',
    contactCta: 'Contactez-nous',
  },
  hero: {
    eyebrow: 'Agence digitale',
    lead: 'Des solutions digitales sur mesure pour propulser votre entreprise vers le succès.',
    domains: ['Sites web', 'Marketing digital', 'Montage vidéo', 'Design & branding', 'Solutions sur mesure'],
    ctaPrimary: 'Découvrir nos services',
    ctaSecondary: 'Discutons de votre projet',
  },
  services: {
    eyebrow: 'Nos services',
    title: 'Des solutions complètes pour votre présence digitale',
    lead: 'Nous vous accompagnons à chaque étape de votre projet, de la création de votre site web à la gestion de votre visibilité en ligne.',
    items: [
      { title: 'Création de sites web', description: 'Sites vitrines, e-commerce et applications web adaptés à vos objectifs.' },
      { title: 'Marketing digital', description: 'SEO, publicités en ligne et stratégie de contenu pour toucher vos clients.' },
      { title: 'Montage vidéo', description: 'Reels, vidéos promotionnelles et formats courts pour les réseaux sociaux.' },
      { title: 'Design & Branding', description: 'Identité visuelle, logos et visuels cohérents avec votre marque.' },
      { title: 'Maintenance & Support', description: 'Mises à jour, sécurité, corrections et optimisation de votre site.' },
      { title: 'Conseil & Accompagnement', description: 'Une stratégie digitale adaptée à vos besoins et à vos objectifs.' },
    ],
  },
  about: {
    eyebrow: 'À propos de nous',
    title: 'Une agence digitale proche de vos ambitions',
    photoTag: 'Votre partenaire digital',
    tagline: 'Création web, marketing digital et identité de marque.',
    intro: 'est une agence digitale en lancement, pensée pour accompagner les entreprises dans la création de solutions web et leur communication digitale.',
    approach: 'Notre approche associe expertise technique, créativité et accompagnement personnalisé pour vous aider à construire une présence en ligne cohérente et durable.',
    values: [
      { title: 'Expertise technique', subtitle: 'Des solutions adaptées à vos besoins' },
      { title: 'Créativité', subtitle: 'Une image qui vous ressemble' },
      { title: 'Accompagnement', subtitle: 'Un interlocuteur à votre écoute' },
      { title: 'Orientation résultats', subtitle: 'Des objectifs définis ensemble' },
    ],
  },
  portfolio: {
    eyebrow: 'Nos réalisations',
    title: 'Des idées transformées en expériences digitales',
    lead: 'Découvrez quelques exemples de projets représentatifs de nos domaines de compétence.',
    prev: 'Réalisations précédentes',
    next: 'Réalisations suivantes',
    projects: [
      { tag: 'Développement web', title: 'Site vitrine — Restaurant', description: 'Un site élégant pour présenter un établissement, son menu et ses coordonnées.', alt: 'Ambiance de restaurant' },
      { tag: 'Marketing digital', title: 'Campagne pour les réseaux sociaux', description: "Une direction visuelle cohérente pour renforcer la présence d'une marque.", alt: 'Design graphique et supports de communication' },
      { tag: 'Production vidéo', title: 'Vidéo promotionnelle', description: 'Un format vidéo dynamique conçu pour présenter un produit ou un service.', alt: 'Équipement de production vidéo' },
    ],
  },
  demos: {
    eyebrow: 'Démonstrations de sites web',
    title: 'Visitez nos projets en vidéo',
    lead: "Découvrez l'expérience de navigation, les pages et les fonctionnalités de sites web conçus pour différents secteurs d'activité.",
    prev: 'Démonstrations précédentes',
    next: 'Démonstrations suivantes',
    play: 'Lire la démonstration',
    items: [
      { tag: 'Restauration', title: 'Site web de restaurant', description: 'Présentation du restaurant, mise en valeur du menu et parcours de réservation.', ariaLabel: 'Démonstration du site web de restaurant' },
      { tag: 'Commerce en ligne', title: 'Site e-commerce', description: "Présentation des produits, catégories et parcours d'achat d'une boutique en ligne.", ariaLabel: 'Démonstration du site e-commerce' },
      { tag: 'Immobilier', title: 'Site web immobilier', description: 'Vitrine de biens, fiches de propriétés et expérience de recherche simplifiée.', ariaLabel: "Démonstration d'un site immobilier" },
      { tag: 'Santé', title: 'Site cabinet médical', description: "Présentation de l'équipe, spécialités et prise de rendez-vous en ligne.", ariaLabel: "Démonstration d'un site de cabinet médical" },
      { tag: 'Voyage', title: 'Site agence de voyage', description: 'Offres de séjours, destinations phares et réservation d’itinéraires.', ariaLabel: "Démonstration d'un site d'agence de voyage" },
      { tag: 'Mode', title: 'Site de marque mode', description: 'Collections saisonnières, lookbooks et expérience mobile-first.', ariaLabel: "Démonstration d'une boutique de mode" },
    ],
  },
  stats: {
    eyebrow: 'Nos engagements',
    title: 'Une collaboration pensée pour vous',
    items: [
      { value: 'Sur mesure', label: 'Selon vos objectifs' },
      { value: 'Multi-services', label: 'Un seul interlocuteur' },
      { value: 'À vos côtés', label: 'Du brief à la livraison' },
      { value: 'International', label: 'Tunisie, France et ailleurs' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Parlons de votre projet',
    lead: 'Vous avez une idée ? Nous pouvons vous aider à la concrétiser. Présentez-nous votre besoin et nous reviendrons vers vous.',
    location: 'Tunisie · France · International',
    availability: 'Sur rendez-vous',
    nameLabel: 'Nom complet *',
    namePlaceholder: 'Votre nom',
    emailLabel: 'Adresse e-mail *',
    emailPlaceholder: 'vous@exemple.com',
    serviceLabel: 'Service souhaité',
    budgetLabel: 'Budget estimé',
    messageLabel: 'Parlez-nous de votre projet *',
    messagePlaceholder: 'Votre besoin, vos objectifs, vos délais…',
    submit: 'Préparer mon message',
    sending: 'Préparation…',
    serviceOptions: ['Création de site web', 'Marketing digital', 'Montage vidéo', 'Design & branding', 'Maintenance & support', 'Autre demande'],
    budgetOptions: ['À définir', 'Moins de 1 000 DT', '1 000–3 000 DT', '3 000–6 000 DT', 'Plus de 6 000 DT', 'Budget en euros à définir'],
    notes: {
      idle: "Aucune donnée n'est transmise à un serveur : votre demande s'ouvre dans votre application e-mail.",
      draftOpened: "Votre demande est prête dans votre application e-mail. Si elle ne s'ouvre pas, écrivez-nous à {email}.",
      error: "L'ouverture de votre messagerie a échoué. Écrivez-nous directement à {email}.",
    },
    errors: {
      required: 'Ce champ est obligatoire.',
      messageRequired: 'Merci de décrire votre projet.',
      email: 'Adresse e-mail invalide (exemple : vous@exemple.com).',
      minlength: 'Encore quelques mots pour bien cerner votre besoin.',
      invalid: 'Ce champ est invalide.',
    },
  },
  footer: {
    rights: 'Tous droits réservés.',
    backToTop: 'Revenir en haut',
  },
  social: {
    email: 'E-mail',
  },
  player: {
    close: 'Fermer la vidéo',
  },
  langNames: { fr: 'Français', en: 'Anglais', ar: 'Arabe', es: 'Espagnol' },
};

const en: Dict = {
  nav: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    portfolio: 'Portfolio',
    demos: 'Website demos',
    contact: 'Contact',
    contactCta: 'Contact us',
  },
  hero: {
    eyebrow: 'Digital agency',
    lead: 'Tailor-made digital solutions to drive your business toward success.',
    domains: ['Websites', 'Digital marketing', 'Video editing', 'Design & branding', 'Custom solutions'],
    ctaPrimary: 'Explore our services',
    ctaSecondary: "Let's talk about your project",
  },
  services: {
    eyebrow: 'Our services',
    title: 'Complete solutions for your digital presence',
    lead: 'We support you at every stage of your project, from building your website to managing your online visibility.',
    items: [
      { title: 'Website creation', description: 'Showcase sites, e-commerce and web apps tailored to your goals.' },
      { title: 'Digital marketing', description: 'SEO, online advertising and content strategy to reach your customers.' },
      { title: 'Video editing', description: 'Reels, promotional videos and short formats for social media.' },
      { title: 'Design & Branding', description: 'Visual identity, logos and visuals consistent with your brand.' },
      { title: 'Maintenance & Support', description: 'Updates, security, fixes and optimization of your website.' },
      { title: 'Consulting & Guidance', description: 'A digital strategy tailored to your needs and your goals.' },
    ],
  },
  about: {
    eyebrow: 'About us',
    title: 'A digital agency close to your ambitions',
    photoTag: 'Your digital partner',
    tagline: 'Web creation, digital marketing and brand identity.',
    intro: 'is a newly launched digital agency, built to support companies in creating web solutions and their digital communication.',
    approach: 'Our approach combines technical expertise, creativity and personalized support to help you build a consistent and lasting online presence.',
    values: [
      { title: 'Technical expertise', subtitle: 'Solutions tailored to your needs' },
      { title: 'Creativity', subtitle: 'An image that reflects you' },
      { title: 'Support', subtitle: 'A partner who listens to you' },
      { title: 'Results-driven', subtitle: 'Goals defined together' },
    ],
  },
  portfolio: {
    eyebrow: 'Our work',
    title: 'Ideas turned into digital experiences',
    lead: 'Discover a few projects representative of our areas of expertise.',
    prev: 'Previous projects',
    next: 'Next projects',
    projects: [
      { tag: 'Web development', title: 'Showcase site — Restaurant', description: 'An elegant site to present a venue, its menu and its contact details.', alt: 'Restaurant atmosphere' },
      { tag: 'Digital marketing', title: 'Social media campaign', description: "A consistent visual direction to strengthen a brand's presence.", alt: 'Graphic design and communication materials' },
      { tag: 'Video production', title: 'Promotional video', description: 'A dynamic video format designed to present a product or service.', alt: 'Video production equipment' },
    ],
  },
  demos: {
    eyebrow: 'Website demos',
    title: 'Explore our projects on video',
    lead: 'Discover the browsing experience, pages and features of websites designed for various industries.',
    prev: 'Previous demos',
    next: 'Next demos',
    play: 'Play the demo',
    items: [
      { tag: 'Restaurant', title: 'Restaurant website', description: 'Restaurant presentation, menu highlights and a booking journey.', ariaLabel: 'Restaurant website demo' },
      { tag: 'Online store', title: 'E-commerce website', description: 'Products, categories and the purchase journey of an online store.', ariaLabel: 'E-commerce website demo' },
      { tag: 'Real estate', title: 'Real estate website', description: 'Property showcase, listing pages and a simplified search experience.', ariaLabel: 'Real estate website demo' },
      { tag: 'Healthcare', title: 'Medical practice website', description: 'Team presentation, specialties and online appointment booking.', ariaLabel: 'Medical practice website demo' },
      { tag: 'Travel', title: 'Travel agency website', description: 'Holiday offers, top destinations and itinerary booking.', ariaLabel: 'Travel agency website demo' },
      { tag: 'Fashion', title: 'Fashion brand website', description: 'Seasonal collections, lookbooks and a mobile-first experience.', ariaLabel: 'Fashion store demo' },
    ],
  },
  stats: {
    eyebrow: 'Our commitments',
    title: 'A collaboration designed for you',
    items: [
      { value: 'Tailor-made', label: 'Based on your goals' },
      { value: 'Multi-service', label: 'A single point of contact' },
      { value: 'By your side', label: 'From brief to delivery' },
      { value: 'International', label: 'Tunisia, France and beyond' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about your project",
    lead: 'Got an idea? We can help you make it happen. Tell us about your needs and we will get back to you.',
    location: 'Tunisia · France · International',
    availability: 'By appointment',
    nameLabel: 'Full name *',
    namePlaceholder: 'Your name',
    emailLabel: 'Email address *',
    emailPlaceholder: 'you@example.com',
    serviceLabel: 'Desired service',
    budgetLabel: 'Estimated budget',
    messageLabel: 'Tell us about your project *',
    messagePlaceholder: 'Your needs, your goals, your timeline…',
    submit: 'Prepare my message',
    sending: 'Preparing…',
    serviceOptions: ['Website creation', 'Digital marketing', 'Video editing', 'Design & branding', 'Maintenance & support', 'Other request'],
    budgetOptions: ['To be defined', 'Less than 1,000 DT', '1,000–3,000 DT', '3,000–6,000 DT', 'More than 6,000 DT', 'Budget in euros to be defined'],
    notes: {
      idle: 'No data is sent to a server: your request opens in your email application.',
      draftOpened: "Your request is ready in your email application. If it doesn't open, write to us at {email}.",
      error: 'Opening your email client failed. Write to us directly at {email}.',
    },
    errors: {
      required: 'This field is required.',
      messageRequired: 'Please describe your project.',
      email: 'Invalid email address (example: you@example.com).',
      minlength: 'A few more words to better understand your needs.',
      invalid: 'This field is invalid.',
    },
  },
  footer: {
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
  social: {
    email: 'Email',
  },
  player: {
    close: 'Close the video',
  },
  langNames: { fr: 'French', en: 'English', ar: 'Arabic', es: 'Spanish' },
};

const ar: Dict = {
  nav: {
    home: 'الرئيسية',
    services: 'الخدمات',
    about: 'من نحن',
    portfolio: 'أعمالنا',
    demos: 'عروض المواقع',
    contact: 'اتصل بنا',
    contactCta: 'اتصل بنا',
  },
  hero: {
    eyebrow: 'وكالة رقمية',
    lead: 'حلول رقمية مصمّمة خصيصًا لدفع أعمالك نحو النجاح.',
    domains: ['مواقع ويب', 'التسويق الرقمي', 'مونتاج الفيديو', 'التصميم والهوية', 'حلول مخصّصة'],
    ctaPrimary: 'اكتشف خدماتنا',
    ctaSecondary: 'لنتحدث عن مشروعك',
  },
  services: {
    eyebrow: 'خدماتنا',
    title: 'حلول متكاملة لحضورك الرقمي',
    lead: 'نرافقك في كل مرحلة من مشروعك، من إنشاء موقعك إلى إدارة ظهورك على الإنترنت.',
    items: [
      { title: 'إنشاء مواقع الويب', description: 'مواقع تعريفية ومتاجر إلكترونية وتطبيقات ويب تناسب أهدافك.' },
      { title: 'التسويق الرقمي', description: 'تحسين محركات البحث والإعلانات واستراتيجية المحتوى للوصول إلى عملائك.' },
      { title: 'مونتاج الفيديو', description: 'ريلز وفيديوهات ترويجية ومقاطع قصيرة لمواقع التواصل.' },
      { title: 'التصميم والهوية', description: 'هوية بصرية وشعارات وتصاميم متناسقة مع علامتك التجارية.' },
      { title: 'الصيانة والدعم', description: 'تحديثات وأمان وإصلاحات وتحسين مستمر لموقعك.' },
      { title: 'الاستشارة والمرافقة', description: 'استراتيجية رقمية مصمّمة حسب احتياجاتك وأهدافك.' },
    ],
  },
  about: {
    eyebrow: 'من نحن',
    title: 'وكالة رقمية قريبة من طموحاتك',
    photoTag: 'شريكك الرقمي',
    tagline: 'إنشاء المواقع، التسويق الرقمي وهوية العلامة التجارية.',
    intro: 'هي وكالة رقمية في بداية انطلاقها، صُمّمت لمرافقة الشركات في إنشاء حلول الويب وتواصلها الرقمي.',
    approach: 'يجمع نهجنا بين الخبرة التقنية والإبداع والمرافقة الشخصية لمساعدتك على بناء حضور رقمي متناسق ودائم.',
    values: [
      { title: 'خبرة تقنية', subtitle: 'حلول تناسب احتياجاتك' },
      { title: 'الإبداع', subtitle: 'صورة تشبهك' },
      { title: 'المرافقة', subtitle: 'شريك يصغي إليك' },
      { title: 'التوجه نحو النتائج', subtitle: 'أهداف نحدّدها معًا' },
    ],
  },
  portfolio: {
    eyebrow: 'أعمالنا',
    title: 'أفكار تتحوّل إلى تجارب رقمية',
    lead: 'اكتشف بعض الأمثلة على مشاريع تمثّل مجالات خبرتنا.',
    prev: 'الأعمال السابقة',
    next: 'الأعمال التالية',
    projects: [
      { tag: 'تطوير الويب', title: 'موقع تعريفي — مطعم', description: 'موقع أنيق لعرض المطعم وقائمته ومعلومات التواصل.', alt: 'أجواء مطعم' },
      { tag: 'التسويق الرقمي', title: 'حملة لمواقع التواصل', description: 'توجّه بصري متناسق لتعزيز حضور العلامة التجارية.', alt: 'تصميم جرافيك ومواد تواصل' },
      { tag: 'إنتاج الفيديو', title: 'فيديو ترويجي', description: 'صيغة فيديو ديناميكية لعرض منتج أو خدمة.', alt: 'معدات إنتاج الفيديو' },
    ],
  },
  demos: {
    eyebrow: 'عروض المواقع',
    title: 'تصفّح مشاريعنا بالفيديو',
    lead: 'اكتشف تجربة التصفح والصفحات والميزات لمواقع مصمّمة لقطاعات مختلفة.',
    prev: 'العروض السابقة',
    next: 'العروض التالية',
    play: 'تشغيل العرض',
    items: [
      { tag: 'مطاعم', title: 'موقع مطعم', description: 'تقديم المطعم وإبراز القائمة ومسار الحجز.', ariaLabel: 'عرض موقع مطعم' },
      { tag: 'التجارة الإلكترونية', title: 'موقع متجر إلكتروني', description: 'عرض المنتجات والفئات ومسار الشراء في متجر إلكتروني.', ariaLabel: 'عرض موقع متجر إلكتروني' },
      { tag: 'العقارات', title: 'موقع عقاري', description: 'عرض العقارات وبطاقاتها وتجربة بحث مبسّطة.', ariaLabel: 'عرض موقع عقاري' },
      { tag: 'الصحة', title: 'موقع عيادة طبية', description: 'تقديم الفريق والتخصصات وحجز المواعيد عبر الإنترنت.', ariaLabel: 'عرض موقع عيادة طبية' },
      { tag: 'السفر', title: 'موقع وكالة أسفار', description: 'عروض الرحلات والوجهات المميزة وحجز البرامج.', ariaLabel: 'عرض موقع وكالة أسفار' },
      { tag: 'الموضة', title: 'موقع علامة أزياء', description: 'مجموعات موسمية ولوك بوك وتجربة مخصّصة للجوال أولًا.', ariaLabel: 'عرض متجر أزياء' },
    ],
  },
  stats: {
    eyebrow: 'التزاماتنا',
    title: 'تعاون مصمّم من أجلك',
    items: [
      { value: 'حسب الطلب', label: 'وفق أهدافك' },
      { value: 'خدمات متعددة', label: 'جهة تواصل واحدة' },
      { value: 'إلى جانبك', label: 'من الفكرة إلى التسليم' },
      { value: 'دولي', label: 'تونس وفرنسا وغيرها' },
    ],
  },
  contact: {
    eyebrow: 'اتصل بنا',
    title: 'لنتحدث عن مشروعك',
    lead: 'هل لديك فكرة؟ يمكننا مساعدتك على تحقيقها. اعرض علينا احتياجك وسنعود إليك.',
    location: 'تونس · فرنسا · دولي',
    availability: 'بموعد مسبق',
    nameLabel: 'الاسم الكامل *',
    namePlaceholder: 'اسمك',
    emailLabel: 'البريد الإلكتروني *',
    emailPlaceholder: 'you@example.com',
    serviceLabel: 'الخدمة المطلوبة',
    budgetLabel: 'الميزانية التقديرية',
    messageLabel: 'حدّثنا عن مشروعك *',
    messagePlaceholder: 'احتياجك، أهدافك، آجالك…',
    submit: 'تجهيز رسالتي',
    sending: 'جارٍ التجهيز…',
    serviceOptions: ['إنشاء موقع ويب', 'التسويق الرقمي', 'مونتاج الفيديو', 'التصميم والهوية', 'الصيانة والدعم', 'طلب آخر'],
    budgetOptions: ['للتحديد', 'أقل من 1000 دينار', '1000–3000 دينار', '3000–6000 دينار', 'أكثر من 6000 دينار', 'ميزانية باليورو للتحديد'],
    notes: {
      idle: 'لا تُرسَل أي بيانات إلى خادم: يُفتح طلبك في تطبيق البريد لديك.',
      draftOpened: 'طلبك جاهز في تطبيق البريد لديك. إن لم يُفتح، راسلنا على {email}.',
      error: 'فشل فتح تطبيق البريد. راسلنا مباشرة على {email}.',
    },
    errors: {
      required: 'هذا الحقل مطلوب.',
      messageRequired: 'يرجى وصف مشروعك.',
      email: 'بريد إلكتروني غير صالح (مثال: you@example.com).',
      minlength: 'بعض الكلمات الإضافية لفهم احتياجك بشكل أفضل.',
      invalid: 'هذا الحقل غير صالح.',
    },
  },
  footer: {
    rights: 'جميع الحقوق محفوظة.',
    backToTop: 'العودة إلى الأعلى',
  },
  social: {
    email: 'البريد الإلكتروني',
  },
  player: {
    close: 'إغلاق الفيديو',
  },
  langNames: { fr: 'الفرنسية', en: 'الإنجليزية', ar: 'العربية', es: 'الإسبانية' },
};

const es: Dict = {
  nav: {
    home: 'Inicio',
    services: 'Servicios',
    about: 'Nosotros',
    portfolio: 'Portafolio',
    demos: 'Demos de sitios web',
    contact: 'Contacto',
    contactCta: 'Contáctanos',
  },
  hero: {
    eyebrow: 'Agencia digital',
    lead: 'Soluciones digitales a medida para impulsar tu empresa hacia el éxito.',
    domains: ['Sitios web', 'Marketing digital', 'Edición de vídeo', 'Diseño y branding', 'Soluciones a medida'],
    ctaPrimary: 'Descubre nuestros servicios',
    ctaSecondary: 'Hablemos de tu proyecto',
  },
  services: {
    eyebrow: 'Nuestros servicios',
    title: 'Soluciones completas para tu presencia digital',
    lead: 'Te acompañamos en cada etapa de tu proyecto, desde la creación de tu sitio web hasta la gestión de tu visibilidad en línea.',
    items: [
      { title: 'Creación de sitios web', description: 'Sitios de presentación, e-commerce y aplicaciones web adaptados a tus objetivos.' },
      { title: 'Marketing digital', description: 'SEO, publicidad en línea y estrategia de contenido para llegar a tus clientes.' },
      { title: 'Edición de vídeo', description: 'Reels, vídeos promocionales y formatos cortos para redes sociales.' },
      { title: 'Diseño y Branding', description: 'Identidad visual, logotipos y recursos coherentes con tu marca.' },
      { title: 'Mantenimiento y Soporte', description: 'Actualizaciones, seguridad, correcciones y optimización de tu sitio.' },
      { title: 'Consultoría y Acompañamiento', description: 'Una estrategia digital adaptada a tus necesidades y objetivos.' },
    ],
  },
  about: {
    eyebrow: 'Sobre nosotros',
    title: 'Una agencia digital cercana a tus ambiciones',
    photoTag: 'Tu socio digital',
    tagline: 'Creación web, marketing digital e identidad de marca.',
    intro: 'es una agencia digital en lanzamiento, pensada para acompañar a las empresas en la creación de soluciones web y su comunicación digital.',
    approach: 'Nuestro enfoque combina experiencia técnica, creatividad y acompañamiento personalizado para ayudarte a construir una presencia en línea coherente y duradera.',
    values: [
      { title: 'Experiencia técnica', subtitle: 'Soluciones adaptadas a tus necesidades' },
      { title: 'Creatividad', subtitle: 'Una imagen que te representa' },
      { title: 'Acompañamiento', subtitle: 'Un interlocutor que te escucha' },
      { title: 'Orientación a resultados', subtitle: 'Objetivos definidos juntos' },
    ],
  },
  portfolio: {
    eyebrow: 'Nuestros proyectos',
    title: 'Ideas convertidas en experiencias digitales',
    lead: 'Descubre algunos ejemplos de proyectos representativos de nuestras áreas de especialidad.',
    prev: 'Proyectos anteriores',
    next: 'Proyectos siguientes',
    projects: [
      { tag: 'Desarrollo web', title: 'Sitio de presentación — Restaurante', description: 'Un sitio elegante para presentar un local, su menú y sus datos de contacto.', alt: 'Ambiente de restaurante' },
      { tag: 'Marketing digital', title: 'Campaña para redes sociales', description: 'Una dirección visual coherente para reforzar la presencia de una marca.', alt: 'Diseño gráfico y materiales de comunicación' },
      { tag: 'Producción de vídeo', title: 'Vídeo promocional', description: 'Un formato de vídeo dinámico diseñado para presentar un producto o servicio.', alt: 'Equipo de producción de vídeo' },
    ],
  },
  demos: {
    eyebrow: 'Demos de sitios web',
    title: 'Visita nuestros proyectos en vídeo',
    lead: 'Descubre la experiencia de navegación, las páginas y las funcionalidades de sitios web diseñados para distintos sectores.',
    prev: 'Demos anteriores',
    next: 'Demos siguientes',
    play: 'Reproducir la demo',
    items: [
      { tag: 'Restauración', title: 'Sitio web de restaurante', description: 'Presentación del restaurante, menú destacado y proceso de reserva.', ariaLabel: 'Demo del sitio web de restaurante' },
      { tag: 'Comercio en línea', title: 'Sitio e-commerce', description: 'Productos, categorías y proceso de compra de una tienda en línea.', ariaLabel: 'Demo del sitio e-commerce' },
      { tag: 'Inmobiliaria', title: 'Sitio web inmobiliario', description: 'Vitrina de propiedades, fichas y una experiencia de búsqueda simplificada.', ariaLabel: 'Demo de un sitio inmobiliario' },
      { tag: 'Salud', title: 'Sitio de consultorio médico', description: 'Presentación del equipo, especialidades y reserva de citas en línea.', ariaLabel: 'Demo de un sitio de consultorio médico' },
      { tag: 'Viajes', title: 'Sitio de agencia de viajes', description: 'Ofertas de estancias, destinos destacados y reserva de itinerarios.', ariaLabel: 'Demo de un sitio de agencia de viajes' },
      { tag: 'Moda', title: 'Sitio de marca de moda', description: 'Colecciones de temporada, lookbooks y experiencia mobile-first.', ariaLabel: 'Demo de una tienda de moda' },
    ],
  },
  stats: {
    eyebrow: 'Nuestros compromisos',
    title: 'Una colaboración pensada para ti',
    items: [
      { value: 'A medida', label: 'Según tus objetivos' },
      { value: 'Multiservicio', label: 'Un único interlocutor' },
      { value: 'A tu lado', label: 'Del brief a la entrega' },
      { value: 'Internacional', label: 'Túnez, Francia y más allá' },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Hablemos de tu proyecto',
    lead: '¿Tienes una idea? Podemos ayudarte a hacerla realidad. Cuéntanos tu necesidad y te responderemos.',
    location: 'Túnez · Francia · Internacional',
    availability: 'Con cita previa',
    nameLabel: 'Nombre completo *',
    namePlaceholder: 'Tu nombre',
    emailLabel: 'Correo electrónico *',
    emailPlaceholder: 'tu@ejemplo.com',
    serviceLabel: 'Servicio deseado',
    budgetLabel: 'Presupuesto estimado',
    messageLabel: 'Cuéntanos sobre tu proyecto *',
    messagePlaceholder: 'Tu necesidad, tus objetivos, tus plazos…',
    submit: 'Preparar mi mensaje',
    sending: 'Preparando…',
    serviceOptions: ['Creación de sitio web', 'Marketing digital', 'Edición de vídeo', 'Diseño y branding', 'Mantenimiento y soporte', 'Otra solicitud'],
    budgetOptions: ['Por definir', 'Menos de 1 000 DT', '1 000–3 000 DT', '3 000–6 000 DT', 'Más de 6 000 DT', 'Presupuesto en euros por definir'],
    notes: {
      idle: 'No se envía ningún dato a un servidor: tu solicitud se abre en tu aplicación de correo.',
      draftOpened: 'Tu solicitud está lista en tu aplicación de correo. Si no se abre, escríbenos a {email}.',
      error: 'No se pudo abrir tu cliente de correo. Escríbenos directamente a {email}.',
    },
    errors: {
      required: 'Este campo es obligatorio.',
      messageRequired: 'Por favor, describe tu proyecto.',
      email: 'Correo electrónico no válido (ejemplo: tu@ejemplo.com).',
      minlength: 'Unas palabras más para entender mejor tu necesidad.',
      invalid: 'Este campo no es válido.',
    },
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    backToTop: 'Volver arriba',
  },
  social: {
    email: 'Correo',
  },
  player: {
    close: 'Cerrar el vídeo',
  },
  langNames: { fr: 'Francés', en: 'Inglés', ar: 'Árabe', es: 'Español' },
};

export const TRANSLATIONS: Record<Lang, Dict> = { fr, en, ar, es };
