import {
  ALL_TYPES,
  MatchesTypeSpecification,
  NO_TYPE,
} from '@newssifter/specifications';

describe('MatchesTypeSpecification', () => {
  const source = { type1: 'fake', type2: undefined };

  it('matches everything when all types are selected', () => {
    expect(
      new MatchesTypeSpecification('type1', ALL_TYPES).isSatisfiedBy(source)
    ).toBe(true);
    expect(
      new MatchesTypeSpecification('type2', ALL_TYPES).isSatisfiedBy(source)
    ).toBe(true);
  });

  it('matches only the exact type in the chosen field', () => {
    expect(
      new MatchesTypeSpecification('type1', 'fake').isSatisfiedBy(source)
    ).toBe(true);
    expect(
      new MatchesTypeSpecification('type1', 'bias').isSatisfiedBy(source)
    ).toBe(false);
    expect(
      new MatchesTypeSpecification('type2', 'fake').isSatisfiedBy(source)
    ).toBe(false);
  });

  it('matches blanks when none is selected', () => {
    expect(
      new MatchesTypeSpecification('type2', NO_TYPE).isSatisfiedBy(source)
    ).toBe(true);
    expect(
      new MatchesTypeSpecification('type2', NO_TYPE).isSatisfiedBy({
        type2: '',
      })
    ).toBe(true);
    expect(
      new MatchesTypeSpecification('type1', NO_TYPE).isSatisfiedBy(source)
    ).toBe(false);
  });

  it('combines the two fields with and()', () => {
    const both = new MatchesTypeSpecification('type1', 'fake').and(
      new MatchesTypeSpecification('type2', NO_TYPE)
    );
    expect(both.isSatisfiedBy(source)).toBe(true);
    expect(both.isSatisfiedBy({ type1: 'fake', type2: 'bias' })).toBe(false);
  });
});
