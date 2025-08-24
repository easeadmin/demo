import { defineConfig } from 'easeadmin'

export default defineConfig({
  auth: {
    guard: ['admin'],
    excepts: ['/admin/auth/login'],
    permission: true,
  },
  upload: {
    driver: 'fs',
    maxsize: '2mb',
    extnames: ['jpg', 'png', 'jpeg'],
  },
  database: {
    connection: 'sqlite',
    user_table: 'admin_users',
    role_table: 'admin_role',
    menu_table: 'admin_menus',
    permission_table: 'admin_permissions',
    user_role_table: 'admin_user_roles',
    role_menu_table: 'admin_role_menus',
    role_permission_table: 'admin_role_permissions',
    user_remember_me_table: 'admin_remember_me_tokens',
  },
  client: {
    debug: true,
    theme: 'cxd',
    darkness: true,
    brand: 'EaseAdmin',
    logo: '/ease/images/logo.png',
    url_mode: 'history',
    static_host: '',
    login_side_align: 'center',
    login_side_image: '/ease/images/bg.png',
    login_default_remember: true,
  },
  languages: ['en', 'zh'],
})
