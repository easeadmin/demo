import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminProtectingMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const url = ctx.request.url()
    const method = ctx.request.method().toLowerCase()
    const prohibited = ['delete', 'update', 'put']
    if (
      url.startsWith('/admin/auth') &&
      prohibited.includes(method) &&
      !url.startsWith('/admin/auth/login')
    ) {
      return ctx.response.status(403).json({
        code: 403,
        msg: '不能删除或修改管理员数据',
      })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    return await next()
  }
}
