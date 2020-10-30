import Blog ,{blogPost} from "../modal/blog";
import express,{Response,Request} from "express"


const router =express();

router.get("/myblogs",(req:Request,res:Response)=>{
    Blog.find().then(data=>{
        res.json({info:data})
    }).catch(err=>{console.log(err,"found in blog search");
    })
});
router.get("/showblog/:id",(req:Request,res:Response)=>{
    
    Blog.findById(req.params.id).then(data=>{
        res.json({showit:data})
    }).catch(err=>{
        console.log(err);
        
    })
});
router.get("/edit",(req:Request,res:Response)=>{
    Blog.find().then(data=>{
        res.json({info:data})
    }).catch(err=>{console.log(err,"found in blog search");
    })
});
router.get("/editIt/:id",(req:Request,res:Response)=>{
    
    console.log(req.params.id);
    
    Blog.findById(req.params.id).then(data=>{
        res.json({showit:data})
    }).catch(err=>{
        console.log(err);
        
    })
});
router.post("/resave/:id",(req:Request,res:Response)=>{
    
    console.log(req.params.id);
    const {title,description,about}=req.body;
    console.log(title);
    
    Blog.findOne({_id:req.params.id}).then((data:any)=>{
        // converted the data to any 
        // if not then shoes error of tile ot des or about not in document
        data.title=title;
        data.description=description;
        data.about=about;
        data.save().then(yo=>{
            res.json({msg:"data resaved"})
        }).catch(err=>{
            console.log(err);
            
        });
        
    
    }).catch(err=>{
        console.log(err);
        
    })
});
router.post("/createBlog",(req:express.Request,res:express.Response)=>{
         const {title,about,description,banner} =req.body;
         const blog=new Blog({
             title,
             description,
             about,
             banner
         });
         blog.save().then(data=>{
             res.json({info:data})
        }).catch(err=>console.log(err))
});

router.delete("/delete/:id",(req:Request,res:Response)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id).then(data=>{
        if(data){
            res.json({msg:"Deleted",info:data});
        }
    }).catch(err=>{
        console.log(err);
        
    })

})

export default router;