function func(props) {
  let { classes: { a, b }, number } = props
  console.log(a, b, number)
}

func({ classes: { a: 'a', b: 'b' }, number: 78 })
