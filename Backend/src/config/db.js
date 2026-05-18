const { default: mongoose } = require("mongoose");

const connectDB=async (req, res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('database is connected')
    } catch (error) {
        console.log('error in database->', error)
    }
}

module.exports=connectDB;