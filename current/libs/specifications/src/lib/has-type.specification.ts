import { CompositeSpecification } from './specification';

export type TypedSource = {
  type1?: string;
};

export class HasTypeSpecification extends CompositeSpecification<TypedSource> {
  isSatisfiedBy(source: TypedSource): boolean {
    return typeof source.type1 === 'string' && source.type1.trim() !== '';
  }
}
