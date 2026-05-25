import type { Metadata } from 'next';
import OpenTablesClient from './OpenTablesClient';

export const metadata: Metadata = {
  title: 'Find Mahjong Clubs Near You | Faan Club',
  description: 'Find Hong Kong mahjong clubs and open tables near you.',
};

export default function OpenTablesPage() {
  return <OpenTablesClient />;
}
