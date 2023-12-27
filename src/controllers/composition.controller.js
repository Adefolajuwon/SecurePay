export class SuccessResponse {
	constructor(res, message = 'Success.', data = '') {
	  this.res = res;
	  this.message = message;
	  this.data = data;
	}
  
	send() {
	  return this.res.status(200).json({
		success: true,
		message: this.message,
		data: this.data,
	  });
	}
  }