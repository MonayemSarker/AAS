import face_recognition as fr
import cv2
from fastapi import FastAPI  
from fastapi.middleware.cors import CORSMiddleware
from databases import Database
from pydantic import BaseModel

class Attendance(BaseModel):
    courseCode1:int
    barcode: int
    email: str
    
    
    
    
app = FastAPI()
database = Database("mysql+aiomysql://root:Pass_Word123@127.0.0.1:3306/aas")
origins = ["http://localhost:3000"]  # Replace with your client's origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event('startup')
async def database_connect():
    await database.connect()

@app.put("/attendance/scanner")
async def scanner_attendance(request: Attendance):
    code = request.courseCode1
    reg_number = request.barcode
    teacher_email = request.email

    print(teacher_email)
    # print(code, reg_number)
    
    course_query = f"SELECT * FROM Courses WHERE courseCode = {code};"
    course = await database.fetch_one(query=course_query)
    
    # print(course)

    student_query = f"SELECT * FROM Students WHERE regNumber = {reg_number};"
    student = await database.fetch_one(query=student_query)
    
    # print(student['photo'])
    
    
    isNotProxy = convertStreamToFrame(student['photo'])
    
    print(isNotProxy)
    
    current_date_query = "SELECT CURDATE() AS currentDate"
    current_date = await database.fetch_one(query=current_date_query)
    formatted_date = current_date["currentDate"]
    
    
    if isNotProxy:
        if course and student:
            student_course_query = f"""
                SELECT * FROM StudentCourses
                WHERE CourseCourseCode = {code} AND regNumber = {reg_number};
            """
            student_course = await database.fetch_one(
                query=student_course_query
            )
            

            if student_course:
                
                print(current_date)
                print(formatted_date)
                
                attendance_update_query = f"""
                    UPDATE Attendances
                    SET status = '1'
                    WHERE createdAt = '{formatted_date}' AND StudentCourseId = {student_course["id"]};
                """
                
                print(attendance_update_query)
                # attendance_update_values = {
                #     "status": True,
                #     "formatted_date": formatted_date,
                #     "student_course_id": student_course["id"],
                # }
                count_attendance = await database.execute(
                    query=attendance_update_query,
                )

                return {"countAttendance": count_attendance}

            else:
                return {"error": "Student not enrolled in the course"}

        else:
            return {"error": "Invalid course or student"}
    
    else:
        # info = {
        #     "type": f"Proxy Detected Student: {reg_number} Course: {code}",
        #     "receiver": teacher_email
        # }
        notification_query = f"""
            INSERT INTO Notifications (type, receiver, createdAt, updatedAt)
            VALUES ('Proxy Detected Student: {reg_number} Course: {code}', '{teacher_email}','{formatted_date}','{formatted_date}');
        """    
        print(notification_query)
        notification_data = await database.execute(notification_query)
    
    
    
    
    

def faceMatching(path):
    try:
        fixed_image = fr.load_image_file("../images/studentImages/"+path)
        

        incoming_image = fr.load_image_file("images/img.jpg")

        fixed_encodings = fr.face_encodings(fixed_image)
        if len(fixed_encodings) > 0:
            fixed_encoding = fixed_encodings[0]


        incoming_encodings = fr.face_encodings(incoming_image)
        if len(incoming_encodings) > 0:
            incoming_encoding = incoming_encodings[0]
        

        results = fr.compare_faces([fixed_encoding], incoming_encoding)
        distance = fr.face_distance([fixed_encoding], incoming_encoding)[0]
        similarity = (1 - distance) * 100
        print(similarity)

        is_match = distance < 0.5
        return is_match
    except:
        return False



def convertStreamToFrame(path):
    try:
        # vcap = cv2.VideoCapture("http://192.168.0.102:4747/video")
        # vcap = cv2.VideoCapture("http://10.100.101.93:4747/video")
        vcap = cv2.VideoCapture("http://192.168.171.93:4747/video")
       
        ret, frame = vcap.read()
        cv2.imwrite("./images/img.jpg", frame)
        return faceMatching(path) 
    except cv2.error:
        return False
      
     
