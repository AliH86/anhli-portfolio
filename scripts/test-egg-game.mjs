import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const worldSource = readFileSync(new URL('../js/world-state.js', import.meta.url), 'utf8');
const configSource = readFileSync(new URL('../data/egg-game-config.js', import.meta.url), 'utf8');
const eggSource = readFileSync(new URL('../js/egg-game.js', import.meta.url), 'utf8');

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

function loadGame(sharedMap = new Map()) {
  const sandbox = {
    localStorage: makeStorage(sharedMap),
    crypto: { randomUUID: () => 'egg-test-player' },
    Date,
    Math,
    JSON,
    Uint32Array
  };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(worldSource, sandbox, { filename: 'world-state.js' });
  vm.runInNewContext(configSource, sandbox, { filename: 'egg-game-config.js' });
  vm.runInNewContext(eggSource, sandbox, { filename: 'egg-game.js' });
  return sandbox;
}

function loadBrowserLike(hostname) {
  const sharedMap = new Map();
  const listeners = {};
  const trigger = {
    dataset: {},
    setAttribute() {},
    addEventListener(type, listener) {
      listeners[type] = listener;
    }
  };
  const document = {
    getElementById(id) {
      return id === 'hiddenEgg' ? trigger : null;
    }
  };
  const sandbox = {
    localStorage: makeStorage(sharedMap),
    crypto: { randomUUID: () => 'browser-like-player' },
    location: { protocol: 'http:', hostname },
    document,
    Date,
    Math,
    JSON,
    Uint32Array
  };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(worldSource, sandbox, { filename: 'world-state.js' });
  vm.runInNewContext(configSource, sandbox, { filename: 'egg-game-config.js' });
  vm.runInNewContext(eggSource, sandbox, { filename: 'egg-game.js' });
  return { sandbox, trigger, listeners };
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

{
  const app = loadGame();
  const state = app.AnhLiWorld.getDefaultWorldState();
  const first = app.AnhLiEggGame.applyInteraction(state, new Date(2026, 6, 27, 9));
  assert.equal(first.kind, 'first-discovery');
  assert.equal(first.state.egg.discovered, true);
  assert.equal(first.state.egg.stage, 1);
  assert.equal(first.state.egg.lastInteractionDate, '2026-07-27');
  assert.equal(first.state.egg.hatched, false);

  const sameDay = app.AnhLiEggGame.applyInteraction(first.state, new Date(2026, 6, 27, 23));
  assert.equal(sameDay.kind, 'same-day');
  assert.equal(sameDay.changed, false);
  assert.equal(sameDay.state.egg.stage, 1);

  const cracked = app.AnhLiEggGame.applyInteraction(sameDay.state, new Date(2026, 6, 28, 8));
  assert.equal(cracked.kind, 'stage-changed');
  assert.equal(cracked.state.egg.stage, 2);

  const ready = app.AnhLiEggGame.applyInteraction(cracked.state, new Date(2026, 6, 29, 8));
  assert.equal(ready.state.egg.stage, 3);
  assert.equal(ready.state.egg.hatched, false);

  const capped = app.AnhLiEggGame.applyInteraction(ready.state, new Date(2026, 6, 30, 8));
  assert.equal(capped.kind, 'stage-ready');
  assert.equal(capped.state.egg.stage, 3);
  assert.equal(capped.state.egg.hatched, false);
}

{
  const shared = new Map();
  const firstPage = loadGame(shared);
  const discovered = firstPage.AnhLiEggGame.interact(new Date(2026, 6, 27, 9));
  assert.equal(discovered.state.egg.stage, 1);

  const refreshedPage = loadGame(shared);
  const afterRefresh = refreshedPage.AnhLiEggGame.interact(new Date(2026, 6, 27, 14));
  assert.equal(afterRefresh.kind, 'same-day');
  assert.equal(afterRefresh.state.egg.stage, 1, 'refresh does not advance the egg');
}

{
  const shared = new Map([['anhli.worldState', '{corrupted']]);
  const app = loadGame(shared);
  assert.doesNotThrow(() => app.AnhLiEggGame.interact(new Date(2026, 6, 27, 9)));
  assert.equal(app.AnhLiWorld.loadWorldState().egg.stage, 1);
}

{
  const app = loadGame();
  const source = app.AnhLiWorld.getDefaultWorldState();
  source.futureField = { preserve: true };
  source.egg.unknownEggField = 'keep-me';
  source.egg.hatched = true;
  source.egg.hatchedAt = 'future-value';
  const result = app.AnhLiEggGame.applyInteraction(source, new Date(2026, 6, 27, 9));
  const savedShape = plain(result.state);
  assert.deepEqual(savedShape.futureField, { preserve: true });
  assert.equal(savedShape.egg.unknownEggField, 'keep-me');
  assert.equal(savedShape.egg.hatched, true, 'Phase 1 never reverses future hatch state');
  assert.equal(savedShape.egg.hatchedAt, 'future-value');
}

{
  const app = loadGame();
  const inconsistent = app.AnhLiWorld.getDefaultWorldState();
  inconsistent.egg.discovered = true;
  const repaired = app.AnhLiEggGame.applyInteraction(inconsistent, new Date(2026, 6, 27, 9));
  assert.equal(repaired.state.egg.stage, 1, 'discovered stage 0 is repaired without skipping warm');
}

{
  const local = loadBrowserLike('localhost');
  assert.equal(typeof local.sandbox.AnhLiEggDebug, 'object');
  assert.equal(local.trigger.dataset.stage, '0');
  assert.equal(local.sandbox.AnhLiEggDebug.setStage(2).stage, 2);
  assert.equal(local.trigger.dataset.stage, '2');
  assert.equal(local.sandbox.AnhLiEggDebug.nextDay().state.egg.stage, 3);
  assert.equal(local.sandbox.AnhLiEggDebug.reset().stage, 0);
  assert.equal(local.trigger.dataset.stage, '0');
  assert.equal(typeof local.listeners.click, 'function', 'semantic button receives one click handler');

  const production = loadBrowserLike('alih86.github.io');
  assert.equal(production.sandbox.AnhLiEggDebug, undefined, 'debug helpers stay off production');
}

console.log('egg-game: all tests passed');
