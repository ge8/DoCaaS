'use strict';

const get = require('../../get.js');
const create = require('../../create.js');
const cut = require('../../cut.js');
const shuffle = require('../../shuffle.js');

const chai = require('chai');
const expect = chai.expect;
var context;
const event = {
    headers: {
        Authorization: "eyJraWQiOiJnUGNpRXhqU1BYS2ZKNTlaZzU0YVpKK1IyS1NsZUg5TXg2Zk1rUnFTUE9rPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiYjUxM2I4Yi0zNmYwLTQ2ZjEtYmEzNy0zMTcwZTU2YmM5NmUiLCJjb2duaXRvOmdyb3VwcyI6WyJHT0xEIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjYwNDY3NDc1Nzk4MDpyb2xlXC9Eb2NhYXNfR29sZF9NZW1iZXIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTJfTkEyaXpaNmU0IiwiY29nbml0bzp1c2VybmFtZSI6ImFkYW0iLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo2MDQ2NzQ3NTc5ODA6cm9sZVwvRG9jYWFzX0dvbGRfTWVtYmVyIl0sImF1ZCI6IjJwdHMwM280OWh1Nzg3aHN2cDI2YXYxNHRiIiwiY3VzdG9tOnBsYW4iOiJnb2xkIiwiZXZlbnRfaWQiOiIyOWNmZWI5OS1iYWUxLTExZTgtYWU1Yi00N2RlMjM5ZThkNGMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNzIzMzY4NiwiY3VzdG9tOnRlbmFudCI6InRlc3QiLCJleHAiOjE1MzczNDA2MTEsImlhdCI6MTUzNzMzNzAxMSwiZW1haWwiOiJhZHN0cmlja0BhbWF6b24uY29tIn0.RVfW05t8KspgFSBwkbZjRylgTIkn0I1BoeyOPZ4XrI3mzlR1JoY1eTDLUfNdgCKeAAzVnVvulU5rrKmrCCQN1X0h_BtWqc0ri4KzvcpTunCAMeIrfba_aU3UT_NQ8Hapv6ILZO74X2kBs46cjhElAiII5fVZTAWgY5B0iRWvSWd8ON24dFSCcez9JP_PURkvX2WtFBed82B8xHBPDLwG3e3on170hlSZsuBWngTmg9jlX0MwoJkpuGluFJhm3kKXVWtOIMtWcZzCw91Dvze4kfixpMkERrQ9EIxb-J0PyrLybBa3XO_dKc9mHZXrjDn0sQKuMkIPzQ64Xu0bAAGuXQ"
    }, 
    queryStringParameters: {
        deck: "unit-test"
    },
    requestContext: {
        authorizer: {
            claims: {
                "sub": "bb513b8b-36f0-46f1-ba37-3170e56bc96e",
                "cognito:groups": [
                  "GOLD"
                ],
                "email_verified": true,
                "cognito:preferred_role": "arn:aws:iam::604674757980:role/Docaas_Gold_Member",
                "iss": "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_NA2izZ6e4",
                "cognito:username": "adam",
                "cognito:roles": [
                  "arn:aws:iam::604674757980:role/Docaas_Gold_Member"
                ],
                "aud": "2pts03o49hu787hsvp26av14tb",
                "custom:plan": "gold",
                "event_id": "29cfeb99-bae1-11e8-ae5b-47de239e8d4c",
                "token_use": "id",
                "auth_time": 1537233686,
                "custom:tenant": "test",
                "exp": 9537237286,
                "iat": 1537233686,
                "email": "adstrick@amazon.com"
              }
        }
    }
}


describe('Testing CREATE Deck Service', function () {
    it('verifies successful response', async () => {
        const result = await create.create_deck_handler(event, context, (err, result) => {
            console.log("Result:", result);
            expect(result.statusCode).to.equal(200);
            expect(result.body).to.be.an('string');
        });
    });
});

describe('Testing GET Deck Service', function () {
    it('verifies successful response', async () => {
        const result = await get.get_deck_handler(event, context, (err, result) => {
            console.log("Result:", result);
            expect(result.statusCode).to.equal(200);
            expect(result.body).to.be.an('string');
        });
    });
});

describe('Testing SHUFFLE Deck Service', function () {
    it('verifies successful response', async () => {
        const result = await shuffle.shuffle_deck_handler(event, context, (err, result) => {
            console.log("Result:", result);
            expect(result.statusCode).to.equal(200);
            expect(result.body).to.be.an('string');
        });
    });
});

describe('Testing CUT Deck Service', function () {
    it('verifies successful response', async () => {
        const result = await cut.cut_deck_handler(event, context, (err, result) => {
            console.log("Result:", result);
            expect(result.statusCode).to.equal(200);
            expect(result.body).to.be.an('string');
        });
    });
});
