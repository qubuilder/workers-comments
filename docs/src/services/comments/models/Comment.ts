/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Comment object delivered by api.
 */
export type Comment = {
    /**
     * Id of Comment
     */
    readonly id?: string;
    /**
     * Name of the comment author
     */
    name: string;
    /**
     * Comment Content
     */
    content: string;
    /**
     * URL for Profile Picture
     */
    readonly profile?: string;
    /**
     * Timestamp comment was created at
     */
    readonly time?: string;
}
