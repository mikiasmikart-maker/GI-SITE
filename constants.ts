
import { ServiceItem, WorkItem, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    number: '01',
    title: 'Research, Insights & Strategy',
    description: 'Deep analysis and market segmentation for strategic positioning.',
    features: [
      'Consumer Behavior',
      'Brand Audits',
      'BTL Strategy'
    ]
  },
  {
    id: 's2',
    number: '02',
    title: 'Creative, Brand Identity & Digital',
    description: 'Visual systems, storytelling, and digital presence management.',
    features: [
      'Identity Systems',
      'Content Creation',
      'Digital Presence'
    ]
  },
  {
    id: 's3',
    number: '03',
    title: 'BTL Activation & Field Execution',
    description: 'Nationwide experiential planning and field execution.',
    features: [
      'Nationwide Reach',
      'Product Launches',
      'Cultural Events'
    ]
  },
  {
    id: 's4',
    number: '04',
    title: 'Production & Fabrication',
    description: 'In-house fabrication delivering total creative fidelity.',
    features: [
      'In-House Power',
      'Structures',
      'Fleet Branding'
    ]
  },
];

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'w1',
    title: 'Coca-Cola / CCBA',
    category: 'Trade Launch',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=1200',
    colSpan: 1,
    client: 'CCBA',
    role: 'BTL Execution',
    description: '1L PET Trade Launch & Regional Visibility: 70,000+ household samplings; 1,500+ outlet POS deployments.'
  },
  {
    id: 'w2',
    title: 'Kegna Beverages',
    category: 'Brand Identity',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1625723044792-44de168b40d6?auto=format&fit=crop&q=80&w=1600',
    colSpan: 2,
    client: 'Kegna',
    role: 'Full Launch Strategy',
    description: 'Brand identity & nationwide launch: Led Irreecha activations across 6+ cities with full fleet branding.'
  },
  {
    id: 'w3',
    title: 'Heineken Ethiopia',
    category: 'Experiential',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1575485499252-8706d86395b4?auto=format&fit=crop&q=80&w=1200',
    colSpan: 1,
    client: 'Heineken Ethiopia',
    role: 'Nationwide Activation',
    description: 'Nationwide brand launches: Consistent execution of high-impact fleet and venue branding.'
  },
  {
    id: 'w4',
    title: 'Sika Abyssinia',
    category: 'Retail Outreach',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
    colSpan: 1,
    client: 'Sika',
    role: 'Product Demo',
    description: 'Nationwide retail penetration: Managed 1,600+ retail outlets with product demos and POS.'
  },
];
