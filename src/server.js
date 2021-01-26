const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Post = mongoose.model('Post',{
	title: {type: String,required: true},
	content: String,
	createdAt: {
		type: Date,default: () => new Date()
	}
})
app.put('/post',(req,res) => {
	const post = new Post(req.body)
	post.save()
	res.sendStatus(201)
})
app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.get('/post',(req, res) => {
	Post.find()
	.then(posts=>res.send(posts))
	.catch(()=>res.sendStatus(500))
})

app.get('/post/:id', (req, res) => {
	Post.findById(req.params.id)
	.then(post=>res.json(post))
	.catch(()=>res.sendStatus(500))
})
app.delete('/post/:id', (req, res)=>{
	Post.findByIdAndDelete(req.params.id)
	.then(deletedPost=>{
		if (!deletedPost){
			res.sendStatus(404)
			return;
		}
		res.sendStatus(204)
		console.log(report)
	})
	.catch(()=>res.sendStatus(500))
})

app.post('/post/:id', (req, res)=>{
	Post.findByIdAndUpdate(req.params.id,req.body)
.then(updatedPost => {
	if(!updatedPost){
		res.sendStatus(404)
		return
	}
	res.sendStatus(200)
	
})
.catch((err)=>{
	res.status(400).send(err)
})
})

function listen(){
	app.listen(port, () => console.log(`Server listening on port ${port}!`));
}

function connect(){
	mongoose.connect('mongodb://localhost/pinterest', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	const db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () =>{
		listen();
	});
}

connect();

