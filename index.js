require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const axios = require('axios');
// const db = require('./db')
// const Router = require('./routes')
const apiPort = process.env.PORT || 3005

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors())
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.get('/', (req, res) => {
    res.send('Hello World!')
})
	const apiss = axios.create({
            baseURL: 'https://service2hacker.herokuapp.com/',
        })
        const headers={
            'Content-Type': 'application/json'
        }
app.post('/get_date_info',(req,res)=>{
	API_KEY=req.headers.API_KEY
	date=req.data.date
	let ds=JSON.stringify({
		date:req.body.date
	})
	apiss.post(`/get_date_infos`, ds,{
            headers:headers
        }).then(vid=>{
        	console.log("getInfo")

        })
        .catch(err=>{
            console.log("err",err)
        })


})
app.post('/get_state_info',(req,res)=>{
	// API_KEY=req.headers.API_KEY
	// console.log(req.body.state_name)
	let ds=JSON.stringify({
		state_name:req.body.state_name
	})
	state_name=req.body.state_name
        apiss.post(`/get_state_infos`, ds,{
            headers:headers
        }).then(vid=>{
        	// console.log("get_state_info",vid.data,vid.status,vid.err,vid.error)
        	if(vid.status==200){
        		res.status(200).json(
        			vid.data
        		)
        	}
        	else{
        		res.status(vid.status).json({err:vid.data.bad})
        	}
        	// res.st

        })
        .catch(err=>{
            console.log("err",err)
        })

})
app.post('/pinpoint_state',(req,res)=>{
	API_KEY=req.headers.API_KEY
	state_name=req.data.state_name
	date=req.data.date
		let ds=JSON.stringify({
		date:req.body.date,
		state_name:req.body.state_name
	})
        apiss.post(`/pinpoint_state`, ds,{
            headers:headers
        }).then(vid=>{
        	console.log("pinpoint_state")

        })
        .catch(err=>{
            console.log("err",err)
        })

})

// app.use('/api', Router)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))