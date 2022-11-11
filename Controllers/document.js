import multer from 'multer';
import path from 'path';
import cors from 'cors';
import fs from 'fs';

import { Document } from '../models/document.js';
import {upload} from '../Middlewear/multerUpload.js'

export const addDocument = async (req, res) => {

    upload(req, res, async function(err) {
  
        if(err) {
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            if (typeof err === 'string' || err instanceof String) {
                return res.json({success: false, message: err, type: "Invalid file type"})
            } else {
                return res.json({success: false, message: err, type: "Multer Error"})
            }
        } else { 
            let link = "";
            let size = " KB";
            let createdDate = new Date();

            let document = req.body;

            if (req.file !== undefined) {
                link = req.file.path;
                size = Math.round((req.file.size /1024 / 1024) * 100) / 100 + " MB";
                // console.log(req.file);
            }

            const newDocument = new Document({
                title : document.title,
                category: document.category,
                size: size,
                owner: document.owner,
                createdDate: createdDate,
                canEdit: document.canEdit,
                lastModifiedBy: document.owner,
                lastModifiedDate: createdDate,
                des: req.body.des,
                note: req.body.note,
                link: link,
            })

            await newDocument.save()
            .then((resp) =>{
                return res.send({success: true, message: "Document added successfully", document: resp});
            })
            .catch((err) => {
                return res.json({success: false, message: "Couldn't upload the document", error: err, type: "other"});
            })
            
            // SUCCESS, image successfully uploaded
        }
    })
}

export const getAllDocuments = async (req, res) => {
    await Document.find().then((documents) => {
        res.json({success: true, files: documents});
    }).catch((err) => {
        console.error(err);
        res.json({success: false, message: err})
    })
}

export const getSelectedDocument = async (req, res) => {
    await Document.findById(req.params.id).then((documents) => {
        res.json({success: true, file: documents});
    }).catch((err) => {
        console.error(err);
        res.json({success: false, message: err})
    })
}

export const deleteDocument = async (req, res) => {
    await Document.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.json({success: true, item: result});
    }).catch((err) => {
        console.error(err);
        res.json({success: false, message: err})
    })
}

export const downloadDocument = async (req, res) => {
    let url = "uploads/" + req.params.url;
    res.download(url);
}

export const updateDocument = async (req, res) => {

    upload(req, res, async function(err) {
  
        if(err) {
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            if (typeof err === 'string' || err instanceof String) {
                return res.json({success: false, message: err, type: "Invalid file type"})
            } else {
                return res.json({success: false, message: err, type: "Multer Error"})
            }
        } else { 
            let link = "";
            let size = " KB";
            let lastModifiedDate = new Date();

            let document = req.body;

            if (req.file !== undefined) {
                link = req.file.path;
                size = Math.round((req.file.size /1024 / 1024) * 100) / 100 + " MB";
                // console.log(req.file);
            }

            const newDocument = {
                title : document.title,
                category: document.category,
                size: size,
                canEdit: document.canEdit,
                lastModifiedBy: document.lastModifiedBy,
                lastModifiedDate: lastModifiedDate,
                des: req.body.des,
                note: req.body.note,
                link: link,
            }

            await Document.findByIdAndUpdate(req.params.id, newDocument)
            .then((resp) =>{
                return res.send({success: true, message: "Document updated successfully", document: resp});
            })
            .catch((err) => {
                return res.json({success: false, message: "Couldn't update the document", error: err, type: "other"});
            })
            
            // SUCCESS, image successfully uploaded
        }
    })
}
