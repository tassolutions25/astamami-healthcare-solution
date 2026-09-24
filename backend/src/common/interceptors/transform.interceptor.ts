import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    return next.handle().pipe(
      map((result) => {
        const isObject = typeof result === 'object' && result !== null;
        const message = isObject && 'message' in result ? result.message : 'Operation successful';
        const data = isObject && 'data' in result ? result.data : result;

        return {
          success: true,
          statusCode: response.statusCode,
          message,
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
