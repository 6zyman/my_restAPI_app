from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId
from uuid import uuid4

class Circle(BaseModel):
    '''Model for SVG Circle'''
    id: Optional[str] = Field(default_factory=lambda: str(uuid4()), alias="_id")
    svgType: str
    cx: str        
    cy: str
    r: str  
    fill: str
    stroke: str
    stroke_width: str

    class Config:
        json_encoders = {
            ObjectId: str
        }
