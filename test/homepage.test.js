var request = require('supertest')
    , app = require('../app')

describe("homepage", function(){
    it("Homepage test", function(done){
        request(app).get("/")
        .expect(200)
        .expect(/Cars On Sale From Dealer!/, done)
    })
})