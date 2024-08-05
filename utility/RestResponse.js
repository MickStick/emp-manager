export  class RestResponse {
    status;
    state;
    message;
    body;
    err;

    constructor(){
        this.status = null;
        this.state = null;
        this.message = null;
        this.body = null;
        this.err = null;
    }
    
}   