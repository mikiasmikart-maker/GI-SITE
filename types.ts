
export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  features?: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  colSpan?: 1 | 2; 
  client?: string;
  role?: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type Theme = 'light' | 'dark';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
