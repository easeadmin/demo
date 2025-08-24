import amis from 'easeadmin/builder/amis'
import ResourceController from 'easeadmin/controllers/resource_controller'
import UserRepository from '../repositories/user_repository.js'

export default class UserController extends ResourceController {
  protected repository = new UserRepository()

  protected fields() {
    return [
      amis('column_item').name('id').label(this.ctx.admin.t('id')),
      amis('column_item').name('fullName').label(this.ctx.admin.t('full_name')),
      amis('column_item').name('email').label(this.ctx.admin.t('email')),
      amis('column_item').name('createdAt').type('datetime').label(this.ctx.admin.t('created_at')),
      amis('column_item').name('updatedAt').type('datetime').label(this.ctx.admin.t('updated_at')),
    ]
  }

  protected forms(isEdit: boolean) {
    return [
      amis('input_text')
        .name('id')
        .label(this.ctx.admin.t('id'))
        .disabled(isEdit)
        .permission(isEdit),
      amis('input_text').name('fullName').label(this.ctx.admin.t('full_name')),
      amis('input_text').name('email').label(this.ctx.admin.t('email')),
      amis('input_text').name('password').label(this.ctx.admin.t('password'))
    ]
  }
}
