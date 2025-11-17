import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';

type Constructor<T> = new () => T;

/**
 * Automatically generates a Swagger response for the given DTO.
 * Supports both single object and array responses.
 * @param dto - The DTO class that represents the response
 * @param isArray - Whether the response is an array
 */
export function ApiAutoResponse<T extends object>(
  dto: Constructor<T>,
  isArray = false,
) {
  return applyDecorators(
    ApiExtraModels(dto),
    ApiOkResponse({
      schema: isArray
        ? {
            type: 'array',
            items: { $ref: getSchemaPath(dto) },
          }
        : { $ref: getSchemaPath(dto) },
    }),
  );
}
