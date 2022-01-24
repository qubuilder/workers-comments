/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from '../models/Comment';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class CommentService {

    /**
     * Get Comments
     * Get all Comments of an article
     * @param article
     * @param limit amount of Comments to be delivered at once
     * @param cursor cursor from previous request to deliver next batch
     * @returns any OK
     * @throws ApiError
     */
    public static getCommentsArticle(
        article: string,
        limit?: number,
        cursor?: string,
    ): CancelablePromise<{
        comments: Array<Comment>;
        cursor: string | null;
    }> {
        return __request({
            method: 'GET',
            path: `/comments/${article}`,
            query: {
                'limit': limit,
                'cursor': cursor,
            },
            errors: {
                500: `Error Response`,
            },
        });
    }

    /**
     * Create a Comment
     * Create a comment for an article
     * @param article
     * @param requestBody
     * @returns Comment OK
     * @throws ApiError
     */
    public static postCommentsArticle(
        article: string,
        requestBody?: (Comment & {
            /**
             * Email of the author
             */
            email: string;
        }),
    ): CancelablePromise<Comment> {
        return __request({
            method: 'POST',
            path: `/comments/${article}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Error Response`,
                500: `Error Response`,
            },
        });
    }

}
