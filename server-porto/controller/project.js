import db from '../models/index.js';

const Project = db.Project;

export const getAllProjects = async (req, res) => {
    try {
        const Projects = await Project.findAll();
        res.status(200).json(Projects);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving projects', error });
    }
};

export const createProject = async (req, res) => {
    try {
        const { name, description, url, imageUrl } = req.body;
        const newProject = await Project.create({
            name,
            description,
            url,
            imageUrl
        })
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Project.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Project deleted successfully' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, url, imageUrl } = req.body;
        const [updated] = await Project.update({ 
            name,
            description,
            url,
            imageUrl 
            },
            { where: { id } }
        );
        if (updated) {
            const updatedProject = await Project.findOne({ where: { id } });
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
};