export function decorate(target, property, decorator) {
  Object.defineProperty(target, property,
    decorator(
      target, property, Object.getOwnPropertyDescriptor(target, property)
    )
  )
}
