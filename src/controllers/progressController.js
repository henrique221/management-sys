class ProgressController{
    constructor(
        progressRepository,
        dateService
    ) {
        this.progressRepository = progressRepository;
        this.dateService = dateService
    }
    
    delete(req, res, next) {
        this.progressRepository.delete(req.params.id);
        res.redirect('/home');
    }
    get(req, res, next) {
        this.progressRepository.selectAllBySprintId(req.params.sprintId, (results) => {
            results.map((item) => {
                item.data = this.dateService.simpleFormat(item.data, 'DD/MM/YYYY');
            });
            res.render(
                'progressList.html', {
                    results
                }
            );
        });
    }
}

module.exports = ProgressController;
