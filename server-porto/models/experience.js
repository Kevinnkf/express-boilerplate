import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Experiences extends Model {
        static associate(models) {
            // define association here if needed
        }
    }
    Experiences.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        company: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: true},
        startDate: { type: DataTypes.DATE, allowNull: true},
        endDate: { type: DataTypes.DATE, allowNull: true},
        description: { type: DataTypes.TEXT, allowNull: true},
        
    }, 
    {
        sequelize,
        modelName: 'Experiences',
        tableName: 'experiences',
    });
    return Experiences;
}