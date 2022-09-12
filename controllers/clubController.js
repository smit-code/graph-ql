const Club = require('../models/club')

exports.clubs = async () => {
  return Club.find().lean()
}

exports.createClub = async ({ clubInput }, req) => {
  const club = {
    activity_name: clubInput.activity_name,
    max_capacity: clubInput.max_capacity,
    visibility: clubInput.visibility
  }
  const newClub = await Club.create(club)
  return newClub._doc
}
