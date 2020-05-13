describe('index', () => {
  it('should be valid', () => {
    expect(require('./index')).toMatchObject({
      rules: expect.any(Object),
    });
  });
});
