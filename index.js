const mongoose = require('mongoose');
const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3020;

app.use(express.json());
mongoose.connect('mongodb+srv://satyaemailid2007:JH4MtGuUOsqA7ets@cluster0.4maup.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const Menu = require('./schema');

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post('/menu', async (req, res) => {
  try {
    const menuItem = new Menu(req.body);
    const savedMenuItem = await menuItem.save();
    res.status(200).json({
      message: 'Menu item created successfully',
      item: savedMenuItem
    });
  } catch (err) {
    console.error('Error creating menu item:', err);
    res.status(500).json({ error: 'Internal server error while creating menu item.' });
  }
});

app.put('/menu/:id',async(req,res)=>{
  try{
  const updatedMenu=await Menu.updateOne({_id:req.params.id});
  if(!updatedMenu){
    res.status(404).json({error:'Menu item not found'});
    return;
  }
  res.status(200).json({
    message:'Menu item updated successfully',
    item:updatedMenu
  });
  }catch(err){
    console.log('Error updating menu item:',err);
  }
})
app.delete('/menu/:id', async (req, res) => {
  try{
      const deletedMenu = await Menu.deleteOne({ _id: req.params.id });
      if(!deletedMenu){
          res.status(404).json({ error: 'Menu item not found' });
          return;
      }
      res.status(200).json({
          message: 'Menu item deleted successfully',
          item: deletedMenu
      });
  }catch(err){
    console.log('Error updating menu item:',err);
  }
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});