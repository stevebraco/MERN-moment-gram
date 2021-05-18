import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/postsRouter.js'
import userRoutes from './routes/usersRouter.js'

dotenv.config();

const app = express();


app.use(express.json({limit: "30mb", extended: true })); // limit to 30 megabytes for images
app.use(express.urlencoded({limit: "30mb", extended: true})); // limit to 30 megabytes for images
app.use(cors());
app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello to memories API')
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser:true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);