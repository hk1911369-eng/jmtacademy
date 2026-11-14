export function resolveAcademyTagline(tagline) {
  const value = typeof tagline === 'string' ? tagline.trim().replace(/\s+/g, ' ') : '';
  if (!value) return 'MULTI-SUBJECT LEARNING';

  // Replace the known legacy Chemistry-only academy strapline without
  // overriding other owner-configured, multi-subject brand messaging.
  const legacyChemistryTagline = /^(?:JMT\s+)?CHEMISTRY\s*[·•|—–-]\s*LEARNING\s*[·•|—–-]\s*PROGRESS$/i;
  return legacyChemistryTagline.test(value) ? 'MULTI-SUBJECT LEARNING' : value;
}
