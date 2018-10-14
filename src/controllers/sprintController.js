class SprintController {
    constructor (sprintRepository) {
        this.sprintRepository = sprintRepository
    }
    
    updateSprintDayAmount(req, res) {
        this.sprintRepository.updateSprintDayAmount(req.params.id, req.body.dayAmount)
        res.redirect(`/burndown/${req.params.id}`)
    }
}

module.exports = SprintController;
