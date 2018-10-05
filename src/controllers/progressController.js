class ProgressController{
    constructor(
        progressRepository
    ) {
        this.progressRepository = progressRepository;
    }
    
    delete(req, res, next) {
        this.progressRepository.delete(req.params.id);
        res.redirect('/home');
    }
    get(req, res, next) {
        this.progressRepository.selectAllBySprintId(req.params.sprintId, function(results) {
            console.log("CALLBACK CONTROLLER#########"+results[0].data);
            const resultsList = []
            for(var item=0; item<=results.length; item++){
                resultsList.push(results[item])
            }
            res.render(
                'progressList.html', {
                    resultsList
                }
            );
        });
    }
}

module.exports = ProgressController
