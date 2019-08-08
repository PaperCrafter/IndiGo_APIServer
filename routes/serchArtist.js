const express = require('express');
const router = express.Router();

router.post('', (req,res)=>{
    const responseBody = {
        version: "2.0",
        template: {
        outputs: [
            {
            simpleText: {
                text: "hi kakao"
            }
            }
        ]
        }
    }

    res.status(200).send(responseBody);
});


router.get('/search:name', (req,res)=>{
    const responseBody = {
        version: "2.0",
        template: {
        outputs: [
            {
            simpleText: {
                text: "hello kakao"
            }
            }
        ]
        }
    }

    res.status(200).send(responseBody);
});

router.get('/', (req, res)=>{
    const responseBody = {
        version: "2.0",
        template: {
        outputs: [
            {
            simpleText: {
                text: "hello kakao"
            }
            }
        ]
        }
    }

    res.status(200).send(responseBody);
});


module.exports = router;
