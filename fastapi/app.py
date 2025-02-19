
from fastapi import FastAPI, APIRouter, HTTPException
#from fastapi.templating import Jinja2Templates
import uvicorn
from utils import get_all_svgs, convert_doc_to_svg, render_circle
from model import Circle
from config import collection
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()   

router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5000"],  # Allow requests from frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

#all circles
@router.get("/all_circles")   
async def get_all():
    try:
        data = collection.find()
        svgs =get_all_svgs(data)
        resultId=[]
        for svg in svgs:
            resultId.append(svg['id'])
      #  templates.TemplateResponse("display.html", svgs=svgs)
        return resultId
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e)) 

#get circle    
@router.get("/circle/{circle_id}")
async def get_circle(circle_id: str):
    try:
        # Convert string ID to ObjectId
        obj_id = ObjectId(circle_id)
        # Fetch from MongoDB
        circle_obj = collection.find_one({"_id": obj_id})
        if not circle_obj:
            raise HTTPException(status_code=404, detail="Circle not found")
        return render_circle(circle_obj)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 

#create doc
@router.post("/create")
async def create_task(new_task: Circle):
    print(new_task)
    try: 
        resp = collection.insert_one(dict(new_task))
        print(resp)
        return {"id": str(resp.inserted_id)}
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))


#update doc   
@router.put("/update/{task_id}")
async def update_task(task_id: str, updated_task: Circle): 
    try:
        id = ObjectId(task_id)
        existing_doc = collection.find_one({"_id": id})
        if not existing_doc:
            raise HTTPException(status_code=404, detail="Task not found")
        resp = collection.update_one({"_id": id}, {"$set": dict(updated_task)})
        if resp.modified_count == 0:
            raise HTTPException(status_code=304, detail="Task not modified")
        return {"id": str(id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#delete doc
@router.delete("/delete/{task_id}")
async def delete_task(task_id: str,):
    try:
        id = ObjectId(task_id)
        existing_doc = collection.find_one({"_id": id})
        if not existing_doc:
            return HTTPException(status_code=404, detail="Task not found")
        resp = collection.delete_one({"_id": id})
        return task_id
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

app.include_router(router)

# new_id = ObjectId() from new unique id
# svgColl = db.svgCollection
# print(svgColl.find()) 
# db = client.get_database("svgs")

# Select the database and collection
# db = client['svgs']
# collection = db['svgCollection']

# # Find all documents in the collection
# docs = collection.find()
# print(docs)

# # Print each document
# for doc in docs:
#     print(doc)
