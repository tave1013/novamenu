import { webkit, chromium } from "playwright-core";
const sizes = [[1366,1024,"iPad Pro orizz."],[1024,1366,"iPad Pro vert."],[1180,820,"iPad Air orizz."],[820,1180,"iPad Air vert."],[768,1024,"iPad mini vert."],[800,1280,"Galaxy Tab vert."],[1280,800,"Galaxy Tab orizz."],[390,844,"iPhone"],[360,800,"Samsung"],[844,390,"iPhone orizz."]];
for (const [engine, name] of [[webkit, "webkit"], [chromium, "chromium"]]) {
  const b = await engine.launch(name === "chromium" ? { channel: "chrome" } : {});
  for (const [w, h, label] of sizes) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: name === "chromium" && w < 600 });
    const p = await ctx.newPage();
    await p.goto("http://localhost:3001/", { waitUntil: "networkidle" });
    const out = [];
    const total = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += Math.round(h * 0.6)) {
      await p.evaluate((yy) => window.scrollTo(0, yy), y);
      for (let k = 0; k < 4; k++) {
        await p.waitForTimeout(450);
        const bad = await p.evaluate(() => {
          const res = [];
          for (const c of document.querySelectorAll("div.pointer-events-none.absolute.left-0.top-0.z-30")) {
            const dot = c.lastElementChild; if (!dot) continue;
            const r = dot.getBoundingClientRect(), root = c.parentElement.getBoundingClientRect();
            const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            if (cx < root.left - 4 || cx > root.right + 4 || cy < root.top - 4 || cy > root.bottom + 4) res.push(`cursore fuori di ${Math.round(Math.max(root.left - cx, cx - root.right, root.top - cy, cy - root.bottom))}px`);
          }
          return res;
        });
        out.push(...bad);
      }
    }
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(name, label, `${w}x${h}`, "overflow:", overflow, "cursori fuori:", out.length, [...new Set(out)].slice(0, 3).join("; "));
    await ctx.close();
  }
  await b.close();
}
