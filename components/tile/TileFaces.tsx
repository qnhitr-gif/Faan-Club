import type { TileFace } from '@/lib/tiles';
import { tileImageUrl, tileLabel } from '@/lib/tiles';

export function SuitFace({ face }: { face: TileFace }) {
  return (
    <image
      href={tileImageUrl(face)}
      x={0}
      y={0}
      width={60}
      height={84}
      preserveAspectRatio="none"
    >
      <title>{tileLabel(face)}</title>
    </image>
  );
}
