'use strict'
import { DynamoDB } from 'aws-sdk';

export class DynamoRepository {
  static async callSingleOperation(action, params, config = {}): Promise<any> {
    let options = {};
    if (process.env.IS_OFFLINE) {
      options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      };
    }
    const dynamoDb = new DynamoDB.DocumentClient(options);
    try {
      const result = await dynamoDb[action](params).promise();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async queryDynamo(tableName, data): Promise<any> {
    const objKeys = Object.keys(data);
    const objeKeysConditionExp = objKeys.map((x) => `${x} = :${x}`);
    const keyConditionExpression = objeKeysConditionExp.join(' and ');
    const expressionAttributeValues = {};
    objKeys.forEach((el) => {
      expressionAttributeValues[`:${el}`] = data[el];
    });

    const params = {
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    };
    const result = await this.callSingleOperation('query', params);
    return result;
  }

  static async updateDynamo(params, data, reservedWords = []) {
    let updExp;
    const expAtrVal = {};
    const expAtrNames = {};
    Object.keys(data).forEach((key, index) => {
      if (data[key]) {
        const encontrado = reservedWords.filter((x) => x === key);
        let keyUpdExp = key;
        if (encontrado.length > 0) {
          expAtrNames[`#${key}`] = key;
          keyUpdExp = `#${key}`;
        }
        expAtrVal[`:${key}`] = data[key];
        if (index === 0) {
          updExp = `set ${keyUpdExp} = :${key}`;
        } else {
          updExp = `${updExp}, ${keyUpdExp} = :${key} `;
        }
      }
    });

    const paramsDynamo = Object.assign({}, params, {
      UpdateExpression: updExp,
      ExpressionAttributeValues: expAtrVal,
    });
    if (Object.keys(expAtrNames).length > 0) {
      params.ExpressionAttributeNames = expAtrNames;
    }

    const result = await this.callSingleOperation('update', paramsDynamo);
    return result;
  }
}
