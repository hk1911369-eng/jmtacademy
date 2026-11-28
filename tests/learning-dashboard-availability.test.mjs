import test from 'node:test';
import assert from 'node:assert/strict';
import { getLearningDashboardAvailability, getLearningDashboardSectionState } from '../lib/learning-dashboard-availability.mjs';

test('full success with an empty source is a truthful empty state', () => {
  const state = getLearningDashboardAvailability([]);
  assert.equal(state.hasIssues, false);
  assert.equal(state.nextActionUnavailable, false);
  assert.equal(state.hasIssue('mastery'), false);
  assert.equal(getLearningDashboardSectionState([], 'mastery', 0), 'empty');
});

test('one source failure is isolated and does not mark healthy sections unavailable', () => {
  const state = getLearningDashboardAvailability(['mistakes']);
  assert.equal(state.hasIssues, true);
  assert.equal(state.hasIssue('mistakes'), true);
  assert.equal(state.hasIssue('goals'), false);
  assert.equal(state.nextActionUnavailable, false);
  assert.equal(getLearningDashboardSectionState(['mistakes'], 'mistakes', 0), 'unavailable');
  assert.equal(getLearningDashboardSectionState(['mistakes'], 'goals', 0), 'empty');
});

test('a failed priority source suppresses a potentially misleading next action', () => {
  const state = getLearningDashboardAvailability(['revision']);
  assert.equal(state.nextActionUnavailable, true);
});

test('multiple failures preserve section-level status and block incomplete prioritisation', () => {
  const issues = ['mastery', 'upcomingAssignments', 'recommendations'];
  const state = getLearningDashboardAvailability(issues);
  assert.equal(state.hasIssues, true);
  assert.equal(state.hasIssue('mastery'), true);
  assert.equal(state.hasIssue('upcomingAssignments'), true);
  assert.equal(state.hasIssue('goals'), false);
  assert.equal(state.nextActionUnavailable, true);
  assert.equal(getLearningDashboardSectionState(issues, 'mastery', 0), 'unavailable');
  assert.equal(getLearningDashboardSectionState(issues, 'goals', 2), 'ready');
});
