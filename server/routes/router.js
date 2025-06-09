import express from 'express';
import Data from '../models/dataSchema.js';

const router = express.Router();

router.post("/add-data", async (req, res) => {
    const { title, description } = req.body;
    try {
        const newData = new Data({ title, description });
        await newData.save();
        res.status(201).json({ msg: "New data added successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error in adding new data" });
    }
});

router.get("/view", async (req, res) => {
    try {
        const viewDatas = await Data.find();
        res.status(200).json(viewDatas);
    } catch (err) {
        res.status(500).json({ msg: "Can't get data" });
    }
});

router.get("/view/:id", async (req, res) => {
    try {
        const viewData = await Data.findById(req.params.id);
        if (viewData) {
            res.status(200).json(viewData);
        } else {
            res.status(404).json({ msg: "Data not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Can't get data" });
    }
});

router.put("/edit/:id", async (req, res) => {
    const { title, description } = req.body;
    try {
        const updatedData = await Data.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );
        if (updatedData) {
            res.status(200).json(updatedData);
        } else {
            res.status(404).json({ msg: "Data not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Can't edit the data" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedData = await Data.findByIdAndDelete(req.params.id);
        if (deletedData) {
            res.status(200).json({ msg: "Data deleted" });
        } else {
            res.status(404).json({ msg: "Data not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Can't delete the data" });
    }
});

export default router;
