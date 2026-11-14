import { IsBiasSpecification, IsFakeSpecification } from '@newssifter/specifications';

describe('IsFakeSpecification', () => {
  const isFake = new IsFakeSpecification();

  it.each(['fake', ' Fake '])('is satisfied when type1 is %p', (type1) => {
    expect(isFake.isSatisfiedBy({ type1 })).toBe(true);
  });

  it.each([undefined, '', 'bias', 'satire'])('is not satisfied when type1 is %p', (type1) => {
    expect(isFake.isSatisfiedBy({ type1 })).toBe(false);
  });

  it('composes with IsBiasSpecification', () => {
    const fakeOrBias = isFake.or(new IsBiasSpecification());
    expect(fakeOrBias.isSatisfiedBy({ type1: 'fake' })).toBe(true);
    expect(fakeOrBias.isSatisfiedBy({ type1: 'bias' })).toBe(true);
    expect(fakeOrBias.isSatisfiedBy({ type1: 'satire' })).toBe(false);
  });
});
