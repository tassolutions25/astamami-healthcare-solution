import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    let message = 'Internal server error';
    let details: unknown = null;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const resp = exceptionResponse as Record<string, any>;
      message = resp.message || message;
      details = resp.error || null;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(
      `[${request.method}] ${request.url} >> Status: ${status}, Message: ${JSON.stringify(message)}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      method: request.method,
      error: message,
      details,
      timestamp: new Date().toISOString(),
    });
  }
}
