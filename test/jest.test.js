test('Devo conhecer as principais assertivas do jest', () => {
  const number = null;
  expect(number).toBeNull();
  const number2 = 10;
  expect(number2).not.toBeNull();
});
