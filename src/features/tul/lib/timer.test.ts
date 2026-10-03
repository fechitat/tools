import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formatTime,
  formatSeconds,
  formatRecommendedRange,
  compareWithRecommendedTime,
} from "./timer.ts";

test("formatTime formatea milisegundos en mm:ss.SS correctamente", () => {
  assert.equal(formatTime(0), "00:00.00");
  assert.equal(formatTime(59990), "00:59.99");
  assert.equal(formatTime(60000), "01:00.00");
  assert.equal(formatTime(77430), "01:17.43");
  assert.equal(formatTime(125890), "02:05.89");
});

test("formatSeconds formatea segundos en mm:ss", () => {
  assert.equal(formatSeconds(30), "00:30");
  assert.equal(formatSeconds(75), "01:15");
  assert.equal(formatSeconds(120), "02:00");
});

test("formatRecommendedRange formatea rangos", () => {
  assert.equal(formatRecommendedRange(30, 42), "00:30 – 00:42");
  assert.equal(formatRecommendedRange(undefined, undefined), "Sin tiempo estipulado");
  assert.equal(formatRecommendedRange(30, undefined), "Mínimo 00:30");
  assert.equal(formatRecommendedRange(undefined, 45), "Máximo 00:45");
});

test("compareWithRecommendedTime evalúa si el tiempo está en rango, por debajo o por encima", () => {
  const range = { min: 30, max: 42 };

  // Dentro del rango (35s -> 35000ms)
  const within = compareWithRecommendedTime(35000, range);
  assert.equal(within.status, "within_range");

  // Por debajo (25s -> 25000ms)
  const below = compareWithRecommendedTime(25000, range);
  assert.equal(below.status, "below_min");
  assert.match(below.message, /Rápido/);

  // Por encima (48s -> 48000ms)
  const above = compareWithRecommendedTime(48000, range);
  assert.equal(above.status, "above_max");
  assert.match(above.message, /Lento/);

  // Sin recomendación
  const noRec = compareWithRecommendedTime(30000, undefined);
  assert.equal(noRec.status, "no_recommendation");
});
