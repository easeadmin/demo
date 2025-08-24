import { BaseSchema } from '@adonisjs/lucid/schema'
import config from '#config/admin'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable(config.database.user_table, (table) => {
      table.increments('id').notNullable()
      table.string('username').unique()
      table.string('nickname', 254).notNullable()
      table.string('password').notNullable()
      table.string('avatar').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable(config.database.role_table, (table) => {
      table.increments()
      table.string('name', 50)
      table.string('slug', 50).unique()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable(config.database.menu_table, (table) => {
      table.increments()
      table.string('name', 50)
      table.string('slug', 50).nullable().unique()
      table.string('icon', 50).nullable()
      table.integer('order').unsigned().defaultTo(0)
      table.integer('visible').unsigned().defaultTo(0)
      table.integer('parent_id').unsigned().nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable(config.database.permission_table, (table) => {
      table.increments()
      table.string('name', 50)
      table.string('slug', 50).unique()
      table.integer('order').unsigned().defaultTo(0)
      table.integer('parent_id').unsigned().nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable(config.database.user_role_table, (table) => {
      table.increments()
      table.integer('role_id').unsigned()
      table.integer('user_id').unsigned()
      table.unique(['role_id', 'user_id'])
    })

    this.schema.createTable(config.database.role_menu_table, (table) => {
      table.increments()
      table.integer('role_id').unsigned()
      table.integer('menu_id').unsigned()
      table.unique(['role_id', 'menu_id'])
    })

    this.schema.createTable(config.database.role_permission_table, (table) => {
      table.increments()
      table.integer('role_id').unsigned()
      table.integer('permission_id').unsigned()
      table.unique(['role_id', 'permission_id'])
    })

    this.schema.createTable(config.database.user_remember_me_table, (table) => {
      table.increments()
      table
        .integer('tokenable_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable(config.database.user_table)
        .onDelete('CASCADE')
      table.string('hash').notNullable().unique()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      table.timestamp('expires_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(config.database.user_table)
    this.schema.dropTable(config.database.role_table)
    this.schema.dropTable(config.database.menu_table)
    this.schema.dropTable(config.database.permission_table)
    this.schema.dropTable(config.database.user_role_table)
    this.schema.dropTable(config.database.role_menu_table)
    this.schema.dropTable(config.database.role_permission_table)
    this.schema.dropTable(config.database.user_remember_me_table)
  }
}
