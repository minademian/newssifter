import { CompositeSpecification } from './specification';
import { TypedSource } from './has-type.specification';

export class IsBiasSpecification extends CompositeSpecification<TypedSource> {
  isSatisfiedBy(source: TypedSource): boolean {
    return source.type1?.trim().toLowerCase() === 'bias';
  }
}
