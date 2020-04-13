const Sequelize = require('sequelize')
const db = new Sequelize("eat-to-fit", "postgres", "discodancer", {
    host: 'localhost',
    dialect: 'postgres'
},{
    logging:false
});

try {
  db.authenticate()
  console.log("database connected")

}
catch{
  console.log("error connectiong to db")
}
db.sync(
  // { force: true }
)

module.exports = db