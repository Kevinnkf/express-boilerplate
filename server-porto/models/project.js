import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Project extends Model {
        static associate(models) {
            // define association here if needed
        }
    }
    Project.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true},
        url: { type: DataTypes.STRING, allowNull: true},
        imageUrl: { type: DataTypes.STRING, allowNull: true}
    }, {
        sequelize,
        modelName: 'Project',
    });
    return Project;
}