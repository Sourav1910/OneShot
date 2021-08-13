const express = require('express')
const College = require('../models/college')
const Student = require('../models/student')
const router = new express.Router()

router.get('/college', async (req, res) => {
    const college = new College({
        name:'College1',
        year_founded:1999,
        city:'Vellore',
        state:'Tamil Nadu',
        country:'India',
        no_of_students:20000,
        courses:['Computer Science','Information Technology','Electronics','Mechanical']
    })

    try {
        await college.save()
        res.status(201).send(college)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/student', async (req, res) => {
    const student = new Student({
        name:'Stud1',
        year_of_batch:2020,
        college_id:1,
        skills:['c++','java']
    })

    try {
        await student.save()
        res.status(201).send(student)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/getAllStudents', async (req, res) => {
    

    try {

        const student = await Student.find({})
        if (!student) {
            return res.status(404).send()
        }
        
        res.status(201).send(student)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/getStudentById/:id', async (req, res) => {
    try {
        const student = await Student.find({_id:req.params.id})
        if (!student) {
            return res.status(404).send()
        }

        res.status(201).send(student)
    } 
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/getAllCollegeInfo', async (req, res) => {
    
    console.log('/getAllCollegeInfo')
    try {

        const college = await College.find({})
        if (!college) {
            return res.status(404).send()
        }
        
        res.status(201).send(college)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/getCollegeByName', async (req, res) => {
    
    console.log('/getCollegeByName'+req.query.name)
    try {

        const college = await College.find({name:req.query.name})
        if (!college) {
            return res.status(404).send()
        }
        
        res.status(201).send(college)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/getCollegePercentageByState', async (req, res) => {
    
    console.log('/getCollegePercentageByState')
    try {
        const college = await College.find({})
        var stateObj = {}

        for(var i=0;i<college.length;i++){
            stateObj[college[i].state]=0;
        }   
        for(var i=0;i<college.length;i++){
            stateObj[college[i].state]+=1;
        } 
        for(var col in stateObj){
              stateObj[col] =   ((stateObj[col]*100)/college.length);
              stateObj[col] = Math.round(stateObj[col]* 100) / 100;
        }
        
        if (!college) {
            return res.status(404).send()
        }
        
        res.status(201).send(stateObj)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/getCoursePercentage', async (req, res) => {
    
    console.log('/getCoursePercentage')
    try {
        const college = await College.find({})
        var courseObj = {"Computer Science":0,"Information Technology":0,"Electronics":0,"Mechanical":0}

         
        for(var i=0;i<college.length;i++){
            // for(var course in college[i].courses){
            //         courseObj[course]+=1;
            // }
            college[i].courses.forEach((item,index)=>{
                courseObj[item]+=1;
            })
        } 
            
        for(var course in courseObj){
            courseObj[course] =   ((courseObj[course]*100)/college.length);
            courseObj[course] = Math.round(courseObj[course]* 100) / 100;
      }
        if (!college) {
            return res.status(404).send()
        }
        
        res.status(201).send(courseObj)
    } catch (e) {
        res.status(400).send(e)
    }
})
// GET /getCollegeList?state=
router.get('/getCollegeList', async (req, res) => {
    
    console.log('/getCollegeList?state=' +req.query.state )
    try {

        const college = await College.find({state:req.query.state})
        if (!college) {
            return res.status(404).send()
        }
        
        res.status(201).send(college)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /getSimilarColleges?course=Computer Science&state=Karnataka&no_of_students=4593
router.get('/getSimilarColleges', async (req, res) => {
    try {
        const state = req.query.state
        const no_of_students = parseInt(req.query.no_of_students)
        const low = no_of_students-100
        const high = no_of_students+100
        const course = req.query.course
        console.log(state)
        console.log(low,high)
        console.log(course)
        
        const college = await College.find({ $and: [{state, courses: course, no_of_students: { $gt : low , $lt : high} }] })
        
        if (!college) {
            return res.status(404).send()
        }
        
        res.status(201).send(college)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router