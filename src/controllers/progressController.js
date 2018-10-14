class ProgressController {
    constructor(
        progressRepository,
        dateService,
        sprintRepository
    ) {
        this.progressRepository = progressRepository;
        this.dateService = dateService
        this.sprintRepository = sprintRepository
    }

    delete(req, res, next) {
        this.progressRepository.delete(req.body.idProgress);
        res.redirect(`/progress/list/${req.params.sprintId}`)
    }
    get(req, res, next) {
        this.progressRepository.selectAllBySprintId(req.params.sprintId, (results) => {
            results.map((item) => {
                    console.log(item)
                    item.data = this.dateService.simpleFormat(item.data, 'YYYY-MM-DD');
                    item.formatData = this.dateService.simpleFormat(item.data, 'DD/MM/YYYY - dddd');
            });
            this.sprintRepository.selectSprintFromSprintTable((resultsList) => {
                const modalActionForProgress = "Edit progress"
                console.log(resultsList)
                if(results == '') {
                    res.redirect(`/burndown/${req.params.sprintId}`)
                } else 
                res.render(
                    'progressList.html', {
                        results,
                        modalActionForProgress,
                        resultsList
                    }
                );
            });
        });
    }
}

module.exports = ProgressController;