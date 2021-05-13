import mongoose from  "mongoose"

const mongooseConnectionOptions = {
    useNewUrlParser : true,
    useCreateIndex:true,
    useUnifiedTopology :true,
    useFindAndModify :true
}

export default async () =>{
    await mongoose.connect( process.env.MONGODB_URI || "" ,
    mongooseConnectionOptions,()=>{
        console.log(`> Mongodb locally running at port 27017`);
        
    })
}