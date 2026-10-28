// Shared obstacle-aware navigation for Li and the smaller porch visitors.
export function makeNavigator({ width, height, fits, grid = 16 }) {
  const W = Math.ceil(width / grid), H = Math.ceil(height / grid), free = new Uint8Array(W * H);
  const key = (x, y) => y * W + x;
  const point = (x, y) => [(x + .5) * grid, (y + .5) * grid];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) free[key(x, y)] = fits(...point(x, y)) ? 1 : 0;
  function nearest(x, y, from = null) {
    const gx = Math.floor(x / grid), gy = Math.floor(y / grid);
    for (let r = 0; r < 50; r++) {
      let best = null, distance = Infinity;
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        const nx = gx + dx, ny = gy + dy;
        if (nx < 0 || nx >= W || ny < 0 || ny >= H || !free[key(nx, ny)]) continue;
        const p = point(nx, ny), d = Math.hypot(x - p[0], y - p[1]);
        if (from && !lineFree(from,p)) continue;
        if (d < distance) { distance = d; best = [nx, ny]; }
      }
      if (best) return best;
    }
    return null;
  }
  function lineFree(a, b) {
    const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 4));
    for (let i = 1; i <= n; i++) if (!fits(a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n)) return false;
    return true;
  }
  function nav(sx, sy, tx, ty) {
    const start = [sx, sy], end = [tx, ty];
    if(!fits(sx,sy)) return [];
    if (fits(tx, ty) && lineFree(start, end)) return [end];
    const s = nearest(sx, sy, start), e = nearest(tx, ty); if (!s || !e) return [];
    const open = [[0, ...s]], came = new Map(), cost = new Map([[key(...s), 0]]), visited = new Set();
    let path = null;
    while (open.length) {
      open.sort((a, b) => a[0] - b[0]); const [, x, y] = open.shift(), here = key(x, y);
      if (visited.has(here)) continue; visited.add(here);
      if (x === e[0] && y === e[1]) {
        path = []; let k = here;
        while (came.has(k)) { path.unshift(point(k % W, Math.floor(k / W))); k = came.get(k); }
        path.unshift(point(...s));
        const last = path.at(-1) || start;
        if (fits(tx, ty) && lineFree(last, end)) path.push(end);
        break;
      }
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) {
        const nx = x + dx, ny = y + dy, k = key(nx, ny);
        if (nx < 0 || nx >= W || ny < 0 || ny >= H || !free[k]) continue;
        if (dx && dy && (!free[key(x + dx, y)] || !free[key(x, y + dy)])) continue;
        if (!lineFree(point(x, y), point(nx, ny))) continue;
        const c = cost.get(here) + (dx && dy ? Math.SQRT2 : 1);
        if (c < (cost.get(k) ?? Infinity)) { cost.set(k, c); came.set(k, here); open.push([c + Math.hypot(e[0] - nx, e[1] - ny), nx, ny]); }
      }
    }
    if (!path) return [];
    const out = []; let from = start;
    for (let i = 0; i < path.length; i++) {
      let j = i; while (j + 1 < path.length && lineFree(from, path[j + 1])) j++;
      if (!lineFree(from, path[j])) return []; // Never escape a blocked target through geometry.
      out.push(path[j]); from = path[j]; i = j;
    }
    return out;
  }
  return { nav, lineFree, nearest: (x,y) => { const n=nearest(x,y);return n?point(...n):null; } };
}
