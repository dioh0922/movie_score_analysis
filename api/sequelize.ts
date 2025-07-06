const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const MovieData = sequelize.define('MovieData', {
  title: DataTypes.TEXT,
  scrTime: DataTypes.INTEGER,
  value: DataTypes.INTEGER,
  point: DataTypes.FLOAT,
  category: DataTypes.INTEGER
}, {
  tableName: 'moviedata',
  timestamps: false,
  freezeTableName: true
});

const CategoryTable = sequelize.define('CategoryTable', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
  category_name: DataTypes.TEXT
}, {
  tableName: 'category_table',
  timestamps: false,
  freezeTableName: true
});
MovieData.removeAttribute('id');

MovieData.belongsTo(CategoryTable, {
  foreignKey: 'category',
  targetKey: 'id'
});

export async function readData(){
  const result = await MovieData.findAll({
    attributes: ['title', 'point'],
    include: {
      model: CategoryTable,
      attributes: ['category_name']
    }
  });
  return result;
}