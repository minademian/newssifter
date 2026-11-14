import { HasTypeSpecification } from '@newssifter/specifications';

describe('HasTypeSpecification', () => {
  const hasType = new HasTypeSpecification();
  const alwaysTrue = { isSatisfiedBy: () => true };
  const alwaysFalse = { isSatisfiedBy: () => false };

  it('is satisfied by a source with a type1', () => {
    expect(hasType.isSatisfiedBy({ type1: 'fake' })).toBe(true);
  });

  it.each([undefined, '', ' '])('is not satisfied when type1 is %p', (type1) => {
    expect(hasType.isSatisfiedBy({ type1 })).toBe(false);
  });

  it('negates with not()', () => {
    expect(hasType.not().isSatisfiedBy({ type1: 'fake' })).toBe(false);
    expect(hasType.not().isSatisfiedBy({})).toBe(true);
  });

  it('requires both with and()', () => {
    const source = { type1: 'fake' };
    expect(hasType.and(alwaysTrue as never).isSatisfiedBy(source)).toBe(true);
    expect(hasType.and(alwaysFalse as never).isSatisfiedBy(source)).toBe(false);
  });

  it('requires either with or()', () => {
    expect(hasType.or(alwaysTrue as never).isSatisfiedBy({})).toBe(true);
    expect(hasType.or(alwaysFalse as never).isSatisfiedBy({})).toBe(false);
  });
});
