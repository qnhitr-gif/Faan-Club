import type { TileFace } from '@/lib/tiles';
import { Tile } from './Tile';

interface TileRowProps {
  tiles: Array<TileFace | null>;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  gap?: 'tight' | 'normal' | 'loose';
  nowrap?: boolean;
  className?: string;
}

const GAP: Record<NonNullable<TileRowProps['gap']>, string> = {
  tight: 'gap-1',
  normal: 'gap-2',
  loose: 'gap-3',
};

export function TileRow({ tiles, size = 'md', gap = 'normal', nowrap = false, className = '' }: TileRowProps) {
  return (
    <div className={`flex items-end ${nowrap ? 'flex-nowrap' : 'flex-wrap'} ${GAP[gap]} ${className}`}>
      {tiles.map((face, i) => (
        <Tile key={i} face={face ?? undefined} size={size} />
      ))}
    </div>
  );
}
