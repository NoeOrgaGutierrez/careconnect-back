import { Association } from '../../entities/association.entity'

export interface AssociationWithCount extends Association {
  memberCount: number
  blogCount: number
}
