const gqlServer =require("./index1.js")

const app=gqlServer()


app.listen({port:5000}, ()=>
  console.log(`🚀 Server ready at http://localhost:5000`)
)