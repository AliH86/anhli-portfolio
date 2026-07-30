/*
 * Shared progress for Cổ tích Vườn Bồ Công Anh.
 *
 * This file intentionally has no DOM or game UI dependencies. Include the same
 * script from any page on this origin (including /garden/) to share progress.
 */
(function initWorldState(root) {
  'use strict';

  var STORAGE_KEY = 'anhli.worldState';
  var CURRENT_VERSION = 2;
  var DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

  function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function copy(value) {
    if (Array.isArray(value)) return value.map(copy);
    if (!isPlainObject(value)) return value;
    var result = {};
    Object.keys(value).forEach(function copyKey(key) {
      result[key] = copy(value[key]);
    });
    return result;
  }

  /*
   * Defaults fill missing fields while source wins and keeps unknown fields.
   * This lets a newer page add data without an older page silently deleting it.
   */
  function mergeWithDefaults(defaults, source) {
    var result = isPlainObject(source) ? copy(source) : {};
    Object.keys(defaults).forEach(function mergeKey(key) {
      if (isPlainObject(defaults[key])) {
        result[key] = mergeWithDefaults(defaults[key], result[key]);
      } else if (result[key] === undefined) {
        result[key] = copy(defaults[key]);
      }
    });
    return result;
  }

  function getDefaultWorldState() {
    return {
      version: CURRENT_VERSION,
      player: {
        id: '',
        createdAt: null,
        lastVisitDate: null,
        uniqueVisitDates: []
      },
      egg: {
        discovered: false,
        discoveredAt: null,
        stage: 0,
        lastInteractionDate: null,
        hatched: false,
        hatchedAt: null
      },
      chicken: {
        unlocked: false,
        food: 0,
        mood: 'neutral',
        lastFedAt: null
      },
      discoveries: {
        lastDiscoveryDate: null,
        unlockedIds: []
      },
      collectibles: [],
      unlockedPlaces: []
    };
  }

  function safeDateOrNull(value) {
    return typeof value === 'string' && value ? value : null;
  }

  function uniqueStrings(value, dateKeysOnly) {
    if (!Array.isArray(value)) return [];
    var seen = Object.create(null);
    return value.filter(function keepUnique(item) {
      if (typeof item !== 'string' || !item) return false;
      if (dateKeysOnly && !DATE_KEY_PATTERN.test(item)) return false;
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }

  function migrateWorldState(rawState) {
    var parsed = rawState;

    if (typeof rawState === 'string') {
      try {
        parsed = JSON.parse(rawState);
      } catch (error) {
        return getDefaultWorldState();
      }
    }

    if (!isPlainObject(parsed)) return getDefaultWorldState();

    var state = mergeWithDefaults(getDefaultWorldState(), parsed);
    var sourceVersion = Number(parsed.version);

    // Version 0 / unversioned data and v1 use the same known field names.
    // Filling defaults plus the hatch invariant is their v2 migration.
    // Future versions are never downgraded.
    state.version = Number.isInteger(sourceVersion) && sourceVersion > CURRENT_VERSION
      ? sourceVersion
      : CURRENT_VERSION;

    state.player.id = typeof state.player.id === 'string' ? state.player.id : '';
    state.player.createdAt = safeDateOrNull(state.player.createdAt);
    state.player.lastVisitDate = DATE_KEY_PATTERN.test(state.player.lastVisitDate || '')
      ? state.player.lastVisitDate
      : null;
    state.player.uniqueVisitDates = uniqueStrings(state.player.uniqueVisitDates, true);

    state.egg.discovered = state.egg.discovered === true;
    state.egg.discoveredAt = safeDateOrNull(state.egg.discoveredAt);
    state.egg.stage = Math.max(0, Math.min(3, Number.isFinite(Number(state.egg.stage))
      ? Math.floor(Number(state.egg.stage))
      : 0));
    state.egg.lastInteractionDate = DATE_KEY_PATTERN.test(state.egg.lastInteractionDate || '')
      ? state.egg.lastInteractionDate
      : null;
    state.egg.hatched = state.egg.hatched === true;
    state.egg.hatchedAt = safeDateOrNull(state.egg.hatchedAt);

    state.chicken.unlocked = state.chicken.unlocked === true;
    if (state.egg.hatched) state.chicken.unlocked = true;
    state.chicken.food = Math.max(0, Number.isFinite(Number(state.chicken.food))
      ? Number(state.chicken.food)
      : 0);
    state.chicken.mood = typeof state.chicken.mood === 'string' && state.chicken.mood
      ? state.chicken.mood
      : 'neutral';
    state.chicken.lastFedAt = safeDateOrNull(state.chicken.lastFedAt);

    state.discoveries.lastDiscoveryDate = DATE_KEY_PATTERN.test(
      state.discoveries.lastDiscoveryDate || ''
    ) ? state.discoveries.lastDiscoveryDate : null;
    state.discoveries.unlockedIds = uniqueStrings(state.discoveries.unlockedIds, false);
    state.collectibles = uniqueStrings(state.collectibles, false);
    state.unlockedPlaces = uniqueStrings(state.unlockedPlaces, false);

    return state;
  }

  function getStorage() {
    try {
      return root.localStorage || null;
    } catch (error) {
      return null;
    }
  }

  function loadWorldState() {
    var storage = getStorage();
    if (!storage) return getDefaultWorldState();

    try {
      return migrateWorldState(storage.getItem(STORAGE_KEY));
    } catch (error) {
      return getDefaultWorldState();
    }
  }

  function saveWorldState(state) {
    var storage = getStorage();
    if (!storage) return false;

    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(migrateWorldState(state)));
      return true;
    } catch (error) {
      return false;
    }
  }

  function resetWorldState() {
    var storage = getStorage();
    if (storage) {
      try {
        storage.removeItem(STORAGE_KEY);
      } catch (error) {
        // Storage may be disabled or full; reset must never affect the site.
      }
    }
    return getDefaultWorldState();
  }

  function getLocalDateKey(date) {
    var value = date === undefined ? new Date() : new Date(date);
    if (Number.isNaN(value.getTime())) return null;
    return [
      String(value.getFullYear()).padStart(4, '0'),
      String(value.getMonth() + 1).padStart(2, '0'),
      String(value.getDate()).padStart(2, '0')
    ].join('-');
  }

  function createPlayerId() {
    try {
      if (root.crypto && typeof root.crypto.randomUUID === 'function') {
        return root.crypto.randomUUID();
      }
      if (root.crypto && typeof root.crypto.getRandomValues === 'function') {
        var parts = root.crypto.getRandomValues(new Uint32Array(4));
        return Array.prototype.map.call(parts, function toHex(part) {
          return part.toString(16).padStart(8, '0');
        }).join('-');
      }
    } catch (error) {
      // Fall through to the non-cryptographic, anonymous local identifier.
    }
    return 'local-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function registerDailyVisit(date) {
    var dateValue = date === undefined ? new Date() : new Date(date);
    var dateKey = getLocalDateKey(dateValue);
    var state = loadWorldState();
    if (!dateKey) return { state: state, dateKey: null, isNewDay: false };

    var isNewDay = state.player.uniqueVisitDates.indexOf(dateKey) === -1;
    if (!state.player.id) state.player.id = createPlayerId();
    if (!state.player.createdAt) state.player.createdAt = dateValue.toISOString();
    if (isNewDay) state.player.uniqueVisitDates.push(dateKey);
    state.player.lastVisitDate = dateKey;
    saveWorldState(state);

    return { state: state, dateKey: dateKey, isNewDay: isNewDay };
  }

  var api = {
    STORAGE_KEY: STORAGE_KEY,
    CURRENT_VERSION: CURRENT_VERSION,
    loadWorldState: loadWorldState,
    saveWorldState: saveWorldState,
    getDefaultWorldState: getDefaultWorldState,
    migrateWorldState: migrateWorldState,
    resetWorldState: resetWorldState,
    getLocalDateKey: getLocalDateKey,
    registerDailyVisit: registerDailyVisit
  };

  root.AnhLiWorld = api;

  // The portfolio only records a local calendar visit. Any failure stays
  // isolated inside this module and cannot block the rest of the page.
  if (root.document) {
    try {
      registerDailyVisit();
    } catch (error) {
      // No UI or logging: this foundation should remain invisible to visitors.
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
