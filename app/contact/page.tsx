import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Faan Club team.',
};

export default function ContactPage() {
  return <ContactClient />;
}
