/**
 * Homepage FAQ content.
 * Lives here rather than inside FAQ.astro so index.astro can build FAQPage
 * structured data from exactly the same source the component renders.
 */
const faqs = [
  {
    q: 'How quickly will I see results from working with BGS?',
    a: 'Most clients begin seeing measurable performance improvements within the first 30 days. Paid ad campaigns typically generate data within the first week, allowing us to optimise rapidly. For brand and organic strategies, meaningful traction typically builds within 60–90 days. We\'ll always set clear expectations and milestones before we start.',
  },
  {
    q: 'Do you work with brands outside the UAE?',
    a: 'Absolutely. While we\'re headquartered in Dubai\'s UAE Free Zone, we operate globally — with active clients across the UK, USA, Europe, KSA, and Southeast Asia. Our team is built for cross-border growth, and we understand regional nuances in consumer behaviour, platforms, and compliance.',
  },
  {
    q: 'What is the minimum budget to get started with BGS?',
    a: 'Our full-service engagements typically start from $5,000/month, which includes strategy, creative, and execution. For brands with a specific need (e.g., ad management only or a brand build), we offer focused packages. The best first step is a free discovery call — we\'ll assess your goals and recommend the right investment level.',
  },
  {
    q: 'Do you offer individual services, or is it full-service only?',
    a: 'Both. While our most successful client relationships are full-service (where we own the entire growth engine), we also offer standalone services including paid advertising, social media management, branding, web builds, and AI marketing. Many clients start with one service and expand as they see results.',
  },
  {
    q: 'What does "AI-powered marketing" actually mean in practice?',
    a: 'It means AI is embedded throughout our process — not bolted on as a buzzword. We use AI for predictive audience modelling, creative testing at scale, automated reporting, dynamic content personalisation, chatbot funnels, and workflow automation. The result: campaigns that learn faster, content that scales further, and more hours saved for your team.',
  },
  {
    q: 'How do you measure and report on performance?',
    a: 'Every client gets a live dashboard tracking the KPIs that matter most to their business — ROAS, CAC, revenue, lead volume, conversion rates, and more. We send weekly performance snapshots and hold monthly strategy reviews. You\'ll always know exactly what\'s working, what\'s being tested, and what\'s coming next.',
  },
  {
    q: 'What industries and markets do you specialise in?',
    a: 'We\'ve driven results across fashion & luxury retail, B2B SaaS, real estate & property development, e-commerce, professional services, hospitality, and health & wellness. If your brand has a compelling offer and ambition to grow, we can build a strategy around it — regardless of industry.',
  },
  {
    q: 'What does the onboarding process look like?',
    a: 'After the discovery call, we conduct a full audit of your existing marketing — ads, brand, website, funnels, and data. Within two weeks, we deliver a tailored growth strategy. Week three is creative production and campaign setup. By week four, we\'re live and optimising. The whole process is smooth, transparent, and built around your schedule.',
  },
];

export default faqs;
