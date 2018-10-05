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
    selectAll(req, res, next) {
        const callback = callback;
        this.progressRepository.selectAll(req.params.sprintId, function(err, callback){
            if (err) {
                next(err)
            } else {
                const callback = callback
            }
            res.render('progressList.html', {
                    callback
                }
            )
        });
    }
}

module.exports = ProgressController
