const G = '#235836';
const SOFT = '#e8f2ec';

function IllustrationInformation() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Three tiles face-up — exposed for all to see */}
      {/* Tile 1 */}
      <rect x="6" y="20" width="14" height="18" rx="2.5" fill="#F8F3E2" stroke={G} strokeWidth="1.5"/>
      <rect x="8.5" y="22.5" width="9" height="13" rx="1.5" fill="none" stroke={G} strokeWidth="0.8"/>
      <circle cx="13" cy="29" r="3" fill="none" stroke={G} strokeWidth="1.2"/>
      <circle cx="13" cy="29" r="1.2" fill={G}/>
      {/* Tile 2 */}
      <rect x="25" y="16" width="14" height="18" rx="2.5" fill="#F8F3E2" stroke={G} strokeWidth="1.5"/>
      <rect x="27.5" y="18.5" width="9" height="13" rx="1.5" fill="none" stroke={G} strokeWidth="0.8"/>
      <circle cx="32" cy="25" r="3" fill="none" stroke={G} strokeWidth="1.2"/>
      <circle cx="32" cy="25" r="1.2" fill={G}/>
      {/* Tile 3 */}
      <rect x="44" y="20" width="14" height="18" rx="2.5" fill="#F8F3E2" stroke={G} strokeWidth="1.5"/>
      <rect x="46.5" y="22.5" width="9" height="13" rx="1.5" fill="none" stroke={G} strokeWidth="0.8"/>
      <circle cx="51" cy="29" r="3" fill="none" stroke={G} strokeWidth="1.2"/>
      <circle cx="51" cy="29" r="1.2" fill={G}/>
      {/* Eye below — opponents watching */}
      <ellipse cx="32" cy="50" rx="14" ry="7" fill={SOFT} stroke={G} strokeWidth="1.5"/>
      <circle cx="32" cy="50" r="3" fill={G}/>
      <circle cx="33.2" cy="48.8" r="1" fill="#F8F3E2"/>
    </svg>
  );
}

function IllustrationFaan() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Stars / faan points fading out */}
      {/* Full star top-left */}
      <polygon points="16,10 17.9,15.8 24,15.8 19,19.2 20.9,25 16,21.6 11.1,25 13,19.2 8,15.8 14.1,15.8" fill={G} opacity="1"/>
      {/* Half star middle — fading */}
      <polygon points="32,12 33.9,17.8 40,17.8 35,21.2 36.9,27 32,23.6 27.1,27 29,21.2 24,17.8 30.1,17.8" fill={G} opacity="0.45"/>
      {/* Ghost star right */}
      <polygon points="48,10 49.9,15.8 56,15.8 51,19.2 52.9,25 48,21.6 43.1,25 45,19.2 40,15.8 46.1,15.8" fill="none" stroke={G} strokeWidth="1.2" opacity="0.35"/>
      {/* Down arrow */}
      <line x1="32" y1="34" x2="32" y2="52" stroke={G} strokeWidth="2.5" strokeLinecap="round"/>
      <polyline points="24,45 32,54 40,45" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IllustrationFlexibility() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Padlock body */}
      <rect x="16" y="30" width="32" height="24" rx="4" fill={SOFT} stroke={G} strokeWidth="2"/>
      {/* Shackle */}
      <path d="M22 30 V22 C22 14.3 42 14.3 42 22 V30" stroke={G} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Keyhole */}
      <circle cx="32" cy="42" r="4" fill={G}/>
      <rect x="30" y="43" width="4" height="6" rx="1" fill={G}/>
    </svg>
  );
}

function IllustrationTurnOrder() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Four seats around a table */}
      {/* Table */}
      <rect x="20" y="20" width="24" height="24" rx="4" fill={SOFT} stroke={G} strokeWidth="1.5"/>
      {/* Top seat — muted */}
      <rect x="26" y="8" width="12" height="8" rx="3" fill={SOFT} stroke={G} strokeWidth="1.2" opacity="0.4"/>
      {/* Left seat — muted */}
      <rect x="8" y="28" width="8" height="8" rx="3" fill={SOFT} stroke={G} strokeWidth="1.2" opacity="0.4"/>
      {/* Bottom seat — YOU */}
      <rect x="26" y="48" width="12" height="8" rx="3" fill={G}/>
      {/* Right seat — highlighted (the one you can chow from) */}
      <rect x="48" y="28" width="8" height="8" rx="3" fill={G} opacity="0.75"/>
      {/* Arrow from right seat to YOU */}
      <path d="M48 32 Q38 40 32 48" stroke={G} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2"/>
      <polyline points="28,44 32,48 36,44" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* X marks on the other two */}
      <line x1="29" y1="11" x2="33" y2="15" stroke="#b8302a" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="33" y1="11" x2="29" y2="15" stroke="#b8302a" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="11" y1="31" x2="15" y2="35" stroke="#b8302a" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="15" y1="31" x2="11" y2="35" stroke="#b8302a" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

const COSTS = [
  {
    illustration: <IllustrationInformation />,
    title: 'Information',
    note: 'Every exposed set shows opponents your tiles and hand shape. They will stop throwing tiles that help you.',
  },
  {
    illustration: <IllustrationFaan />,
    title: 'Faan',
    note: 'Common hand (平糊) is worth 1 faan only when fully concealed. Call one set and that bonus disappears — potentially dropping you below the 3-faan floor.',
  },
  {
    illustration: <IllustrationFlexibility />,
    title: 'Flexibility',
    note: "Exposed sets are locked. You can't rearrange, pivot, or abandon the shape. The hand you committed to when you called is the hand you're stuck with.",
  },
  {
    illustration: <IllustrationTurnOrder />,
    title: 'Turn order — chow only',
    note: 'Chow is restricted to the player immediately to your right (the highlighted seat above). It loses to any pung or win claim on the same tile.',
  },
];

export function CallCosts() {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
      {COSTS.map((c) => (
        <div key={c.title} className="rounded-lg bg-elev hairline-strong border p-5 flex gap-5 items-start">
          <div className="shrink-0 w-16 h-16">
            {c.illustration}
          </div>
          <div className="pt-1">
            <div className="font-sans text-h3 font-medium text-primary mb-1">{c.title}</div>
            <div className="text-body text-secondary">{c.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
