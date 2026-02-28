import { expect, test } from "@playwright/test";

test("landing renders key zones", async ({ page, isMobile }) => {
  await page.goto("/");

  await expect(page.getByTestId("top-strip")).toBeVisible();
  if (isMobile) {
    await expect(page.getByTestId("side-rail")).toBeHidden();
  } else {
    await expect(page.getByTestId("side-rail")).toBeVisible();
  }
  await expect(page.getByTestId("main-panel")).toBeVisible();
  await expect(page.getByTestId("footer-meta")).toBeVisible();
});

test("canvas updates frame counter", async ({ page }) => {
  await page.goto("/");
  const root = page.getByTestId("ascii-canvas-root");

  await expect(root).toBeVisible();
  await page.waitForTimeout(350);
  const frame = await root.getAttribute("data-frame");

  expect(Number(frame)).toBeGreaterThan(0);
});

test("lens appears on hover and follows drag on desktop", async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== "chromium" || isMobile, "Desktop Chromium only");

  await page.goto("/");
  const root = page.getByTestId("ascii-canvas-root");
  const lens = page.getByTestId("ascii-lens");

  await root.hover({ position: { x: 220, y: 190 } });
  await expect(lens).toHaveAttribute("data-active", "true");

  await page.mouse.down();
  await expect(lens).toHaveAttribute("data-dragging", "true");
  await page.mouse.move(460, 320);
  await page.mouse.up();

  await expect(lens).toHaveAttribute("data-dragging", "false");
});

test("mobile uses simplified mode", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile project only");

  await page.goto("/");
  const root = page.getByTestId("ascii-canvas-root");
  await expect(root).toHaveAttribute("data-mobile-mode", "true");
});

test("keyboard navigation reaches focusable links", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");

  const focused = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
  expect(["button", "a"]).toContain(focused);
});
