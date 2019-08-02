const express = require('express');
const router = express.Router();

router.post('', ()=>{
    const responseBody = {
        version: "2.0",
        template: {
        outputs: [
            {
            simpleText: {
                text: "hello I'm Ryan"
            }
            }
        ]
        }
    }

    res.status(200).send(responseBody);
});


router.get('./search:name', ()=>{
    const responseBody = {
        version: "2.0",
        template: {
        outputs: [
            {
            simpleText: {
                text: "hello I'm Ryan"
            }
            }
        ]
        }
    }

    res.status(200).send(responseBody);
});
