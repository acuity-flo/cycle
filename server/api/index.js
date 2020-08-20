const router = require('express').Router()

module.exports = router

router.get('/', (req, res, next) => {
  try {
    const data = [
      {date: new Date(2020, 4, 13),
        typeOfFlow: "heavy"},
      {date: new Date(2020, 5, 12),
        typeOfFlow: "light"}]
    res.json(data)
  } catch (e) {
    next(e)
  }
})
