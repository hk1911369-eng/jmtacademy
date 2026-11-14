import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [blueprint, deployment] = await Promise.all([
  readFile(new URL('../render.yaml', import.meta.url), 'utf8'),
  readFile(new URL('../DEPLOYMENT.md', import.meta.url), 'utf8'),
]);

test('Render production Blueprint points only to the current JMT Academy service and repository', () => {
  const production = blueprint.split('  # Prepared staging service only.')[0];
  assert.match(production, /name: jmtacademy-web/);
  assert.match(production, /repo: https:\/\/github\.com\/hk1911369-eng\/jmtacademy/);
  assert.match(production, /branch: main/);
  assert.match(production, /healthCheckPath: \/api\/health/);
  assert.match(production, /APP_URL[\s\S]*https:\/\/jmtacademy-web\.onrender\.com/);
  assert.match(production, /NEXT_PUBLIC_SITE_URL[\s\S]*https:\/\/jmtacademy-web\.onrender\.com/);
  assert.doesNotMatch(production, /sanjay-kumar-chemistry-lms/);
});

test('Render staging Blueprint remains isolated and never inherits production database secrets', () => {
  const staging = blueprint.split('  # Prepared staging service only.')[1];
  assert.ok(staging);
  assert.match(staging, /name: jmt-academy-staging/);
  assert.match(staging, /branch: audit\/jmt-master-prompt-follow-through/);
  assert.match(staging, /NEXT_PUBLIC_SUPABASE_URL[\s\S]*sync: false/);
  assert.match(staging, /NEXT_PUBLIC_SUPABASE_ANON_KEY[\s\S]*sync: false/);
  assert.match(staging, /SUPABASE_SERVICE_ROLE_KEY[\s\S]*sync: false/);
});

test('deployment guide documents the current production hostname and safe staging boundary', () => {
  assert.match(deployment, /Service: `jmtacademy-web`/);
  assert.match(deployment, /https:\/\/jmtacademy-web\.onrender\.com/);
  assert.match(deployment, /never point staging at the JMT Test project|Never point staging at production/);
  assert.doesNotMatch(deployment, /sanjay-kumar-chemistry-lms\.onrender\.com/);
});
