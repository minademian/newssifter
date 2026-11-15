import { HasTypeSpecification, IsBiasSpecification } from '@newssifter/specifications';

describe('IsBiasSpecification', () => {
  const isBias = new IsBiasSpecification();

  it.each(['bias', ' Bias '])('is satisfied when type1 is %p', (type1) => {
    expect(isBias.isSatisfiedBy({ type1 })).toBe(true);
  });

  it.each([undefined, '', 'fake'])('is not satisfied when type1 is %p', (type1) => {
    expect(isBias.isSatisfiedBy({ type1 })).toBe(false);
  });

  it('composes with HasTypeSpecification', () => {
    const typedNotBias = new HasTypeSpecification().and(isBias.not());
    expect(typedNotBias.isSatisfiedBy({ type1: 'fake' })).toBe(true);
    expect(typedNotBias.isSatisfiedBy({ type1: 'bias' })).toBe(false);
  });
});
