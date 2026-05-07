import type { TileFace } from '@/lib/tiles';
import { Tile } from './Tile';

interface TileRowProps {
  tiles: Array<TileFace | null>;
  size?: 'sm' | 'md' | 'lg';
  gap?: 'tight' | 'normal' | 'loose';
  className?: string;
}

const GAP: Record<NonNullable<TileRowProps['gap']>, string> = {
  tight: 'gap-1',
  normal: 'gap-2',
  loose: 'gap-3',
};

export function TileRow({ tiles, size = 'md', gap = 'normal', className = '' }: TileRowProps) {
  return (
    <div className={`flex flex-wrap items-end ${GAP[gap]} ${className}`}>
      {tiles.map((face, i) => (
        <Tile key={i} face={face ?? undefined} size={size} />
      ))}
    </div>
  );
}
