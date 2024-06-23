const Router = require('express')
const { getDoctors, addDoctor, deleteDoctor, updateDoctor } = require('../controllers/doctors')
const router = Router();

router.get('/', getDoctors)
router.post('/add', addDoctor)
router.delete('/delete/:id', deleteDoctor)
router.put('/update/:id', updateDoctor);

module.exports = {
    router: router
}