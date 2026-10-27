/**
 * DRV Assistants - Site Content Configuration
 * Single source of truth for text, pricing, services, and FAQ content.
 * 
 * NOTE FOR SITE OWNER:
 * Unverified claims, partner affiliations, testimonial quotes, and legal links
 * are flagged below and should be approved prior to public production deployment.
 */

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Career', href: '#career' },
  { name: 'Contact Us', href: '#contact' },
];

export const heroContent = {
  badge: 'DEDICATED REMOTE TEAMS FOR MODERN BUSINESSES',
  titlePart1: 'Scale Your Business Without the Hiring',
  titleHighlight: 'Headache !',
  description:
    'Get trained, dedicated remote professionals to handle operations, customer support, research, e-commerce, data and specialized tasks — without the complexity of traditional hiring.',
  primaryCta: 'Start Your 2-Day Risk-Free Trial',
  primaryCtaHref: '#pricing',
  secondaryCta: 'Talk to Our Team',
  secondaryCtaHref: '#contact',
  image: '/images/hero-cutout.webp',
};

export const trustedBy = {
  titlePart1: 'Trusted',
  titlePart2: 'By:',
  // NOTE: Brand relationships derived from visual reference; verify authorization prior to commercial use.
  brands: [
    { name: 'Forbes' },
    { name: 'Entrepreneur' },
    { name: 'YAHOO!' },
    { name: 'CNN' },
    { name: 'FOX' },
    { name: 'hp' },
  ],
};

export const statsContent = {
  title: 'Our stats',
  subtitle: 'Trusted Remote Operations. Built for Scale.',
  // NOTE: Historical stats from reference; verify against actual operating metrics.
  items: [
    { value: '10+', label: 'Years Of Experience', number: 10, suffix: '+' },
    { value: '1k+', label: 'Clients', number: 1000, suffix: '+' },
    { value: '24/7', label: 'Support', number: 24, suffix: '/7' },
  ],
};

export const whyDrvContent = {
  title: 'Why',
  titleHighlight: 'DRV?',
  subtitle: 'More Than Remote Staff. A Team You Can Rely On.',
  image: '/images/why-drv-portrait.webp',
  leftPoints: [
    {
      title: 'Dedicated Teams',
      description: 'Professionals focused on your business.',
    },
    {
      title: 'Trained & Supervised',
      description: 'Structured processes and ongoing oversight.',
    },
    {
      title: 'Flexible Scaling',
      description: 'Scale your team as your business grows.',
    },
  ],
  rightPoints: [
    {
      title: 'Single Point of Contact',
      description: 'One person coordinating your remote operations.',
    },
    {
      title: 'Get Inspired Weekly',
      description: 'Start with a 2-Day Risk-Free Trial.',
    },
    {
      title: 'Global Support',
      description: 'Built to support international businesses.',
    },
  ],
};

export const servicesContent = {
  badge: 'WHAT WE CAN HANDLE',
  titlePrefix: 'Everything You Need To',
  titleHighlight: 'Run Smarter.',
  subtitle: 'Group services into four main categories.',
  // NOTE: Reference design listed identical bullet lists across cards. 
  // Configured here to allow distinct capabilities while preserving reference fidelity.
  categories: [
    {
      id: 'business-operations',
      title: 'Business Operations',
      items: [
        'Back-Office Support',
        'Administration',
        'Data Entry',
        'Database Management',
        'Reporting',
      ],
    },
    {
      id: 'customer-revenue',
      title: 'Customer & Revenue',
      items: [
        'Back-Office Support',
        'Administration',
        'Data Entry',
        'Database Management',
        'Reporting',
      ],
    },
    {
      id: 'growth-support',
      title: 'Growth Support',
      items: [
        'Back-Office Support',
        'Administration',
        'Data Entry',
        'Database Management',
        'Reporting',
      ],
    },
    {
      id: 'specialized-team',
      title: 'Specialized Team',
      items: [
        'Back-Office Support',
        'Administration',
        'Data Entry',
        'Database Management',
        'Reporting',
      ],
    },
  ],
};

export const processContent = {
  badge: 'How It Works?',
  titlePrefix: 'Getting Started Takes',
  titleHighlight: '3 Simple Steps.',
  ctaText: 'Start Your 2-Day Risk-Free Trial',
  ctaHref: '#pricing',
  steps: [
    {
      number: 1,
      title: 'Tell Us What You Need',
      description: 'Tell us about your business, workload and required roles.',
    },
    {
      number: 2,
      title: 'Meet Your Team',
      description: 'We match you with the right dedicated professionals.',
    },
    {
      number: 3,
      title: 'Start & Scale',
      description: 'Your team gets to work while DRV handles supervision and support.',
    },
  ],
};

export const testimonialsContent = {
  badge: 'Testimonials',
  titlePrefix: 'Our',
  titleHighlight: 'Customer',
  titleSuffix: 'Reviews',
  subtitle: 'What business owners and leaders say about their experience with DRV Assistants.',
  // NOTE: Testimonials include reference quotes and configurable client placeholders pending final verification.
  reviews: [
    {
      id: 'alex-carter',
      name: 'Alex Carter',
      quote:
        'Drv Assistant made designing websites so much faster. The layouts are clean, modern, and easy to customize. Highly recommended!',
      image: '/images/testimonial-1.webp',
      role: 'Operations Director',
      company: 'Aura Studio',
      highlightWord: 'so much faster',
    },
    {
      id: 'samantha-lee',
      name: 'Samantha Lee',
      quote:
        'Drv saved us weeks of work. The results are beautifully crafted and easy to plug in.',
      image: '/images/testimonial-2.webp',
      role: 'Managing Partner',
      company: 'Solas Ventures',
      highlightWord: 'weeks of work',
    },
    {
      id: 'marcus-vance',
      name: 'Marcus Vance',
      quote:
        'The quality of talent exceeded our expectations. Our remote specialists handle specialized technical data entry with speed and zero friction.',
      image: '/images/testimonial-3.webp',
      role: 'Founder & CEO',
      company: 'Horizon Labs',
      highlightWord: 'exceeded our expectations',
    },
    {
      id: 'elena-rostova',
      name: 'Elena Rostova',
      quote:
        'Our customer response times dropped by over 60% within thirty days. Having dedicated coverage across time zones transformed our business.',
      image: '/images/testimonial-4.webp',
      role: 'VP of Customer Operations',
      company: 'OmniFlow',
      highlightWord: 'dropped by over 60%',
    },
    {
      id: 'david-chen',
      name: 'David Chen',
      quote:
        'Scaling without the overhead of traditional hiring has been a game-changer. Truly a dependable extension of our core leadership team.',
      image: '/images/testimonial-5.webp',
      role: 'Head of Growth & Infrastructure',
      company: 'PulseMetric',
      highlightWord: 'game-changer',
    },
  ],
};

export const pricingContent = {
  badge: 'Pricing',
  titlePrefix: 'Plans And',
  titleHighlight: 'Pricing',
  subtitle: 'Flexible plans and solutions for business of all sizes',
  sideFeatures: [
    {
      title: 'Seamless Setup',
      description:
        'Get started in minutes with an intuitive onboarding flow and zero technical complexity.',
    },
    {
      title: 'Smarter Workflows',
      description:
        'Automate routine tasks and collaborate effortlessly with built-in intelligence and integrations.',
    },
    {
      title: 'Trusted by Teams',
      description:
        'Built for scale with enterprise-grade security and dedicated account management.',
    },
  ],
  plans: [
    {
      id: 'part-time',
      name: 'Part Time',
      price: '$270',
      period: '/mo',
      feeNote: '5% transaction fee',
      highlighted: false,
      featureHeader: 'All core benefits in one unified platform',
      features: [
        { text: 'Includes all features from the Basic Plan', included: true },
        { text: 'Advanced reporting tools', included: true },
        { text: 'Enhanced security options', included: true },
        { text: 'Team management controls', included: true },
        { text: 'Live chat support', included: false },
        { text: 'Additional integration options', included: false },
      ],
      buttonText: 'Get Started',
      buttonHref: '#contact',
    },
    {
      id: 'full-time',
      name: 'Full Time',
      price: '$500',
      period: '/mo',
      feeNote: '5% transaction fee',
      highlighted: true,
      featureHeader: 'All core benefits in one unified platform',
      features: [
        { text: 'Includes all features from the Basic Plan', included: true },
        { text: 'Advanced reporting tools', included: true },
        { text: 'Enhanced security options', included: true },
        { text: 'Team management controls', included: true },
        { text: 'Live chat support', included: true },
        { text: 'Additional integration options', included: true },
      ],
      buttonText: 'Get Started',
      buttonHref: '#contact',
    },
  ],
};

export const faqContent = {
  titlePrefix: 'Your Questions.',
  titleHighlight: 'Answered.',
  subtitle: 'Answers to all your questions, quickly and clearly',
  items: [
    {
      id: 'faq-what-is-drv',
      question: 'What is DRV Assistants?',
      answer:
        'DRV Assistants provides trained, dedicated remote professionals to manage back-office operations, customer support, research, e-commerce, data entry, and specialized tasks. We help businesses scale efficiently without the overhead and complexity of traditional in-house hiring.',
    },
    {
      id: 'faq-upgrade-plan',
      question: 'Can I upgrade my plan at any time?',
      answer:
        'Yes. You can transition between Part Time and Full Time plans or adjust your team capacity as your operational needs change. Reach out to our team to coordinate plan updates.',
    },
    {
      id: 'faq-annual-discount',
      question: 'Is there a discount for annual subscriptions?',
      answer:
        'Custom contract terms and volume pricing are available for ongoing engagements and multi-seat teams. Contact our team to discuss arrangements tailored to your organization.',
    },
    {
      id: 'faq-free-trial',
      question: 'What is included in the free trial?',
      answer:
        'The 2-Day Risk-Free Trial allows you to delegate real workflows to a dedicated remote assistant and evaluate our support, communication, and work quality firsthand before activating a full plan.',
    },
    {
      id: 'faq-refunds',
      question: 'Do you offer refunds?',
      answer:
        'We are committed to operational excellence. If your assigned assistant is not the right fit, we provide swift reassignment or address your engagement per the terms of your service agreement.',
    },
  ],
};

export const careerContent = {
  badge: 'Join Our Global Team',
  titlePrefix: 'Build Your Career With',
  titleHighlight: 'DRV Assistants',
  description:
    'We are always looking for talented remote professionals in operations, customer success, administrative support, and specialized business domains.',
  email: 'careers.drvassistants@gmail.com',
  ctaText: 'Apply via Email',
};

export const finalCtaContent = {
  titlePrefix: 'Ready to',
  titleHighlight: 'Take the Work Off',
  titleSuffix: 'Your Plate?',
  subtitle:
    'Build your dedicated remote team with DRV Assistants and focus on what actually grows your business.',
  primaryCta: 'Start Your 2-Day Risk-Free Trial',
  primaryCtaHref: '#pricing',
  secondaryCta: 'Talk to Our Team',
  secondaryCtaHref: '#contact',
  avatarsImage: '/images/team-avatars.webp',
};

export const footerContent = {
  logoText: 'DRV Assistants',
  quickLinksTitle: 'Quick Link',
  quickLinks: [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Career', href: '#career' },
  ],
  resourcesTitle: 'Resources',
  resources: [
    { name: 'Blog', href: '#blog', type: 'info' },
    { name: 'Copyright', href: '#site-footer', type: 'anchor' },
    { name: 'Privacy Policy', href: '#privacy', type: 'modal' },
    { name: 'Terms & Conditions', href: '#terms', type: 'modal' },
  ],
  contactTitle: 'Contact',
  contact: {
    address: '123 Business Ave, Suite 100, Metro City', // NOTE: Verify physical address before launch
    phone: '+1 (800) 123-4567', // NOTE: Verify company phone before launch
    email: 'info.drvassistants@gmail.com',
  },
  socials: {
    twitter: { name: 'X (Twitter)', href: 'https://x.com', placeholder: true },
    facebook: { name: 'Facebook', href: 'https://facebook.com', placeholder: true },
    instagram: { name: 'Instagram', href: 'https://instagram.com', placeholder: true },
    linkedin: { name: 'LinkedIn', href: 'https://linkedin.com', placeholder: true },
  },
  copyrightBase: '© {year} DRV Assistants · Terms · Privacy',
};
