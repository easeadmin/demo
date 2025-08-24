import scheduler from 'adonisjs-scheduler/services/main'

// scheduler.command("inspire").everyFiveSeconds()

scheduler.command('db:wipe').hourly()
scheduler.command('migration:run').hourly()
scheduler.command('db:seed').hourly()
