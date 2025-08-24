import { Start } from 'easeadmin'
import router from '@adonisjs/core/services/router'
import AdminController from './controllers/admin_controller.js'
import UserController from './controllers/user_controller.js'

/**
 * -----------------------------------
 * Define your app name
 * -----------------------------------
 * It is related to your program file. Please do not change it.
 * -------------------------------------------------------------
 */
const start = Start.make('admin')

/**
 * -----------------------------------
 * Here is the override system route
 * -----------------------------------
 * this is an example of a dashboard.
 * If you don't have any custom requirements, you can delete it.
 * -------------------------------------------------------------
 */
start.override({
  auth_home: () => router.resource('/auth/home', AdminController).as('auth_home'),
})

/**
 * ------------------------
 * Define your routes here
 * ------------------------
 * The routing group uses your app name as the routing prefix.
 * -------------------------------------------------------------
 */
start.group(() => {
  router.on('/').redirect('/admin/auth/home').as('redirect_home')
  router.resource('user', UserController).as('user')
})
