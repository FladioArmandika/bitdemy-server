import app from "../../config/app"
import * as request from "supertest"
import { Response, Request } from "express"
import path = require("path")

require('dotenv').config({ path: path.resolve(__dirname, './.env')});

jest.setTimeout(10000);

describe('test course', () => {
    test('should response the GET method', async (done: any) => {
        return request(app)
            .get('/course')
            .query({courseId: '6072e7ec0a449339b8687aa7'})
            .expect(200)
    })
})