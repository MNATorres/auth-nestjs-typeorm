import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// con este decorador, vamos a poder llevar el user a las tasks, etc

export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
