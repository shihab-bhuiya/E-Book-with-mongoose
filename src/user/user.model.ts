import mongoose from "mongoose";
import type { User } from "./user.types.js";


const userSchema = new mongoose.Schema<User>({
    name:{
        type: String,
        required : true,
    },

    email:{
        type: String,

        unique: true,
        required: true
    },


},
 {timestamps:true}

)

export default mongoose.model<User>("User",userSchema);