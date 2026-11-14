import { CompositeSpecification } from './specification';

export const ALL_TYPES = '';
export const NO_TYPE = '__none__';

export type TypeField = 'type1' | 'type2';

export type TypedSources = {
  type1?: string;
  type2?: string;
};

export class MatchesTypeSpecification extends CompositeSpecification<TypedSources> {
  constructor(
    private readonly field: TypeField,
    private readonly selected: string
  ) {
    super();
  }

  isSatisfiedBy(source: TypedSources): boolean {
    const value = source[this.field];

    if (this.selected === ALL_TYPES) {
      return true;
    }
    if (this.selected === NO_TYPE) {
      return !value;
    }
    return value === this.selected;
  }
}
