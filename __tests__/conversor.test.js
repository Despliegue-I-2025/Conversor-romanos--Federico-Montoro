const request = require('supertest');
const { app, romanToArabic, arabicToRoman } = require('../index.js');

describe('Conversor de números romanos ↔ arábigos (funciones puras)', () => {
  test('Convierte I a 1', () => {
    expect(romanToArabic('I')).toBe(1);
  });

  test('Convierte V a 5', () => {
    expect(romanToArabic('V')).toBe(5);
  });

  test('Convierte X a 10', () => {
    expect(romanToArabic('X')).toBe(10);
  });

  test('Convierte 1 a I', () => {
    expect(arabicToRoman(1)).toBe('I');
  });

  test('Convierte 10 a X', () => {
    expect(arabicToRoman(10)).toBe('X');
  });
});

describe('Endpoints HTTP del conversor', () => {
  test('GET /r2a convierte X en 10', async () => {
    const res = await request(app).get('/r2a?roman=X');
    expect(res.statusCode).toBe(200);
    expect(res.body.arabic).toBe(10);
  });

  test('GET /a2r convierte 50 en L', async () => {
    const res = await request(app).get('/a2r?arabic=50');
    expect(res.statusCode).toBe(200);
    expect(res.body.roman).toBe('L');
  });

  test('GET /r2a sin query roman devuelve 400', async () => {
    const res = await request(app).get('/r2a');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('GET /a2r con número fuera de rango devuelve 400', async () => {
    const res = await request(app).get('/a2r?arabic=0');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});


