from model import Circle
from jinja2 import Environment, FileSystemLoader, Template

def unpack_svgs(circle_obj):
    circle_obj["_id"] = str(circle_obj["_id"])
    circle = Circle(**circle_obj)
    #print(circle.model_dump(by_alias=True))
    return circle.model_dump()

def get_all_svgs(data:list[dict]): 
   
    return [unpack_svgs(doc) for doc in data]

def convert_doc_to_svg(circle:Circle):
    '''Converts a circle object to an SVG string'''
    return f'<svg id="circle" height="100" width="100" viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg"><circle cx="{circle["cx"]}" cy="{circle["cy"]}" r="{circle["r"]}" stroke="{circle["stroke"]}" stroke-width="{circle["stroke_width"]}" fill="{circle["fill"]}" /></svg>'


def render_circle(circle:Circle) -> str:


    # Load the templates folder
    env = Environment(loader=FileSystemLoader("views"))

    # Load the specific template
    template = env.get_template("circle.html")

    # Render the template with dynamic data
    return template.render(a=circle)

