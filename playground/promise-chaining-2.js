require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('6296d378b52b8e5e62d490e4')
//   .then((tasks) => {
//     console.log(tasks)

//     return Task.countDocuments({ completed: false }).then((counts) => {
//       console.log(counts)
//     })
//   })
//   .catch((e) => {
//     console.log(e)
//   })

const deleteTaskAndCount = async (id, completed) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed })
  return count
}

deleteTaskAndCount('6296ceb16b463352584aa324', false)
  .then((count) => {
    console.log(count)
  })
  .catch((e) => {
    console.log(e)
  })
