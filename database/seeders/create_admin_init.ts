import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import config from '#config/admin'

// add default admin user
export default class extends BaseSeeder {
  async run() {
    let timestamp = '2025-07-15 00:00:00'
    await db.transaction(async (trx) => {
      await trx.table(config.database.menu_table).multiInsert([
        {
          id: 8,
          name: 'demo',
          visible: 1,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 9,
          name: 'test',
          icon: 'fa fa-folder',
          visible: 1,
          parent_id: 8,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          id: 10,
          name: 'user',
          slug: '/admin/user',
          visible: 1,
          parent_id: 9,
          created_at: timestamp,
          updated_at: timestamp,
        },
      ])
      await trx.table(config.database.role_menu_table).multiInsert([
        {
          role_id: 1,
          menu_id: 8,
        },
        {
          role_id: 1,
          menu_id: 9,
        },
        {
          role_id: 1,
          menu_id: 10,
        },
      ])
    })
  }
}
