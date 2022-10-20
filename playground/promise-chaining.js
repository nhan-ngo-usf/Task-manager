require('../src/db/mongoose')
const { countDocuments } = require('../src/models/user')
const User = require('../src/models/user')

// User.findByIdAndUpdate('6296cf3e682ead6f11938c62', { age: 15 })
//   .then((user) => {
//     console.log(user)

//     return User.countDocuments({ age: 15 }).then((counts) => {
//       console.log(counts)
//     })
//   })
//   .catch((e) => {
//     console.log(e)
//   })

const updateAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return count
}

updateAndCount('6296cf3e682ead6f11938c62', 12)
  .then((count) => {
    console.log(count)
  })
  .catch((e) => {
    console.log(e)
  })
