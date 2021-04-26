'use strict'
import { DynamoDB } from 'aws-sdk'

export class RepositoryDB {
	getClient(): any {
		let options = {};
		if (process.env.IS_OFFLINE) {
			options = {
				region: 'localhost',
				endpoint: 'http://localhost:8000',
			};
		}
		return new DynamoDB.DocumentClient(options)
	}
}