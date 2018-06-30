const routes = new Map()

export function route(match, fn) {
  const matcher = async msg => (
    msg.match(new RegExp(`@dingus\s.*{match}`))
  )
  routes.set(matcher, fn)
}

export default function router(ctx) {
  const msg = ctx.request.body.text

  const matches = [...routes].map(([fn, matcher]) => (
    await matcher(msg) && await fn(ctx)
  )
}
