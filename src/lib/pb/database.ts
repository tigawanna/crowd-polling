
/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
export interface BaseCollectionResponse {
	/**
	 * 15 characters string to store as record ID.
	 */
	id: string;
	/**
	 * Date string representation for the creation date.
	 */
	created: string;
	/**
	 * Date string representation for the creation date.
	 */
	updated: string;
	/**
	 * The collection id.
	 */
	collectionId: string;
	/**
	 * The collection name.
	 */
	collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface BaseCollectionCreate {
	/**
	 * 15 characters string to store as record ID.
	 * If not set, it will be auto generated.
	 */
	id?: string;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface BaseCollectionUpdate {}

// https://pocketbase.io/docs/collections/#auth-collection
export interface AuthCollectionResponse extends BaseCollectionResponse {
	/**
	 * The username of the auth record.
	 */
	username: string;
	/**
	 * Auth record email address.
	 */
	email: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility: boolean;
	/**
	 * Indicates whether the auth record is verified or not.
	 */
	verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface AuthCollectionCreate extends BaseCollectionCreate {
	/**
	 * The username of the auth record.
	 * If not set, it will be auto generated.
	 */
	username?: string;
	/**
	 * Auth record email address.
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Auth record password.
	 */
	password: string;
	/**
	 * Auth record password confirmation.
	 */
	passwordConfirm: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface AuthCollectionUpdate {
	/**
	 * The username of the auth record.
	 */
	username?: string;
	/**
	 * The auth record email address.
	 * This field can be updated only by admins or auth records with "Manage" access.
	 * Regular accounts can update their email by calling "Request email change".
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Old auth record password.
	 * This field is required only when changing the record password. Admins and auth records with "Manage" access can skip this field.
	 */
	oldPassword?: string;
	/**
	 * New auth record password.
	 */
	password?: string;
	/**
	 * New auth record password confirmation.
	 */
	passwordConfirm?: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/collections/#view-collection
export interface ViewCollectionRecord {
	id: string;
}

// utilities

type MaybeArray<T> = T | T[];
// ==== start of rendercon_crowd_polls block =====


export interface RenderconCrowdPollsResponse extends BaseCollectionResponse {
	collectionName: 'rendercon_crowd_polls';
	value: string;
}

export interface RenderconCrowdPollsCreate extends BaseCollectionCreate {
	value?: string;
}

export interface RenderconCrowdPollsUpdate extends BaseCollectionUpdate {
	value?: string;
}

export interface RenderconCrowdPollsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'rendercon_crowd_polls';
	response: RenderconCrowdPollsResponse;
	create: RenderconCrowdPollsCreate;
	update: RenderconCrowdPollsUpdate;
	relations: Record<string, never>;
}

// ==== end of rendercon_crowd_polls block =====

// ==== start of rendercon_users block =====


export interface RenderconUsersResponse extends AuthCollectionResponse {
	collectionName: 'rendercon_users';
	isAdmin: boolean;
}

export interface RenderconUsersCreate extends AuthCollectionCreate {
	isAdmin?: boolean;
}

export interface RenderconUsersUpdate extends AuthCollectionUpdate {
	isAdmin?: boolean;
}

export interface RenderconUsersCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'rendercon_users';
	response: RenderconUsersResponse;
	create: RenderconUsersCreate;
	update: RenderconUsersUpdate;
	relations: Record<string, never>;
}

// ==== end of rendercon_users block =====

// ==== start of rendercon_crowd_polls_count block =====


export interface RenderconCrowdPollsCountResponse extends BaseCollectionResponse {
	collectionName: 'rendercon_crowd_polls_count';
	value: string;
	count: number;
}

export interface RenderconCrowdPollsCountCollection {
	type: 'view';
	collectionId: string;
	collectionName: 'rendercon_crowd_polls_count';
	response: RenderconCrowdPollsCountResponse;
	relations: Record<string, never>;
}

// ==== end of rendercon_crowd_polls_count block =====

export type Schema = {
	rendercon_crowd_polls: RenderconCrowdPollsCollection;
	rendercon_users: RenderconUsersCollection;
	rendercon_crowd_polls_count: RenderconCrowdPollsCountCollection;
};
