
const express = require('express');
   const app = express();
   const value = require('./app');

   const bodyParser = require('body-parser');
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended:false}));
   const port = process.env.PORT || 3000;
   const pool = value.pool;


   // Add route code Here
   app.get('/', (req, res) => {
      res.send('Welcome to Our SCHOOL API');
   });


   app.get('/student', (req, res) => {
    pool.connect((err, client, done) => {
        const query = 'SELECT * FROM students';
        client.query(query, (error, result) => {
          done();
          if (error) {
            res.status(400).json({error})
          } 
          if(result.rows < '1') {
            res.status(404).send({
            status: 'Failed',
            message: 'No student information found',
            });
          } else {
            res.status(200).send({
            status: 'Successful',
            message: 'Students Information retrieved',
            students: result.rows,
            });
          }
        });
      });
    });
    
    
    app.post('/student', (req, res) => {
      const data = {
        name : req.body.studentName,
        age : req.body.studentAge,
        classroom : req.body.studentClass,
        parents : req.body.parentContact,
        admission : req.body.admissionDate,
      }
    
      pool.connect((err, client, done) => {
        const query = 'INSERT INTO students(student_name, student_age, student_class, parent_contact, admission_date) VALUES($1,$2,$3,$4,$5) RETURNING *';
        const values = [data.name, data.age, data.classroom, data.parents, data.admission];
    
        client.query(query, values, (error, result) => {
          done();
          if (error) {
            return res.status(400).json({error});
          }
         return res.status(202).send({
            status: 'SUccessful',
            result: result,
          });
        });
      });
    });



    app.get('/student/:id', (req,res) => {
        const id = req.params.id;
        pool.connect((err, client, done) => {
            const query = `SELECT * FROM students where id=${id}`;
            client.query(query, (error, result) => {
              done();
              if (error) {
                res.status(400).json({error})
              } 
              res.json({status: 'success',
            result: result});
          });
      });
    });

app.put('/student/:id', (req, res) => {
    const data = req.body.name;
    const id = req.params.id;
    pool.connect((err, client, done) => {
        const query = ('UPDATE students SET student_name=$1 WHERE id=$2');
        const value = [data, id];
    client.query(query, value, (error, result) => {
        done();
        if (error) {
            console.log(error);
          return res.status(400).json({error});
        }
       return res.status(202).send({
          status: 'SUccessful',
          result: result,
        });
      });
});
});

   app.listen(port, () => {
      console.log(`We are live at 127.0.0.1:${port}`);
   });



