const express = require('express');
const router = express.Router();

const authMidware=require('../middleware/auth')

const supabase=require('../config/supabase.config')

const { upload } = require('../config/multer.config');
const { v4: uuidv4 } = require('uuid'); 
const fileModel=require('../models/files.models')


router.get('/home',authMidware, async(req, res) => {
    const userFiles=await fileModel.find({
        user:req.user.userId
    })

    console.log(userFiles)

    res.render('home',{
        files:userFiles
    })
});

router.post('/upload', authMidware, upload.single('file'), async (req, res) => {
    // Log the uploaded file details
    if (req.file) {
        console.log('File uploaded');
        console.log('Original Name:', req.file.originalname);
        console.log('File Name:', req.file.filename);
        console.log('MIME Type:', req.file.mimetype);
        console.log('File Size:', req.file.size);
    } else {
        console.log('No file uploaded.');
    }

    // If no file is uploaded, return an error response
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Sanitize the file name to prevent issues with special characters
    const originalName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const storagePath = `uploads/${uuidv4()}_${originalName}`;

    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage
        .from('drive')  // Your Supabase bucket name
        .upload(storagePath, req.file.buffer, {
            contentType: req.file.mimetype,
        });

    // Check for errors during the upload
    if (error) {
        console.error('Error uploading file to Supabase:', error);
        return res.status(500).send('Error uploading file to Supabase');
    }

    // Create a record in the database with the file details
    const newFile = await fileModel.create({
        path: storagePath,  // Path in Supabase
        originalname: req.file.originalname,
        user: req.user.userId
    });

    // Log and send a success response
    console.log('File uploaded successfully:', data);
    res.json(newFile);  // Return the new file record as JSON
});


router.get('/download/*',authMidware, async (req,res)=>{

    const loggedInUserId=req.user.userId;
    const path = req.params[0]; 
    
    const file=await fileModel.findOne({
        user: loggedInUserId,
        path: path
    })

    if(!file) {
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
    console.log("📦 Requested download for:", path);
    console.log("🧾 DB file path:", file.path);

    const { data, error } = await supabase.storage
      .from('drive')
      .createSignedUrl(file.path, 60 * 60);
      
      console.log("Requested download path:", path);
      console.log("Database path:", file.path);
      
      if (error) {
        console.error("❌ Supabase error:", error);
        return res.status(500).send("Failed to generate signed URL.");
    }
    
    res.redirect(data.signedUrl)

})

module.exports = router;
