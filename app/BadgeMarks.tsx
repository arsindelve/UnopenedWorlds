'use client';

import { collectionBadgeDefinitions, type CollectionBadgeId } from './collection';

export function BadgeMarks({ badges, expanded = false }: { badges: CollectionBadgeId[]; expanded?: boolean }) {
  const definitions = collectionBadgeDefinitions.filter(({ id }) => badges.includes(id));
  return (
    <span className={`badge-marks ${expanded ? 'badge-marks--expanded' : ''}`} aria-label={definitions.map(({ label }) => label).join(', ')}>
      {definitions.map(({ id, label, Icon }) => (
        <span className={`collection-badge collection-badge--${id}`} title={label} key={id}>
          <Icon size={expanded ? 13 : 8} aria-hidden="true" />
          {expanded && <span>{label}</span>}
        </span>
      ))}
    </span>
  );
}
