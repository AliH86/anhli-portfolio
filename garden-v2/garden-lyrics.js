// Timed lines are supplied by the author. No generated or guessed lyrics.
const sections = new Set(['intro','verse','pre','chorus','bridge','outro']);
const poses = new Set(['sing-soft','hum','eyes-closed']);
export function validateLyrics(data, trackId) {
  if (!data || data.trackId !== trackId || data.featured !== true || !Array.isArray(data.lines)) throw Error('Invalid lyric track');
  let end = -1;
  const lines = data.lines.map(line => {
    if (!Number.isFinite(line.start) || !Number.isFinite(line.end) || line.start < 0 || line.start < end || line.end <= line.start || typeof line.text !== 'string' || !line.text.trim()) throw Error('Invalid lyric timing');
    end = line.end;
    return {start:line.start, end:line.end, text:line.text, sub:typeof line.sub === 'string' ? line.sub : '', section:sections.has(line.section) ? line.section : ''};
  });
  const hostMoments = (data.hostMoments || []).map(moment => {
    if (!Number.isFinite(moment.time) || moment.time < 0 || !Number.isFinite(moment.duration) || moment.duration <= 0 || moment.duration > 12 || !poses.has(moment.pose) || typeof moment.text !== 'string') throw Error('Invalid host moment');
    return {time:moment.time,duration:moment.duration,pose:moment.pose,text:moment.text};
  });
  return {trackId,featured:true,lines,hostMoments};
}
export function lyricFrame(data, time) {
  if (!data || !Number.isFinite(time)) return {index:-1,lines:[],section:'',moment:null};
  const index = data.lines.findIndex(line => time >= line.start && time < line.end);
  const moment = data.hostMoments.find(m => time >= m.time && time < m.time + m.duration) || null;
  return {index,lines:index < 0 ? [] : data.lines.slice(Math.max(0,index-2),index+3).map(line => ({...line,offset:data.lines.indexOf(line)-index})),section:index < 0 ? '' : data.lines[index].section,moment};
}
export function createLyricLoader(fetcher = fetch) {
  let index;
  const cache = new Map();
  return async trackId => {
    if (!trackId) return null;
    try {
      index ||= fetcher('./data/lyrics/index.json').then(r => {if (!r.ok) throw Error('lyrics index');return r.json();});
      const manifest = await index, path = manifest.tracks?.[trackId];
      if (typeof path !== 'string' || !/^[a-zA-Z0-9_-]+\.json$/.test(path)) return null;
      if (!cache.has(trackId)) cache.set(trackId, fetcher(`./data/lyrics/${path}`).then(r => {if (!r.ok) throw Error('lyrics unavailable');return r.json();}).then(data => validateLyrics(data,trackId)).catch(() => {cache.delete(trackId);return null;}));
      return await cache.get(trackId);
    } catch {index = null;return null;}
  };
}
export function initLyrics({audio, getTrack, getRoom, getPlaying, onMoment}) {
  const load = createLyricLoader(); let key = '', token = 0, data = null, rendered = '', node = null;
  function paint() {
    const target = document.querySelector('#lyrics-field'), active = getPlaying();
    const frame = lyricFrame(data,audio.currentTime), signature = `${key}:${frame.index}:${active}`;
    document.querySelector('#room-dialog').dataset.lyricSection = active ? frame.section : '';
    document.querySelector('#room-dialog').dataset.hasLyrics = String(Boolean(data?.lines.length));
    if (target && (signature !== rendered || target !== node)) {
      target.replaceChildren(); target.hidden = !data?.lines.length; target.dataset.instrumental = String(frame.index < 0);
      for (const line of frame.lines) {
        const p = document.createElement('p'); p.dataset.offset = String(line.offset); p.textContent = line.text;
        if (line.offset === 0) p.setAttribute('aria-current','true');
        if (line.sub) {const sub = document.createElement('small');sub.textContent = line.sub;p.append(sub);}
        target.append(p);
      }
      rendered = signature; node = target;
    }
    onMoment(active && !getRoom() && !document.hidden ? frame.moment : null);
  }
  async function update() {
    const trackId = getTrack()?.id || '';
    if (key !== trackId) {
      key = trackId; data = null; const request = ++token; paint();
      const result = await load(trackId);
      if (request !== token) return;
      data = result;
    }
    paint();
  }
  for (const name of ['timeupdate','seeked','playing','pause','ended','loadedmetadata']) audio.addEventListener(name,paint);
  document.addEventListener('visibilitychange',paint);
  return {update,paint};
}
