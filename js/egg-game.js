/*
 * Hidden Egg MVP.
 * State transitions are independent of the DOM so storage failure cannot
 * interrupt the portfolio and the same rules can be unit-tested.
 */
(function initEggGame(root) {
  'use strict';

  var world = root.AnhLiWorld;
  var config = root.ANHLI_EGG_GAME_CONFIG || {};
  var trigger = root.document && root.document.getElementById('hiddenEgg');
  var message = root.document && root.document.getElementById('hiddenEggMessage');
  var messageTimer = 0;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function clampStage(value) {
    var stage = Number(value);
    if (!Number.isFinite(stage)) return 0;
    return Math.max(0, Math.min(3, Math.floor(stage)));
  }

  function getCopy(result) {
    var copyConfig = config.microcopy || {};
    if (result.kind === 'first-discovery') return copyConfig.firstDiscovery || [];
    if (result.kind === 'same-day') return copyConfig.sameDay || [];
    return (copyConfig.stages && copyConfig.stages[result.state.egg.stage])
      || copyConfig.sameDay
      || [];
  }

  /*
   * Pure transition: the caller owns persistence. `date` uses the visitor's
   * local calendar via world.getLocalDateKey(), matching Phase 0.
   */
  function applyInteraction(inputState, date) {
    var state = world.migrateWorldState(clone(inputState));
    var interactionDate = date === undefined ? new Date() : new Date(date);
    var dateKey = world.getLocalDateKey(interactionDate);

    if (!dateKey || Number.isNaN(interactionDate.getTime())) {
      return { state: state, kind: 'invalid-date', changed: false, dateKey: null };
    }

    state.egg.stage = clampStage(state.egg.stage);

    if (!state.egg.discovered) {
      state.egg.discovered = true;
      state.egg.discoveredAt = interactionDate.toISOString();
      state.egg.stage = 1;
      state.egg.lastInteractionDate = dateKey;
      return { state: state, kind: 'first-discovery', changed: true, dateKey: dateKey };
    }

    if (state.egg.lastInteractionDate === dateKey) {
      return { state: state, kind: 'same-day', changed: false, dateKey: dateKey };
    }

    var previousStage = state.egg.stage;
    state.egg.stage = state.egg.stage < 1
      ? 1
      : Math.min(3, state.egg.stage + 1);
    state.egg.lastInteractionDate = dateKey;
    return {
      state: state,
      kind: state.egg.stage > previousStage ? 'stage-changed' : 'stage-ready',
      changed: state.egg.stage > previousStage,
      dateKey: dateKey
    };
  }

  function render(state) {
    if (!trigger || !state || !state.egg) return;
    var stage = clampStage(state.egg.stage);
    trigger.dataset.stage = String(stage);
    trigger.dataset.discovered = state.egg.discovered ? 'true' : 'false';
  }

  function showMessage(lines) {
    if (!message) return;
    root.clearTimeout(messageTimer);
    message.classList.remove('is-visible');
    message.innerHTML = (Array.isArray(lines) ? lines : []).map(function lineHtml(line) {
      var span = root.document.createElement('span');
      span.textContent = String(line);
      return span.outerHTML;
    }).join('');
    message.hidden = false;
    // Force a class restart without depending on a perpetual animation loop.
    void message.offsetWidth;
    message.classList.add('is-visible');
    messageTimer = root.setTimeout(function hideEggMessage() {
      message.classList.remove('is-visible');
      message.hidden = true;
    }, 5600);
  }

  function interact(date) {
    if (!world) return null;
    var result = applyInteraction(world.loadWorldState(), date);
    if (result.kind !== 'invalid-date') world.saveWorldState(result.state);
    render(result.state);
    showMessage(getCopy(result));
    return result;
  }

  function resetEggState() {
    var state = world.loadWorldState();
    state.egg = clone(world.getDefaultWorldState().egg);
    world.saveWorldState(state);
    render(state);
    if (message) message.hidden = true;
    return clone(state.egg);
  }

  function setEggStage(stage) {
    var state = world.loadWorldState();
    var nextStage = clampStage(stage);
    var now = new Date();
    state.egg = clone(world.getDefaultWorldState().egg);
    state.egg.stage = nextStage;
    state.egg.discovered = nextStage > 0;
    state.egg.discoveredAt = nextStage > 0 ? now.toISOString() : null;
    state.egg.lastInteractionDate = nextStage > 0 ? world.getLocalDateKey(now) : null;
    world.saveWorldState(state);
    render(state);
    return clone(state.egg);
  }

  function nextDebugDate() {
    var egg = world.loadWorldState().egg;
    var parts = String(egg.lastInteractionDate || '').split('-').map(Number);
    var next = parts.length === 3 && parts.every(Number.isFinite)
      ? new Date(parts[0], parts[1] - 1, parts[2], 12)
      : new Date();
    next.setDate(next.getDate() + 1);
    return next;
  }

  var api = {
    applyInteraction: applyInteraction,
    interact: interact,
    render: render
  };
  root.AnhLiEggGame = api;

  if (!world || !trigger) return;

  trigger.setAttribute('aria-label', config.ariaLabel || 'Khám phá vật nhỏ nằm giữa cỏ');
  render(world.loadWorldState());
  trigger.addEventListener('click', function onEggClick(event) {
    event.preventDefault();
    event.stopPropagation();
    interact();
  });

  /*
   * Console-only helpers are exposed on local/file previews, never on the
   * GitHub Pages production hostname. No debug controls are added to the UI.
   */
  var location = root.location || {};
  var developmentHost = location.protocol === 'file:'
    || location.hostname === 'localhost'
    || location.hostname === '127.0.0.1'
    || location.hostname === '[::1]';

  if (developmentHost) {
    root.AnhLiEggDebug = {
      getState: function getEggState() {
        return clone(world.loadWorldState().egg);
      },
      reset: resetEggState,
      setStage: setEggStage,
      nextDay: function simulateNextDay() {
        return interact(nextDebugDate());
      }
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
