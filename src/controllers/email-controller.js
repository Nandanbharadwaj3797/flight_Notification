const {StatusCodes}=require('http-status-codes');
const{ErrorResponse, SuccessResponse}=require('../utils/common');
const{AppError}=require('../utils/errors');
const{EmailService}=require('../services');

async function create(req, res) {
   try{
        const response=await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail,
            status: req.body.status || 'PENDING'
        });
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
   }catch(error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        new ErrorResponse(
            error.message,
            error.statusCode,
            error.explanation
        )
    );
   }
}

module.exports = {
    create
}