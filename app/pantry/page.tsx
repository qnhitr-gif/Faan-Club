import type { Metadata } from 'next';
import PantryClient from './PantryClient';

export const metadata: Metadata = {
  title: 'Mahjong Glossary — Every Term Explained | Faan Club',
  description: 'Mahjong glossary — every term, suit, and scoring pattern explained.',
};

export default function PantryPage() {
  return <PantryClient />;
}
