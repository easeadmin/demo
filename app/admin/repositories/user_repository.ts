import ResourceRepository from 'easeadmin/repositories/resource_repository'
import User from '#models/user'

export default class UserRepository extends ResourceRepository {
  protected model = User
}
