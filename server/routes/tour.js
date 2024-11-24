const router = require('express').Router()
const {createTour, getTours, getRecentTours, searchToursByName, getTourById, getToursByCategoryId, getToursByUserId, filterTours, updateTour, deleteTour} = require('../controllers/tour')

router.post('/create', createTour)

router.get('/all', getTours)

router.get('/recents', getRecentTours)

router.get('/search', searchToursByName)

router.get('/sort', filterTours)

router.get('/details/:id', getTourById)

router.get('/category/:id', getToursByCategoryId)

router.get('/user/:id', getToursByUserId)

router.put('/update/:id', updateTour)

router.delete('/:id', deleteTour)

module.exports = router