import db from '../models/index.js';

const { Summary } = db;

export const getAllSummaries = async (req, res) => {
    try {
        //get all summaries from database
        const Summaries = await Summary.findAll();
        if (!Summaries) {
            return res.status(404).json({ message: 'No summaries found' });
        }
        // send response
        res.status(200).json(Summaries);

    } catch (error) {

        //catch error
        res.status(500).json({ message: 'Error retrieving summary', error });
    }
};

export const createSummary = async (req, res) => {
    try {
        const { content } = req.body;
        const newSummary = await Summary.create({
            content
        });
x``
        res.status(201).json(newSummary);
    } catch (error) {
        res.status(500).json({ message: 'Error creating summary', error });
    }
};

export const updateSummary = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const [updated] = await Summary.update({ 
            content 
            },
            { where: { id } }
        );
        if (updated) {
            const updatedSummary = await Summary.findOne({ where: { id } });
            res.status(200).json(updatedSummary);
        } else {
            res.status(404).json({ message: 'Summary not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
};