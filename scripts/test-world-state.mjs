import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../js/world-state.js', import.meta.url), 'utf8');

function makeStorage(sharedMap = new Map()) {
  return {
    getItem(key) {
      return sharedMap.has(key) ? sharedMap.get(key) : null;
    },
    setItem(key, value) {
      sharedMap.set(key, String(value));
    },
    removeItem(key) {
      sharedMap.delete(key);
    }
  };
}

function loadApi(sharedMap = new Map()) {
  const sandbox = {
    localStorage: makeStorage(sharedMap),
    crypto: { randomUUID: () => 'test-player-id' },
    Date,
    Math,
    Uint32Array
  };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(source, sandbox, { filename: 'world-state.js' });
  return sandbox.AnhLiWorld;
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

{
  const api = loadApi();
  const state = plain(api.loadWorldState());
  assert.equal(state.version, 1, 'missing state uses v1 defaults');
  assert.deepEqual(state.player.uniqueVisitDates, []);
  assert.equal(state.egg.stage, 0);
}

{
  const shared = new Map();
  const api = loadApi(shared);
  shared.set(api.STORAGE_KEY, '{broken json');
  assert.doesNotThrow(() => api.loadWorldState());
  assert.equal(api.loadWorldState().egg.discovered, false, 'corrupt JSON falls back safely');
}

{
  const api = loadApi();
  const migrated = plain(api.migrateWorldState({
    version: 0,
    player: { uniqueVisitDates: ['2026-07-27', '2026-07-27', 'invalid'] },
    egg: { stage: 99 },
    futureFeature: { keepsItsData: true }
  }));
  assert.equal(migrated.version, 1);
  assert.deepEqual(migrated.player.uniqueVisitDates, ['2026-07-27']);
  assert.equal(migrated.egg.stage, 3);
  assert.deepEqual(migrated.futureFeature, { keepsItsData: true }, 'unknown fields survive migration');
}

{
  const api = loadApi();
  const state = api.getDefaultWorldState();
  state.player.id = 'existing-player';
  state.chicken.food = 4;
  assert.equal(api.saveWorldState(state), true);
  const loaded = api.loadWorldState();
  assert.equal(loaded.player.id, 'existing-player');
  assert.equal(loaded.chicken.food, 4);
  api.resetWorldState();
  assert.equal(api.loadWorldState().player.id, '', 'developer reset clears only world state');
}

{
  const api = loadApi();
  assert.equal(api.getLocalDateKey(new Date(2026, 6, 27, 23, 59)), '2026-07-27');
  assert.equal(api.getLocalDateKey(new Date(2026, 7, 1, 0, 1)), '2026-08-01');
  assert.equal(api.getLocalDateKey(new Date(2027, 0, 1, 0, 1)), '2027-01-01');
  assert.equal(api.getLocalDateKey('not-a-date'), null);
}

{
  const shared = new Map();
  const tabA = loadApi(shared);
  const first = tabA.registerDailyVisit(new Date(2026, 6, 27, 9, 0));
  const repeated = tabA.registerDailyVisit(new Date(2026, 6, 27, 23, 0));
  assert.equal(first.isNewDay, true);
  assert.equal(repeated.isNewDay, false, 'same day counts once after refresh');

  const tabB = loadApi(shared);
  const otherTab = tabB.registerDailyVisit(new Date(2026, 6, 27, 12, 0));
  assert.equal(otherTab.isNewDay, false, 'same-origin tabs share the same visit');

  const nextDay = tabB.registerDailyVisit(new Date(2026, 6, 28, 0, 1));
  const nextMonth = tabB.registerDailyVisit(new Date(2026, 7, 1, 0, 1));
  const nextYear = tabB.registerDailyVisit(new Date(2027, 0, 1, 0, 1));
  assert.equal(nextDay.isNewDay, true);
  assert.equal(nextMonth.isNewDay, true);
  assert.equal(nextYear.isNewDay, true);
  assert.deepEqual(plain(nextYear.state.player.uniqueVisitDates), [
    '2026-07-27',
    '2026-07-28',
    '2026-08-01',
    '2027-01-01'
  ]);
}

console.log('world-state: all tests passed');
