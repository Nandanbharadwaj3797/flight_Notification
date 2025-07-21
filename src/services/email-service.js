const {TicketRepository}=require("../repositories");
const{MAILER}=require("../config");

const ticketRepo= new TicketRepository();

async function sendEmail(mailfrom, mailto, subject, text) {
    try{
        const response = await MAILER.sendMail({
            from: mailfrom,
            to: mailto,
            subject: subject,
            text: text
        });
        return response;
    }catch(error) {
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
    }
}

async function createTicket(data) {
    try {
        const response = await ticketRepo.create(data);
        return response;
    } catch (error) {
        console.error("Error creating ticket:", error);
        throw new Error("Ticket creation failed");
    }
}

async function getpendingEmails(){
    try{
        const response = await ticketRepo.getPendingTickets();
        return response;
    }catch(error){
        console.error("Error fetching pending tickets:", error);
        throw new Error("Fetching pending tickets failed");
    }
}

module.exports={
    sendEmail,
    createTicket,
    getpendingEmails
}