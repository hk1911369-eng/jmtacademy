# Supabase Primary vs JMT Test — Schema Boundary Audit

**Audit date:** 2026-11-14  
**Method:** Read-only Supabase project listing, migration listing and verbose public-schema table introspection.  
**Projects:** Primary project and separate JMT Test project.

## 1. Project health

Both Supabase projects report ACTIVE_HEALTHY on PostgreSQL 17.11:
- Primary project region: ap-southeast-2.
- JMT Test region: ap-south-1.

No database mutation was performed.

## 2. Public schema comparison

| Check | Primary | JMT Test | Result |
|---|---:|---:|---|
| Public tables | 49 | 57 | Test has 8 additional tables |
| Shared table names | 49 | 49 | All primary public tables exist in test |
| Column name/type differences on shared tables | — | — | 0 |
| Primary-key differences on shared tables | — | — | 0 |
| RLS-disabled public tables | 0 | 0 | All listed public tables have RLS enabled |
| RLS flag differences on shared tables | — | — | 0 |
| Foreign-key differences | — | — | Test has additional FKs for test-only modules |

The eight JMT Test-only tables are:
1. student_practice_questions
2. student_practice_attempts
3. virtual_lab_catalog
4. lab_notebook_entries
5. lab_practical_assignments
6. lab_notebook_evidence
7. lab_notebook_review_history
8. assignment_submission_versions

The extra foreign keys are associated with those practice, virtual-lab and submission-history tables. No primary-only public table or shared-table column/primary-key/RLS difference was found in this comparison.

## 3. Interpretation

The current state is not full table-for-table parity. It is a shared 49-table foundation with the JMT Test project carrying eight additional feature tables. This is consistent with the repository's explicit staging boundary for student practice, virtual labs and assignment submission version history.

The migration histories also differ materially in count, version and execution order. Treat them as environment-specific histories; do not attempt to make them identical by replaying migrations blindly. The live schema comparison, not migration-name similarity alone, is the relevant evidence.

## 4. Safe next steps

- Keep the eight additional feature tables in JMT Test until their code, RLS, policies, triggers, grants, functions and end-to-end tests are approved for production.
- Before any production migration, reconcile the repository migration sequence against the actual primary schema and check for duplicate or out-of-order migration history.
- For each release, apply the exact reviewed migration set to a disposable/test environment first, run schema and security comparisons, then obtain explicit production release approval.
- Preserve test-only synthetic data and never copy real student identities or payment data into test fixtures.

## 5. Change boundary

This was read-only introspection. No SQL writes, migrations, seed changes, storage changes, production settings or deployments were performed.
