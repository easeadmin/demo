import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, manyToMany, column } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import config from '#config/admin'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

/**
 * Admin User model
 */
export class User extends compose(BaseModel, AuthFinder) {
  static table = config.database.user_table
  static connection = config.database.connection
  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User, {
    table: config.database.user_remember_me_table,
  })

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare nickname: string

  @column({ serializeAs: null })
  declare password: string

  @column({
    serialize: (value: string | null) => {
      return value ?? '/ease/images/avatar.png'
    },
  })
  declare avatar: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @manyToMany(() => Role, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: config.database.user_role_table,
  })
  declare roles: ManyToMany<typeof Role>
}

/**
 * Admin Role model
 */
export class Role extends BaseModel {
  static table = config.database.role_table
  static connection = config.database.connection

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @manyToMany(() => Permission, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'permission_id',
    pivotTable: config.database.role_permission_table,
  })
  declare permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Menu, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'menu_id',
    pivotTable: config.database.role_menu_table,
  })
  declare menus: ManyToMany<typeof Menu>
}

/**
 * Admin Menu model
 */
export class Menu extends BaseModel {
  static table = config.database.menu_table
  static connection = config.database.connection

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare icon: string

  @column()
  declare order: number

  @column()
  declare visible: number

  @column()
  declare parentId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

/**
 * Admin Permission model
 */
export class Permission extends BaseModel {
  static table = config.database.permission_table
  static connection = config.database.connection

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare order: number

  @column()
  declare parentId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

export default User
