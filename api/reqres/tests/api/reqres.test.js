import fetch from "node-fetch"; // api call
import { expect } from "chai"; // validator
import Ajv from "ajv"; // schema.
import {schema_readUser, schema_authLogin} from "../schema/reqresSchema.js";
import 'dotenv/config';

describe("Reqres API - User Management", function() {

    const baseURL = "https://reqres.in";
    const APIKey = process.env.API_KEY;

    const Endpoint = {
        users: '/api/users',
        login: '/api/login'

    };

    describe(`GET ${Endpoint.users}`, function (){
    
        let response;
        let responseBody;

        before(async function(){
            
            response = await fetch(`${baseURL}${Endpoint.users}?page=2`, {
                method: "GET",
                    headers: {"x-api-key":`${APIKey}`}
                });
            responseBody = await response.json();
            
        });

        it("Should return 200 OK", function() {
            // const response = await fetch(`${baseURL}${Endpoint.users}?page=2`, {
            // method: "GET",
            //     headers: {"x-api-key":`${APIKey}`}
            // });

            expect(response.status, "Error status code").to.equal(200);

        });

        it("Should return valid User Data", async function() {
            expect(responseBody.page).to.equal(2);
            expect(responseBody.per_page).to.equal(6);
            expect(responseBody.total).to.equal(12);
            expect(responseBody.total_pages).to.equal(2);
        });

        it("Should return valid JSON Schema", async function() {
            // validasi json schema
            const ajv = new Ajv();
            const check = ajv.compile(schema_readUser);

            expect(check(responseBody), 'error json schema validation').to.be.true;
        });

    });

    describe(`POST ${Endpoint.login}`, function(){

        let response;
        let responseBody;

        before(async function(){
            response = await fetch(`${baseURL}${Endpoint.login}`, {
                method:"POST",
                headers:{
                    "x-api-key":`${APIKey}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    "email": "eve.holt@reqres.in", 
                    "password": "cityslicka"
                })
            });
            responseBody = await response.json();
        })

        it("Should return 200 OK and logged in", function(){
            
            expect(response.status,"login unsuccesful").to.equal(200);


        });

        it("Should return valid Data", async function() {
            expect(responseBody._meta.powered_by).to.equal("ReqRes");
        });

        it("Should return valid JSON Schema", function(){
            
            // validasi json schema
            const ajv = new Ajv();
            const check = ajv.compile(schema_authLogin);

            expect(check(responseBody), 'error json schema validation').to.be.true;
        })
    });
    
});