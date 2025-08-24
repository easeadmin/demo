import { BaseSeeder } from '@adonisjs/lucid/seeders'
import hash from '@adonisjs/core/services/hash'
import app from '@adonisjs/core/services/app'
import config from '#config/admin'

// add default admin user
export default class extends BaseSeeder {
  async run() {
    let timestamp = '2025-07-15 00:00:00'
    let password = await hash.use('scrypt').make('admin')
    const db = await app.container.make('lucid.db')
    if (await db.from(config.database.user_table).where('username', 'admin').first()) {
      return
    }
    await db.transaction(async (trx) => {
      await trx.table(config.database.user_table).insert({
        username: 'admin',
        nickname: 'admin',
        password: password,
        created_at: timestamp,
        updated_at: timestamp,
      })
      await trx.table(config.database.role_table).insert({
        name: 'admin',
        slug: 'administrator',
        created_at: timestamp,
        updated_at: timestamp,
      })
      await trx.table(config.database.user_role_table).insert({
        user_id: 1,
        role_id: 1,
      })
      await trx.table(config.database.menu_table).multiInsert([
        {
          id: 1,
          name: 'main',
          visible: 1,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 2,
          name: 'dashboard',
          slug: '/admin/auth/home',
          icon: 'fa fa-dashboard',
          visible: 1,
          parent_id: 1,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 3,
          name: 'system',
          icon: 'fa fa-folder',
          visible: 1,
          parent_id: 1,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 4,
          name: 'user',
          slug: '/admin/auth/user',
          visible: 1,
          parent_id: 3,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 5,
          name: 'role',
          slug: '/admin/auth/role',
          visible: 1,
          parent_id: 3,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 6,
          name: 'menu',
          slug: '/admin/auth/menu',
          visible: 1,
          parent_id: 3,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 7,
          name: 'permission',
          slug: '/admin/auth/permission',
          visible: 1,
          parent_id: 3,
          created_at: timestamp,
          updated_at: timestamp,
        },
      ])
      await trx.table(config.database.permission_table).multiInsert([
        {
          id: 1,
          name: 'auth_management',
          slug: 'admin.auth',
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 2,
          name: 'index',
          slug: 'admin.auth_home',
          parent_id: 1,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 3,
          name: 'user',
          slug: 'admin.auth_user',
          parent_id: 1,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 4,
          name: 'role',
          slug: 'admin.auth_role',
          parent_id: 1,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 5,
          name: 'menu',
          slug: 'admin.auth_menu',
          parent_id: 1,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 6,
          name: 'permission',
          slug: 'admin.auth_permission',
          parent_id: 1,
          created_at: timestamp,
          updated_at: timestamp,
        },
      ])
      await trx.table(config.database.role_menu_table).multiInsert([
        {
          role_id: 1,
          menu_id: 1,
        },
        {
          role_id: 1,
          menu_id: 2,
        },
        {
          role_id: 1,
          menu_id: 3,
        },
        {
          role_id: 1,
          menu_id: 4,
        },
        {
          role_id: 1,
          menu_id: 5,
        },
        {
          role_id: 1,
          menu_id: 6,
        },
        {
          role_id: 1,
          menu_id: 7,
        },
      ])
      await trx.table(config.database.role_permission_table).insert({
        role_id: 1,
        permission_id: 1,
      })
    })
  }
}
