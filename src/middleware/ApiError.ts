class ApiError extends Error {
    code: number;
    message: any;
    constructor(code: number, message: any) {
      super(message);
      this.message = message;
      this.code = code;
    }
  
    static badRequest(msg: any) {
      return new ApiError(400, msg);
    }
  
    static unauthorized(msg: any) {
      return new ApiError(401, msg);
    }
  
    static notFound(msg: any) {
      return new ApiError(404, msg);
    }
  
    static internal(msg: any) {
      return new ApiError(500, msg);
    }
  }
  
  export default ApiError;
  