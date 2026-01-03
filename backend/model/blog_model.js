import mongoose from "mongoose";

const bolgschema=new mongoose.Schema({
  title:{
    type:String,
    require:true,
  },
  blogimage:{
    public_id:{
      type:String,
      require:true,
    },
    url:{
      type:String,
      require:true
    }
  },
  category:{
    type:String,
    require:true
  },
  about:{
    type:String,
    require:true,
    minlength:(200,"Should contain 200 charcter")
  },
  adminName:{
    type:String,
    require:true
  },
  adminphoto:{
    type:String,
    require:true
  },
  createdby:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
  }
})

export const blog=mongoose.model("blog",bolgschema);