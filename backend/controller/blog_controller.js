export const createbolg=async(req,res)=>{
  try{
    if(!req.files||Object.keys(req.files).length===0){
      return res.status(400).json({messege:"Blog image is required"});
    }
    const {blogimage}=req.files;

    const allowedformat=["image/jpeg","image/png","image/webp"];

    if(!allowedformat.includes(blogimage.mimetype)){
      return res.status(400).json({messege:"Invalid photo format. only jpg and png are allowed"})
    };

    const {title,category,about}=req.body;
    if(!title||!category||!about){
      return res.status(400).json({messege:"Please fill require fields"})
     }
     
  }
}