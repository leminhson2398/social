from promise import Promise

promise = Promise(
  lambda resolve, reject: resolve('hihihihi')
)

promise.then(lambda x: print(x))
