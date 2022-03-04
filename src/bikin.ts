function test() {
  var x = 2;
  var y = "2";

  // @ts-ignore
  console.log(x == y) //A
  // @ts-ignore
  console.log(x === y) //B
}
