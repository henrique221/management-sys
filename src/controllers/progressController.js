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
}

module.exports = ProgressController
